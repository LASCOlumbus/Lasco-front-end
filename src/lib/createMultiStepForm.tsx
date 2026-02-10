import type { DeepKeys, DeepValue, FormValidateOrFn, Updater } from '@tanstack/react-form';
import React from 'react';
import { flushSync } from 'react-dom';
import { useCounter, useLocalStorageValue, useToggle, useUnmountEffect } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';
import { ZodType } from 'zod';
import { FORM_TYPES } from '@/lib/constants';
import { AnimationDirection, MultiStepFormConfig } from '@/lib/types';
import { generatePdfMutationOptions } from '@/services/pdf/queries';
import { useAppForm } from '@/components/Forms/hooks/useAppForm';

export function createMultiStepForm<TForm extends Record<string, unknown>>(
    type: typeof FORM_TYPES._PROSPECTIVE_WARDS_FINANCIAL_INFORMATION
) {
    type Step<K extends keyof TForm = keyof TForm> = {
        id: K;
        label: string;
        schema: ZodType<TForm[K]>;
        enabled: boolean;
    };

    type StepsArray = Step<keyof TForm>[];

    type ContextType = {
        formData: TForm;
        steps: StepsArray;
        currentStepIndex: number;
        currentStep: Step<keyof TForm>;
        isSubmitted: boolean | undefined;
        toggleIsSubmitted: (_v: boolean) => void;
        isSuccessful: boolean | undefined;
        toggleIsSuccessful: (_v: boolean) => void;
        canGoBack: boolean;
        animationDirection: AnimationDirection;
        isLoading: boolean;
        isLastStep: boolean;
        goToNextStep: () => void;
        goToPreviousStep: () => void;
        goToSelectStep: (_step: number) => void;
        setFormStepData: <K extends keyof TForm>(_key: K, _data: TForm[K]) => void;
        lastPassedStepIndex: number;
        generatedFile: Blob | null;
        setGeneratedFile: (_file: Blob | null) => void;
        generateIfNeeded: () => Promise<Blob>;
        printPdf: () => Promise<void>;
        downloadPdf: () => Promise<void>;
    };

    const Context = React.createContext<ContextType>({} as ContextType);

    const Provider: React.FC<
        React.PropsWithChildren<{
            config: MultiStepFormConfig<TForm>;
        }>
    > = ({ children, config }) => {
        const [generatedFile, setGeneratedFile] = React.useState<Blob | null>(null);
        const stepsArray = React.useMemo<StepsArray>(() => {
            return Object.values(config.steps).filter((s): s is Step<keyof TForm> => {
                return s.enabled;
            });
        }, [config.steps]);
        const mutation = useMutation(generatePdfMutationOptions<TForm>());

        const { value: formData, set: setFormData } = useLocalStorageValue(config.storageKey, {
            defaultValue:
                typeof window === 'undefined'
                    ? JSON.stringify(config.initialState)
                    : (localStorage.getItem(config.storageKey) ?? JSON.stringify(config.initialState)),
            initializeWithValue: false,
        });

        const { value: isSubmitted, set: toggleIsSubmitted } = useLocalStorageValue(config.submittedKey, {
            defaultValue: typeof window === 'undefined' ? false : !!localStorage.getItem(config.submittedKey),
            initializeWithValue: false,
        });

        const { value: isSuccessful, set: toggleIsSuccessful } = useLocalStorageValue(config.successfulKey, {
            defaultValue: typeof window === 'undefined' ? false : !!localStorage.getItem(config.successfulKey),
            initializeWithValue: false,
        });

        const [isLoading, toggleIsLoading] = useToggle(true);
        const [isInitialStepSet, toggleIsInitialStepSet] = useToggle();
        const [animationDirection, setAnimationDirection] = React.useState<AnimationDirection>('next');

        const [currentStepIndex, { inc, dec, reset, set: setStep }] = useCounter(0, stepsArray.length - 1, 0);

        const [lastPassedStepIndex, { set: setLastPassedStepIndex }] = useCounter(0);

        const currentStep = stepsArray[currentStepIndex];
        const isLastStep = currentStepIndex === stepsArray.length - 1;
        const canGoBack = currentStepIndex > 0;

        const parsedFormData = React.useMemo<TForm>(() => {
            return formData ? (JSON.parse(formData) as TForm) : config.initialState;
        }, [formData, config.initialState]);

        const generateIfNeeded = async (): Promise<Blob> => {
            if (generatedFile) return generatedFile;

            try {
                toggleIsLoading(true);
                toggleIsSuccessful(false);

                const blob = await mutation.mutateAsync({
                    type,
                    data: parsedFormData,
                    meta: 'extra metadata',
                });

                setGeneratedFile(blob);
                toggleIsSuccessful(true);
                toggleIsSubmitted(true);

                return blob;
            } catch (error) {
                toggleIsSuccessful(false);
                throw error;
            } finally {
                toggleIsLoading(false);
            }
        };

        const print = async () => {
            const blob = await generateIfNeeded();

            const url = URL.createObjectURL(blob);
            const iframe = document.createElement('iframe');

            iframe.style.display = 'none';
            iframe.src = url;

            document.body.appendChild(iframe);

            iframe.onload = () => {
                iframe.contentWindow?.focus();
                iframe.contentWindow?.print();
            };
        };

        const download = async () => {
            const blob = await generateIfNeeded();

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');

            a.href = url;
            a.download = `${type}.pdf`;
            a.click();

            URL.revokeObjectURL(url);
        };

        const goToNextStep = async () => {
            flushSync(() => {
                return setAnimationDirection('next');
            });
            const isLast = currentStepIndex === stepsArray.length - 1;
            inc();
            if (isLast) {
                await generateIfNeeded();
            }
        };

        const goToPreviousStep = () => {
            if (!canGoBack) return;
            flushSync(() => {
                return setAnimationDirection('prev');
            });
            dec();
        };

        const goToSelectStep = (step: number) => {
            if (step <= lastPassedStepIndex + 1) {
                flushSync(() => {
                    return setAnimationDirection(step < currentStepIndex ? 'prev' : 'next');
                });
                setStep(step);
            }
        };

        const setFormStepData = <K extends keyof TForm>(key: K, data: TForm[K]) => {
            setFormData((prev) => {
                return prev
                    ? JSON.stringify({
                          ...JSON.parse(prev),
                          [key]: data,
                      })
                    : '';
            });
        };

        React.useEffect(() => {
            if (!formData || isInitialStepSet) return;

            toggleIsLoading(true);
            const firstInvalidIndex = stepsArray.findIndex((step) => {
                const result = step.schema.safeParse(parsedFormData[step.id]);
                return !result.success;
            });

            if (firstInvalidIndex === -1) {
                setLastPassedStepIndex(stepsArray.length - 1);
                setStep(stepsArray.length - 1);
            } else {
                setLastPassedStepIndex(firstInvalidIndex);
                setStep(firstInvalidIndex);
            }
            toggleIsInitialStepSet(true);
            toggleIsLoading(false);
        }, [
            formData,
            isInitialStepSet,
            parsedFormData,
            setLastPassedStepIndex,
            setStep,
            stepsArray,
            toggleIsInitialStepSet,
            toggleIsLoading,
        ]);

        React.useEffect(() => {
            if (currentStepIndex > lastPassedStepIndex) {
                setLastPassedStepIndex(currentStepIndex);
            }
        }, [currentStepIndex, lastPassedStepIndex, setLastPassedStepIndex]);
        useUnmountEffect(() => {
            return reset();
        });

        return (
            <Context.Provider
                value={{
                    formData: parsedFormData,
                    steps: stepsArray,
                    currentStepIndex,
                    currentStep,
                    isSubmitted,
                    toggleIsSubmitted,
                    isSuccessful,
                    toggleIsSuccessful,
                    canGoBack,
                    animationDirection,
                    isLoading,
                    isLastStep,
                    goToNextStep,
                    goToPreviousStep,
                    goToSelectStep,
                    setFormStepData,
                    lastPassedStepIndex,
                    generatedFile,
                    setGeneratedFile,
                    generateIfNeeded,
                    printPdf: print,
                    downloadPdf: download,
                }}
            >
                {children}
            </Context.Provider>
        );
    };

    const useFormContext = () => {
        return React.useContext(Context);
    };

    const useStepForm = <K extends keyof TForm>(stepId: K) => {
        const { formData, steps, setFormStepData, goToNextStep } = useFormContext();
        const [isLoading, toggleIsLoading] = useToggle(true);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const stepSchema = React.useMemo<FormValidateOrFn<TForm[K]>>(() => {
            if (!steps.length) return {} as FormValidateOrFn<TForm[K]>;

            return steps.find((s) => {
                return s.id === stepId;
            })!.schema;
        }, [steps, stepId]);

        const form = useAppForm({
            defaultValues: formData[stepId],
            validators: {
                onMount: stepSchema,
                onChange: stepSchema,
                onSubmit: stepSchema,
            },
            onSubmit: (data) => {
                if (data?.value) {
                    setFormStepData(stepId, data.value);
                    goToNextStep();
                }
            },
        });

        React.useEffect(() => {
            toggleIsLoading(true);

            Object.keys(formData[stepId] ?? {}).forEach((key) => {
                form.setFieldValue(
                    key as DeepKeys<TForm[K]>,
                    formData[stepId][key as keyof TForm[K]] as Updater<DeepValue<TForm[K], DeepKeys<TForm[K]>>>
                );
            });

            toggleIsLoading(false);
        }, [form, formData, stepId, toggleIsLoading]);

        return { form, isLoading };
    };

    return { Provider, useFormContext, useStepForm };
}
