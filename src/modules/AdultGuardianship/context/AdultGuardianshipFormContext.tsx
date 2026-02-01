import React, { useContext } from 'react';
import { flushSync } from 'react-dom';
import {
    adultGuardianshipCaseDetailsStepSchema,
    adultGuardianshipSafetyServiceStepSchema,
    adultGuardianshipWardLocationStepSchema,
} from '@/schemas/multiStepFormSchemas.ts';
import { useCounter, useLocalStorageValue, useToggle, useUnmountEffect } from '@react-hookz/web';
import { DeepKeys, DeepValue, Updater, useForm } from '@tanstack/react-form';
import { AdultGuardianshipForm, AdultGuardianshipFormStep, AnimationDirection } from '@/lib/types.ts';

type AdultGuardianshipFormContextType = {
    formData: AdultGuardianshipForm;
    steps: AdultGuardianshipFormStep[];
    currentStepIndex: number;
    currentStep: AdultGuardianshipFormStep;
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
    setFormStepData: <TField extends keyof AdultGuardianshipForm>(
        // eslint-disable-next-line no-unused-vars
        key: TField,
        // eslint-disable-next-line no-unused-vars
        data: AdultGuardianshipForm[TField]
    ) => void;
    lastPassedStepIndex: number;
};

export const ADULT_GUARDIANSHIP_FORM_KEY = 'ADULT_GUARDIANSHIP_multi-step-form';
export const ADULT_GUARDIANSHIP_FORM_KEY_SUBMITTED = 'ADULT_GUARDIANSHIP_multi-step-form-step_submitted';
export const ADULT_GUARDIANSHIP_FORM_KEY_SUCCESSFUL = 'ADULT_GUARDIANSHIP_multi-step-form-step_successful';

