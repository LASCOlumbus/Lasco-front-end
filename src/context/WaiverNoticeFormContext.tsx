import React, { useContext } from 'react';
import { flushSync } from 'react-dom';
import { waiverNoticeStepOneSchema, waiverNoticeStepTwoSchema } from '@/schemas/multiStepFormSchemas.ts';
import { useCounter, useLocalStorageValue, useToggle, useUnmountEffect } from '@react-hookz/web';
import { DeepKeys, DeepValue, Updater, useForm } from '@tanstack/react-form';
import { AnimationDirection, IWaiverNoticeFormStep, WaiverNoticeForm } from '@/lib/types.ts';

type WaiverNoticeFormContextType = {
    formData: WaiverNoticeForm;
    steps: IWaiverNoticeFormStep[];
    currentStepIndex: number;
    currentStep: IWaiverNoticeFormStep;
    isSubmitted: boolean;
    toggleIsSubmitted: () => void;
    isSuccessful: boolean;
    toggleIsSuccessful: () => void;
    canGoBack: boolean;
    animationDirection: AnimationDirection;
    isLoading: boolean;
    isLastStep: boolean;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    setFormStepData: <TField extends keyof WaiverNoticeForm>(
        // eslint-disable-next-line no-unused-vars
        key: TField,
        // eslint-disable-next-line no-unused-vars
        data: WaiverNoticeForm[TField]
    ) => void;
};

export const WAIVER_NOTICE_FORM_KEY = 'WAIVER_NOTICE_multi-step-form';

const WAIVER_NOTICE_FORM_STEPS = {
    stepOne: {
        id: 'stepOne',
        label: 'Case details',
        schema: waiverNoticeStepOneSchema,
        enabled: true,
    },
    stepTwo: {
        id: 'stepTwo',
        label: 'Waivers list',
        schema: waiverNoticeStepTwoSchema,
        enabled: true,
    },
} as const satisfies Record<keyof WaiverNoticeForm, IWaiverNoticeFormStep>;
const WAIVER_NOTICE_FORM_STEPS_ARRAY = Object.values(WAIVER_NOTICE_FORM_STEPS).filter((step) => {
    return step.enabled;
});

const WAIVER_NOTICE_FORM_INITIAL_STATE: WaiverNoticeForm = {
    stepOne: {
        guardianName: '',
        caseNumber: '',
        applicantName: '',
    },
    stepTwo: {
        persons: [''],
    },
};

const WaiverNoticeFormContext = React.createContext<WaiverNoticeFormContextType>({} as WaiverNoticeFormContextType);
WaiverNoticeFormContext.displayName = 'WaiverNoticeFormContext';

