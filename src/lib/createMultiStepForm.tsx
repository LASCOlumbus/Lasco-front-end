import type { DeepKeys, DeepValue, FormValidateOrFn, Updater } from '@tanstack/react-form';
import React from 'react';
import { flushSync } from 'react-dom';
import { useCounter, useDebouncedCallback, useLocalStorageValue, useToggle, useUnmountEffect } from '@react-hookz/web';
import { useStore } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { ZodType } from 'zod';
import { FORM_TYPES } from '@/lib/constants';
import { AnimationDirection, MultiStepFormConfig } from '@/lib/types';
import { generatePdfMutationOptions } from '@/services/pdf/queries';
import { useAppForm } from '@/components/Forms/hooks/useAppForm';

const trimValues = <T,>(obj: T): T => {
    if (typeof obj === 'string') {
        return obj.trim() as T;
    }

    if (Array.isArray(obj)) {
        return obj.map(trimValues) as T;
    }

    if (obj && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => {
                return [key, trimValues(value)];
            })
        ) as T;
    }

    return obj;
};

export function createMultiStepForm<TForm extends Record<string, unknown>>(type: (typeof FORM_TYPES)[keyof typeof FORM_TYPES]) {
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
        generateIfNeeded: () => void;
        printPdf: (_headerPrint?: boolean) => void;
        downloadPdf: (_headerDownload?: boolean) => void;
        printLoading?: boolean;
        downloadLoading?: boolean;
        updateCurrentStepValues: <K extends keyof TForm>(_key: K, _data: TForm[K]) => void;
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
        const mutation = useMutation({
            ...generatePdfMutationOptions<TForm>(),
        });
        const { value: formData, set: setFormData } = useLocalStorageValue(config.storageKey, {
            defaultValue: typeof window === 'undefined' ? JSON.stringify(config.initialState) : (localStorage.getItem(config.storageKey) ?? JSON.stringify(config.initialState)),
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
        const [printLoading, togglePrintLoading] = useToggle(false);
        const [downloadLoading, toggleDownloadLoading] = useToggle(false);
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

        const generateIfNeeded = ({ headerPrint, headerDownload, onGenerate }: { headerPrint?: boolean; headerDownload?: boolean; onGenerate?: (_blob: Blob, _type: string) => void } = {}) => {
            if (generatedFile) return;
            if (!headerPrint && !headerDownload) toggleIsLoading(true);

            if (headerPrint) {
                togglePrintLoading(true);
            }
            if (headerDownload) {
                toggleDownloadLoading(true);
            }
            mutation.mutate(
                {
                    type,
                    data: parsedFormData,
                    meta: 'extra metadata',
                },
                {
                    onSuccess: (blob) => {
                        if (isSubmitted && isSuccessful) setGeneratedFile(blob);
                        onGenerate?.(blob, type);
                        if (headerPrint) {
                            togglePrintLoading(false);
                        }
                        if (headerDownload) {
                            toggleDownloadLoading(false);
                        }
                        if (!headerPrint && !headerDownload) {
                            toggleIsSuccessful(true);
                            toggleIsSubmitted(true);
                        }
                    },
                    onError: () => {
                        if (!headerPrint && !headerDownload) {
                            toggleIsSuccessful(false);
                        }
                    },
                    onSettled: () => {
                        if (!headerPrint && !headerDownload) {
                            toggleIsLoading(false);
                            toggleIsLoading(false);
                        }
                        if (headerPrint) {
                            togglePrintLoading(false);
                        }
                        if (headerDownload) {
                            toggleDownloadLoading(false);
                        }
                    },
                }
            );
        };

        const printAction = (generatedFile: Blob) => {
            const url = URL.createObjectURL(generatedFile);
            const iframe = document.createElement('iframe');

            iframe.style.display = 'none';
            iframe.src = url;

            document.body.appendChild(iframe);
            iframe.onload = () => {
                return iframe.contentWindow?.print();
            };
        };

        const print = (headerPrint?: boolean) => {
            if (!generatedFile) {
                generateIfNeeded({ headerPrint, onGenerate: printAction });
                return;
            }
            printAction(generatedFile);
        };

        const downloadAction = (generatedFile: Blob, type: string) => {
            const url = URL.createObjectURL(generatedFile);
            const a = document.createElement('a');

            a.href = url;
            a.download = `${type}.pdf`;
            a.click();

            URL.revokeObjectURL(url);
        };
        const download = (headerDownload?: boolean) => {
            if (!generatedFile) {
                generateIfNeeded({ headerDownload, onGenerate: downloadAction });
                return;
            }
            downloadAction(generatedFile, type);
        };

        const goToNextStep = () => {
            flushSync(() => {
                return setAnimationDirection('next');
            });
            const isLast = currentStepIndex === stepsArray.length - 1;
            inc();
            if (isLast) {
                generateIfNeeded();
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
                          [key]: trimValues(data),
                      })
                    : '';
            });
        };
        const updateCurrentStepValues = <K extends keyof TForm>(key: K, data: TForm[K]) => {
            setFormData((prev) => {
                const parsed = prev ? JSON.parse(prev) : config.initialState;

                return JSON.stringify({
                    ...parsed,
                    [key]: trimValues(data),
                });
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
        }, [formData, isInitialStepSet, parsedFormData, setLastPassedStepIndex, setStep, stepsArray, toggleIsInitialStepSet, toggleIsLoading]);

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
                    printLoading,
                    downloadLoading,
                    updateCurrentStepValues,
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
        const { formData, steps, setFormStepData, goToNextStep, updateCurrentStepValues } = useFormContext();
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
                onSubmit: stepSchema,
            },
            onSubmit: (data) => {
                if (data?.value) {
                    setFormStepData(stepId, data.value);
                    goToNextStep();
                }
            },
        });
        const values = useStore(form.store, (state) => {
            return state.values;
        });

        const debouncedUpdate = useDebouncedCallback(
            (vals: TForm[K]) => {
                updateCurrentStepValues(stepId, vals);
            },
            [stepId, updateCurrentStepValues],
            300
        );

        React.useEffect(() => {
            debouncedUpdate(values);
        }, [values, debouncedUpdate]);

        React.useEffect(() => {
            toggleIsLoading(true);

            Object.keys(formData[stepId] ?? {}).forEach((key) => {
                form.setFieldValue(key as DeepKeys<TForm[K]>, formData[stepId][key as keyof TForm[K]] as Updater<DeepValue<TForm[K], DeepKeys<TForm[K]>>>);
            });

            toggleIsLoading(false);
        }, [form, formData, stepId, toggleIsLoading]);

        return { form, isLoading };
    };

    return { Provider, useFormContext, useStepForm };
}