const ADULT_GUARDIANSHIP_FORM_STEPS = {
    caseDetailsStep: {
        id: 'caseDetailsStep',
        label: 'Case details',
        schema: adultGuardianshipCaseDetailsStepSchema,
        enabled: true,
    },
    wardLocationStep: {
        id: 'wardLocationStep',
        label: 'Ward location',
        schema: adultGuardianshipWardLocationStepSchema,
        enabled: true,
    },
    safetyServiceStep: {
        id: 'safetyServiceStep',
        label: 'Safety & service',
        schema: adultGuardianshipSafetyServiceStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof AdultGuardianshipForm, AdultGuardianshipFormStep>;
const ADULT_GUARDIANSHIP_FORM_STEPS_ARRAY = Object.values(ADULT_GUARDIANSHIP_FORM_STEPS).filter((step) => {
    return step.enabled;
});

const ADULT_GUARDIANSHIP_FORM_INITIAL_STATE: AdultGuardianshipForm = {
    caseDetailsStep: {
        guardianName: '',
        caseNumber: '',
        contactName: '',
        contactPhone: '',
    },
    wardLocationStep: {
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        wardPhone: '',
    },
    safetyServiceStep: {
        answer_1: '',
        answer_explanation_1: '',
        answer_2: '',
        answer_explanation_2: '',
        answer_3: '',
        answer_explanation_3: '',
    },
};

const AdultGuardianshipFormContext = React.createContext<AdultGuardianshipFormContextType>(
    {} as AdultGuardianshipFormContextType
);
AdultGuardianshipFormContext.displayName = 'AdultGuardianshipFormContext';

export const AdultGuardianshipFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { value: formData, set: setFormData } = useLocalStorageValue(ADULT_GUARDIANSHIP_FORM_KEY, {
        defaultValue:
            typeof window === 'undefined'
                ? JSON.stringify(ADULT_GUARDIANSHIP_FORM_INITIAL_STATE)
                : (localStorage?.getItem(ADULT_GUARDIANSHIP_FORM_KEY) ??
                  JSON.stringify(ADULT_GUARDIANSHIP_FORM_INITIAL_STATE)),
        initializeWithValue: false,
    });

    const { value: isSubmitted, set: toggleIsSubmitted } = useLocalStorageValue(ADULT_GUARDIANSHIP_FORM_KEY_SUBMITTED, {
        defaultValue:
            typeof window === 'undefined' ? false : !!localStorage?.getItem(ADULT_GUARDIANSHIP_FORM_KEY_SUBMITTED),
        initializeWithValue: false,
    });

    const { value: isSuccessful, set: toggleIsSuccessful } = useLocalStorageValue(
        ADULT_GUARDIANSHIP_FORM_KEY_SUCCESSFUL,
        {
            defaultValue:
                typeof window === 'undefined' ? false : !!localStorage?.getItem(ADULT_GUARDIANSHIP_FORM_KEY_SUCCESSFUL),
            initializeWithValue: false,
        }
    );

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
    ] = useCounter(0, ADULT_GUARDIANSHIP_FORM_STEPS_ARRAY.length - 1, 0);
    const [lastPassedStepIndex, { set: setLastPassedStepIndex }] = useCounter(0);

    const currentStep = ADULT_GUARDIANSHIP_FORM_STEPS_ARRAY[currentStepIndex];
    const isLastStep =
        currentStep.id === ADULT_GUARDIANSHIP_FORM_STEPS_ARRAY[ADULT_GUARDIANSHIP_FORM_STEPS_ARRAY.length - 1].id;
    const canGoBack = currentStepIndex > 0;

    const parsedFormData = React.useMemo(() => {
        if (!formData) {
            return ADULT_GUARDIANSHIP_FORM_INITIAL_STATE;
        }

        return JSON.parse(formData) as AdultGuardianshipForm;
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
        <TField extends keyof AdultGuardianshipForm>(key: TField, data: AdultGuardianshipForm[TField]) => {
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
    }, [resetCurrentStepIndex]);

    const memoizedValue = React.useMemo(() => {
        return {
            formData: parsedFormData,
            currentStepIndex,
            steps: ADULT_GUARDIANSHIP_FORM_STEPS_ARRAY,
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

        const lastCorrectStepIndex = ADULT_GUARDIANSHIP_FORM_STEPS_ARRAY.findIndex((step) => {
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

    return <AdultGuardianshipFormContext value={memoizedValue}>{children}</AdultGuardianshipFormContext>;
};

export const useAdultGuardianshipFormContext = () => {
    const context = useContext(AdultGuardianshipFormContext);

    return context;
};

export const useAdultGuardianshipFormStepForm = <TStepId extends keyof AdultGuardianshipForm>(stepId: TStepId) => {
    const { formData, setFormStepData, toggleIsSubmitted } = useAdultGuardianshipFormContext();

    const [isLoading, toggleIsLoading] = useToggle(true);

    const formDataValue = formData[stepId];

    const defaultValues = typeof window === 'undefined' ? ADULT_GUARDIANSHIP_FORM_INITIAL_STATE[stepId] : formDataValue;

    // eslint-disable-next-line
    // @ts-ignore
    const form = useForm<AdultGuardianshipForm[TStepId]>({
        defaultValues: formDataValue as AdultGuardianshipForm[TStepId],
        validators: {
            onMount: ADULT_GUARDIANSHIP_FORM_STEPS[stepId].schema,
            onChange: ADULT_GUARDIANSHIP_FORM_STEPS[stepId].schema,
            onSubmit: ADULT_GUARDIANSHIP_FORM_STEPS[stepId].schema,
        },
        onSubmit: (data) => {
            if (data?.value) {
                setFormStepData('safetyServiceStep', data.value as AdultGuardianshipForm['safetyServiceStep']);
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
                key as DeepKeys<AdultGuardianshipForm[TStepId]>,
                defaultValues[key as keyof AdultGuardianshipForm[TStepId]] as Updater<
                    DeepValue<AdultGuardianshipForm[TStepId], DeepKeys<AdultGuardianshipForm[TStepId]>>
                >
            );
        });

        toggleIsLoading(false);
    }, [form, formData, defaultValues, stepId, toggleIsLoading]);

    return { form, isLoading };
};