export const WaiverNoticeFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { value: formData, set: setFormData } = useLocalStorageValue(WAIVER_NOTICE_FORM_KEY, {
        defaultValue:
            typeof window === 'undefined'
                ? JSON.stringify(WAIVER_NOTICE_FORM_INITIAL_STATE)
                : (localStorage?.getItem(WAIVER_NOTICE_FORM_KEY) ?? JSON.stringify(WAIVER_NOTICE_FORM_INITIAL_STATE)),
        initializeWithValue: false,
    });

    const [isLoading, toggleIsLoading] = useToggle(true);
    const [isSubmitted, toggleIsSubmitted] = useToggle(false);
    const [isSuccessful, toggleIsSuccessful] = useToggle(false);
    const [isInitialStepSet, toggleIsInitialStepSet] = useToggle();
    const [animationDirection, setAnimationDirection] = React.useState<AnimationDirection>('next');
    const [
        currentStepIndex,
        {
            inc: incrementCurrentStepIndex,
            dec: decrementCurrentStepIndex,
            reset: resetCurrentStepIndex,
            set: setCurrentStepIndex,
        },
    ] = useCounter(0, WAIVER_NOTICE_FORM_STEPS_ARRAY.length - 1, 0);

    const currentStep = WAIVER_NOTICE_FORM_STEPS_ARRAY[currentStepIndex];
    const isLastStep = currentStep.id === WAIVER_NOTICE_FORM_STEPS_ARRAY[WAIVER_NOTICE_FORM_STEPS_ARRAY.length - 1].id;
    const canGoBack = currentStepIndex > 0;

    const parsedFormData = React.useMemo(() => {
        if (!formData) {
            return WAIVER_NOTICE_FORM_INITIAL_STATE;
        }

        return JSON.parse(formData) as WaiverNoticeForm;
    }, [formData]);

    const goToNextStep = React.useCallback(() => {
        flushSync(() => {
            setAnimationDirection('next');
        });

        incrementCurrentStepIndex();
    }, [incrementCurrentStepIndex]);

    const goToPreviousStep = React.useCallback(() => {
        flushSync(() => {
            setAnimationDirection('prev');
        });

        decrementCurrentStepIndex();
    }, [decrementCurrentStepIndex]);

    const setFormStepData = React.useCallback(
        <TField extends keyof WaiverNoticeForm>(key: TField, data: WaiverNoticeForm[TField]) => {
            setFormData((prev) => {
                if (!prev) {
                    return '';
                }

                return JSON.stringify({
                    ...JSON.parse(prev),
                    [key]: data,
                });
            });
        },
        [setFormData]
    );

    const cleanUp = React.useCallback(() => {
        resetCurrentStepIndex();
        // setFormData(JSON.stringify(WAIVER_NOTICE_FORM_INITIAL_STATE));
    }, [resetCurrentStepIndex, setFormData]);

    const memoizedValue = React.useMemo(() => {
        return {
            formData: parsedFormData,
            currentStepIndex,
            steps: WAIVER_NOTICE_FORM_STEPS_ARRAY,
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
            setFormStepData,
        };
    }, [
        parsedFormData,
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
        setFormStepData,
    ]);

    React.useEffect(() => {
        if (formData && isInitialStepSet) {
            return;
        }

        toggleIsLoading(true);

        const lastCorrectStepIndex = WAIVER_NOTICE_FORM_STEPS_ARRAY.findIndex((step) => {
            const result = step.schema.safeParse(parsedFormData[step.id]);

            return !result.success;
        });

        setCurrentStepIndex(lastCorrectStepIndex);

        if (formData) {
            toggleIsInitialStepSet(true);
            toggleIsLoading(false);
        }
    }, [formData, isInitialStepSet, parsedFormData, setCurrentStepIndex, toggleIsInitialStepSet, toggleIsLoading]);

    useUnmountEffect(() => {
        cleanUp();
    });

    return <WaiverNoticeFormContext value={memoizedValue}>{children}</WaiverNoticeFormContext>;
};

export const useWaiverNoticeFormContext = () => {
    const context = useContext(WaiverNoticeFormContext);

    return context;
};

export const useWaiverNoticeFormStepForm = <TStepId extends keyof WaiverNoticeForm>(stepId: TStepId) => {
    const { formData, setFormStepData, toggleIsSubmitted, toggleIsSuccessful } = useWaiverNoticeFormContext();

    const [isLoading, toggleIsLoading] = useToggle(true);

    const formDataValue = formData[stepId];

    const defaultValues = typeof window === 'undefined' ? WAIVER_NOTICE_FORM_INITIAL_STATE[stepId] : formDataValue;

    // eslint-disable-next-line
    // @ts-ignore
    const form = useForm<WaiverNoticeForm[TStepId]>({
        defaultValues: formDataValue as WaiverNoticeForm[TStepId],
        validators: {
            onMount: WAIVER_NOTICE_FORM_STEPS[stepId].schema,
            // onBlur: WAIVER_NOTICE_FORM_STEPS[stepId].schema,
            onChange: WAIVER_NOTICE_FORM_STEPS[stepId].schema,
            onSubmit: WAIVER_NOTICE_FORM_STEPS[stepId].schema,
        },
        onSubmit: (data) => {
            console.log(data, 'data');
            if (data?.value) {
                console.log(data.value, 'data.value');
                setFormStepData('stepTwo', data.value as WaiverNoticeForm['stepTwo']);
                toggleIsSubmitted();

                // eslint-disable-next-line no-constant-condition
                if (false) {
                    toggleIsSuccessful();
                }
            }
        },
    });

    React.useEffect(() => {
        toggleIsLoading(true);

        Object.keys(defaultValues).forEach((key) => {
            form.setFieldValue(
                key as DeepKeys<WaiverNoticeForm[TStepId]>,
                defaultValues[key as keyof WaiverNoticeForm[TStepId]] as Updater<
                    DeepValue<WaiverNoticeForm[TStepId], DeepKeys<WaiverNoticeForm[TStepId]>>
                >
            );
        });

        toggleIsLoading(false);
    }, [form, formData, defaultValues, stepId, toggleIsLoading]);

    return { form, isLoading };
};
