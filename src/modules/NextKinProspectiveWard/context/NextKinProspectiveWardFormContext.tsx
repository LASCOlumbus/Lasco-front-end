import type { DeepKeys, DeepValue, FormValidateOrFn, Updater } from '@tanstack/react-form';
import type { AnimationDirection, NextKinProspectiveWardForm, NextKinProspectiveWardFormStep } from '@/lib/types';
import React from 'react';
import { flushSync } from 'react-dom';
import { useCounter, useLocalStorageValue, useToggle, useUnmountEffect } from '@react-hookz/web';
import { useAppForm } from '@/components/Forms/hooks/useAppForm';
import {
    nextKinProspectiveWardCaseDetailsStepSchema,
    nextKinProspectiveWardWaiversListStepSchema,
} from '../schemas/nextKinProspectiveWard';

type NextKinProspectiveWardFormContext = {
    formData: NextKinProspectiveWardForm;
    steps: NextKinProspectiveWardFormStep[];
    currentStepIndex: number;
    currentStep: NextKinProspectiveWardFormStep;
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
    setFormStepData: <TField extends keyof NextKinProspectiveWardForm>(
        // eslint-disable-next-line no-unused-vars
        key: TField,
        // eslint-disable-next-line no-unused-vars
        data: NextKinProspectiveWardForm[TField]
    ) => void;
    lastPassedStepIndex: number;
};

export const NEXT_KIN_PROSPECTIVE_WARD_FORM_KEY = 'NEXT_KIN_PROSPECTIVE_WARD_multi-step-form';
export const NEXT_KIN_PROSPECTIVE_WARD_FORM_KEY_SUBMITTED = 'NEXT_KIN_PROSPECTIVE_WARD_multi-step-form-step_submitted';
export const NEXT_KIN_PROSPECTIVE_WARD_FORM_KEY_SUCCESSFUL =
    'NEXT_KIN_PROSPECTIVE_WARD_multi-step-form-step_successful';

