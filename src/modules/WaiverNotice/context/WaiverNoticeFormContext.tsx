import type { AnimationDirection, IWaiverNoticeFormStep, WaiverNoticeForm } from '@/lib/types';
import React, { useContext } from 'react';
import { flushSync } from 'react-dom';
import { waiverNoticeCaseDetailsStepSchema, waiverNoticeWaiversListStepSchema } from '@/schemas/formSchemas';
import { useCounter, useLocalStorageValue, useToggle, useUnmountEffect } from '@react-hookz/web';
import { DeepKeys, DeepValue, Updater, useForm } from '@tanstack/react-form';

type WaiverNoticeFormContextType = {
    formData: WaiverNoticeForm;
    steps: IWaiverNoticeFormStep[];
    currentStepIndex: number;
    currentStep: IWaiverNoticeFormStep;
    isSubmitted: boolean | undefined;
    toggleIsSubmitted: (_value: boolean) => void;
    isSuccessful: boolean | undefined;
    toggleIsSuccessful: (_value: boolean) => void;
    canGoBack: boolean;
    animationDirection: AnimationDirection;
    isLoading: boolean;
    isLastStep: boolean;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    goToSelectStep: (_step: number) => void;
    setFormStepData: <TField extends keyof WaiverNoticeForm>(
        // eslint-disable-next-line no-unused-vars
        key: TField,
        // eslint-disable-next-line no-unused-vars
        data: WaiverNoticeForm[TField]
    ) => void;
    lastPassedStepIndex: number;
};

export const WAIVER_NOTICE_FORM_KEY = 'WAIVER_NOTICE_multi-step-form';
export const WAIVER_NOTICE_FORM_KEY_SUBMITTED = 'WAIVER_NOTICE_multi-step-form-step_submitted';
export const WAIVER_NOTICE_FORM_KEY_SUCCESSFUL = 'WAIVER_NOTICE_multi-step-form-step_successful';

const WAIVER_NOTICE_FORM_STEPS = {
    caseDetailsStep: {
        id: 'caseDetailsStep',
        label: 'Case details',
        schema: waiverNoticeCaseDetailsStepSchema,
        enabled: true,
    },
    waiversListStep: {
        id: 'waiversListStep',
        label: 'Waivers list',
        schema: waiverNoticeWaiversListStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof WaiverNoticeForm, IWaiverNoticeFormStep>;
const WAIVER_NOTICE_FORM_STEPS_ARRAY = Object.values(WAIVER_NOTICE_FORM_STEPS).filter((step) => {
    return step.enabled;
});

const WAIVER_NOTICE_FORM_INITIAL_STATE: WaiverNoticeForm = {
    caseDetailsStep: {
        guardianName: '',
        caseNumber: '',
        applicantName: '',
    },
    waiversListStep: {
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

    const { value: isSubmitted, set: toggleIsSubmitted } = useLocalStorageValue(WAIVER_NOTICE_FORM_KEY_SUBMITTED, {
        defaultValue: typeof window === 'undefined' ? false : !!localStorage?.getItem(WAIVER_NOTICE_FORM_KEY_SUBMITTED),
        initializeWithValue: false,
    });

    const { value: isSuccessful, set: toggleIsSuccessful } = useLocalStorageValue(WAIVER_NOTICE_FORM_KEY_SUCCESSFUL, {
        defaultValue:
            typeof window === 'undefined' ? false : !!localStorage?.getItem(WAIVER_NOTICE_FORM_KEY_SUCCESSFUL),
        initializeWithValue: false,
    });

    const [isLoading, toggleIsLoading] = useToggle(true);
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
    const [lastPassedStepIndex, { set: setLastPassedStepIndex }] = useCounter(0);

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

    const goToSelectStep = React.useCallback(
        (step: number) => {
            if (step <= lastPassedStepIndex + 1) {
                if (currentStepIndex > step) {
                    flushSync(() => {
                        setAnimationDirection('prev');
                    });
                }
                if (currentStepIndex < step) {
                    flushSync(() => {
                        setAnimationDirection('next');
                    });
                }
                setCurrentStepIndex(step);
            }
        },
        // eslint-disable-next-line
        [setCurrentStepIndex]
    );

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
    }, [resetCurrentStepIndex]);

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
            goToSelectStep,
            setFormStepData,
            lastPassedStepIndex,
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
        goToSelectStep,
        setFormStepData,
        lastPassedStepIndex,
    ]);

    React.useEffect(() => {
        if (currentStepIndex > lastPassedStepIndex) {
            setLastPassedStepIndex(currentStepIndex);
        }
        // eslint-disable-next-line
    }, [currentStepIndex]);

    React.useEffect(() => {
        if (formData && isInitialStepSet) {
            return;
        }

        toggleIsLoading(true);

        const lastCorrectStepIndex = WAIVER_NOTICE_FORM_STEPS_ARRAY.findIndex((step) => {
            const result = step.schema.safeParse(parsedFormData[step.id]);

            return !result.success;
        });

        setLastPassedStepIndex(lastCorrectStepIndex);
        setCurrentStepIndex(lastCorrectStepIndex);

        if (formData) {
            toggleIsInitialStepSet(true);
            toggleIsLoading(false);
        }
        // eslint-disable-next-line
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
    const { formData, setFormStepData, toggleIsSubmitted } = useWaiverNoticeFormContext();

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
            if (data?.value) {
                setFormStepData('waiversListStep', data.value as WaiverNoticeForm['waiversListStep']);
                toggleIsSubmitted(true);

                // if (false) {
                //     toggleIsSuccessful();
                // }
            }
        },
    });

    React.useEffect(() => {
        toggleIsLoading(true);

        Object.keys(defaultValues ?? {}).forEach((key) => {
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