export const NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS = {
    caseDetailsStep: {
        id: 'caseDetailsStep',
        label: 'Case details',
        schema: nextKinProspectiveWardCaseDetailsStepSchema,
        enabled: true,
    },
    waiversListStep: {
        id: 'waiversListStep',
        label: 'Waivers list',
        schema: nextKinProspectiveWardWaiversListStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof NextKinProspectiveWardForm, NextKinProspectiveWardFormStep>;
const NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS_ARRAY = Object.values(NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS).filter(
    (step) => {
        return step.enabled;
    }
);

const NEXT_KIN_PROSPECTIVE_WARD_FORM_INITIAL_STATE: NextKinProspectiveWardForm = {
    caseDetailsStep: {
        guardianName: '',
        caseNumber: '',
        applicantName: '',
    },
    waiversListStep: {
        relatives: [
            {
                fullName: '',
                isRelativeUnder18: false,
                relationship: '',
                address: '',
                zip: '',
            },
        ],
    },
};

const NextKinProspectiveWardFormContext = React.createContext<NextKinProspectiveWardFormContext>(
    {} as NextKinProspectiveWardFormContext
);
NextKinProspectiveWardFormContext.displayName = 'NextKinProspectiveWardFormContext';

export const NextKinProspectiveWardFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { value: formData, set: setFormData } = useLocalStorageValue(NEXT_KIN_PROSPECTIVE_WARD_FORM_KEY, {
        defaultValue:
            typeof window === 'undefined'
                ? JSON.stringify(NEXT_KIN_PROSPECTIVE_WARD_FORM_INITIAL_STATE)
                : (localStorage?.getItem(NEXT_KIN_PROSPECTIVE_WARD_FORM_KEY) ??
                  JSON.stringify(NEXT_KIN_PROSPECTIVE_WARD_FORM_INITIAL_STATE)),
        initializeWithValue: false,
    });

    const { value: isSubmitted, set: toggleIsSubmitted } = useLocalStorageValue(
        NEXT_KIN_PROSPECTIVE_WARD_FORM_KEY_SUBMITTED,
        {
            defaultValue:
                typeof window === 'undefined'
                    ? false
                    : !!localStorage?.getItem(NEXT_KIN_PROSPECTIVE_WARD_FORM_KEY_SUBMITTED),
            initializeWithValue: false,
        }
    );

    const { value: isSuccessful, set: toggleIsSuccessful } = useLocalStorageValue(
        NEXT_KIN_PROSPECTIVE_WARD_FORM_KEY_SUCCESSFUL,
        {
            defaultValue:
                typeof window === 'undefined'
                    ? false
                    : !!localStorage?.getItem(NEXT_KIN_PROSPECTIVE_WARD_FORM_KEY_SUCCESSFUL),
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
    ] = useCounter(0, NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS_ARRAY.length - 1, 0);
    const [lastPassedStepIndex, { set: setLastPassedStepIndex }] = useCounter(0);

    const currentStep = NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS_ARRAY[currentStepIndex];
    const isLastStep =
        currentStep.id ===
        NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS_ARRAY[NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS_ARRAY.length - 1].id;
    const canGoBack = currentStepIndex > 0;

    const parsedFormData = React.useMemo(() => {
        if (!formData) {
            return NEXT_KIN_PROSPECTIVE_WARD_FORM_INITIAL_STATE;
        }

        return JSON.parse(formData) as NextKinProspectiveWardForm;
    }, [formData]);

    const goToNextStep = React.useCallback(() => {
        flushSync(() => {
            setAnimationDirection('next');
        });

        const isLastStepBeforeIncrement = currentStepIndex === NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS_ARRAY.length - 1;

        incrementCurrentStepIndex();

        if (isLastStepBeforeIncrement) {
            toggleIsSubmitted(true);
        }
    }, [currentStepIndex, incrementCurrentStepIndex, toggleIsSubmitted]);

    const goToPreviousStep = React.useCallback(() => {
        if (!canGoBack) {
            return;
        }

        flushSync(() => {
            setAnimationDirection('prev');
        });

        decrementCurrentStepIndex();
    }, [canGoBack, decrementCurrentStepIndex]);

    const goToSelectStep = React.useCallback(
        (step: number) => {
            if (step <= lastPassedStepIndex + 1) {
                if (currentStepIndex > step) {
                    flushSync(() => {
                        setAnimationDirection('prev');
                    });
                } else if (currentStepIndex < step) {
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
        <TField extends keyof NextKinProspectiveWardForm>(key: TField, data: NextKinProspectiveWardForm[TField]) => {
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
            steps: NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS_ARRAY,
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

        const lastCorrectStepIndex = NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS_ARRAY.findIndex((step) => {
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

    return <NextKinProspectiveWardFormContext value={memoizedValue}>{children}</NextKinProspectiveWardFormContext>;
};

export const useNextKinProspectiveWardFormContext = () => {
    const context = React.useContext(NextKinProspectiveWardFormContext);

    return context;
};

export const useNextKinProspectiveWardFormStepForm = <TStepId extends keyof NextKinProspectiveWardForm>(
    stepId: TStepId
) => {
    const { formData, setFormStepData, goToNextStep } = useNextKinProspectiveWardFormContext();

    const [isLoading, toggleIsLoading] = useToggle(true);

    const stepSchema = NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS[stepId].schema as FormValidateOrFn<
        NextKinProspectiveWardForm[TStepId]
    >;
    const stepValues = formData[stepId] as NextKinProspectiveWardForm[TStepId];
    const defaultValues =
        typeof window === 'undefined' ? NEXT_KIN_PROSPECTIVE_WARD_FORM_INITIAL_STATE[stepId] : stepValues;

    const form = useAppForm({
        defaultValues: stepValues,
        validators: {
            onMount: stepSchema,
            onChange: stepSchema,
            onSubmit: stepSchema,
        },
        onSubmit: (data) => {
            if (data?.value) {
                setFormStepData(stepId, data.value as NextKinProspectiveWardForm[TStepId]);

                goToNextStep();
            }
        },
    });

    React.useEffect(() => {
        toggleIsLoading(true);

        Object.keys(defaultValues ?? {}).forEach((key) => {
            form.setFieldValue(
                key as DeepKeys<NextKinProspectiveWardForm[TStepId]>,
                defaultValues[key as keyof NextKinProspectiveWardForm[TStepId]] as Updater<
                    DeepValue<NextKinProspectiveWardForm[TStepId], DeepKeys<NextKinProspectiveWardForm[TStepId]>>
                >
            );
        });

        toggleIsLoading(false);
    }, [form, formData, defaultValues, stepId, toggleIsLoading]);

    return { form, isLoading };
};
