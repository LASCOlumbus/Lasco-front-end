import type { DeepKeys, DeepValue, FormValidateOrFn, Updater } from '@tanstack/react-form';
import type {
    AnimationDirection,
    ApplicantCredibilityApplicationForm,
    ApplicantCredibilityApplicationFormStep,
} from '@/lib/types';
import React from 'react';
import { flushSync } from 'react-dom';
import { useCounter, useLocalStorageValue, useToggle, useUnmountEffect } from '@react-hookz/web';
import { useAppForm } from '@/components/Forms/hooks/useAppForm';
import {
    applicantCredibilityApplicationApplicantInformStepSchema,
    applicantCredibilityApplicationBankingInformStepSchema,
    applicantCredibilityApplicationCaseDetailsStepSchema,
    applicantCredibilityApplicationFamilyAndEmploymentStepSchema,
    applicantCredibilityApplicationLegalAndFinancialHistoryStepSchema,
} from '../schemas/applicantCredibilityApplication';

type ApplicantCredibilityApplicationFormContext = {
    formData: ApplicantCredibilityApplicationForm;
    steps: ApplicantCredibilityApplicationFormStep[];
    currentStepIndex: number;
    currentStep: ApplicantCredibilityApplicationFormStep;
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
    setFormStepData: <TField extends keyof ApplicantCredibilityApplicationForm>(
        // eslint-disable-next-line no-unused-vars
        key: TField,
        // eslint-disable-next-line no-unused-vars
        data: ApplicantCredibilityApplicationForm[TField]
    ) => void;
    lastPassedStepIndex: number;
};

export const APPLICANT_CREDIBILITY_APPLICATION_FORM_KEY = 'APPLICANT_CREDIBILITY_APPLICATION_multi-step-form';
export const APPLICANT_CREDIBILITY_APPLICATION_FORM_KEY_SUBMITTED =
    'APPLICANT_CREDIBILITY_APPLICATION_multi-step-form-step_submitted';
export const APPLICANT_CREDIBILITY_APPLICATION_FORM_KEY_SUCCESSFUL =
    'APPLICANT_CREDIBILITY_APPLICATION_multi-step-form-step_successful';

export const APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS = {
    caseDetailsStep: {
        id: 'caseDetailsStep',
        label: 'Case details',
        schema: applicantCredibilityApplicationCaseDetailsStepSchema,
        enabled: true,
    },
    applicantInformStep: {
        id: 'applicantInformStep',
        label: 'Applicant information',
        schema: applicantCredibilityApplicationApplicantInformStepSchema,
        enabled: true,
    },
    familyAndEmploymentStep: {
        id: 'familyAndEmploymentStep',
        label: 'Family and employment',
        schema: applicantCredibilityApplicationFamilyAndEmploymentStepSchema,
        enabled: true,
    },
    bankingInformStep: {
        id: 'bankingInformStep',
        label: 'Banking information',
        schema: applicantCredibilityApplicationBankingInformStepSchema,
        enabled: true,
    },
    legalAndFinancialHistoryStep: {
        id: 'legalAndFinancialHistoryStep',
        label: 'Legal & financial history',
        schema: applicantCredibilityApplicationLegalAndFinancialHistoryStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof ApplicantCredibilityApplicationForm, ApplicantCredibilityApplicationFormStep>;
const APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS_ARRAY = Object.values(
    APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS
).filter((step) => {
    return step.enabled;
});

const APPLICANT_CREDIBILITY_APPLICATION_FORM_INITIAL_STATE: ApplicantCredibilityApplicationForm = {
    caseDetailsStep: {
        guardianName: '',
        caseNumber: '',
    },
    applicantInformStep: {
        applicantName: '',
        dob: null,
        applicantAddress: {
            streetAddress: '',
            city: '',
            state: '',
            zip: '',
            from: null,
            isSameAddressLast5Years: null,
            previousAddresses: [
                {
                    address: '',
                    from: null,
                    to: null,
                },
            ],
        },
    },
    familyAndEmploymentStep: {
        isMarried: null,
        marriage: {
            spouseName: '',
            yearMarried: '',
            spouseStreetAddress: '',
            city: '',
            state: '',
            zip: '',
        },
        employment: {
            currentEmployer: '',
            from: null,
            isSameEmployerLast5Years: null,
            previousEmployers: [
                {
                    employer: '',
                    from: null,
                    to: null,
                },
            ],
        },
    },
    bankingInformStep: {
        bankName: '',
        accountType: [],
    },
    legalAndFinancialHistoryStep: {
        isApplicantEverFiledBankruptcy: null,
        isApplicantEverBeenGarnished: null,
        isApplicantEverBeenInReceivership: null,
        isApplicantEverBeenConvictedFelony: null,
        isApplicantHadExperienceHandlingInvestments: null,
        explanation: '',
    },
};

const ApplicantCredibilityApplicationFormContext = React.createContext<ApplicantCredibilityApplicationFormContext>(
    {} as ApplicantCredibilityApplicationFormContext
);
ApplicantCredibilityApplicationFormContext.displayName = 'ApplicantCredibilityApplicationFormContext';

export const ApplicantCredibilityApplicationFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { value: formData, set: setFormData } = useLocalStorageValue(APPLICANT_CREDIBILITY_APPLICATION_FORM_KEY, {
        defaultValue:
            typeof window === 'undefined'
                ? JSON.stringify(APPLICANT_CREDIBILITY_APPLICATION_FORM_INITIAL_STATE)
                : (localStorage?.getItem(APPLICANT_CREDIBILITY_APPLICATION_FORM_KEY) ??
                  JSON.stringify(APPLICANT_CREDIBILITY_APPLICATION_FORM_INITIAL_STATE)),
        initializeWithValue: false,
    });

    const { value: isSubmitted, set: toggleIsSubmitted } = useLocalStorageValue(
        APPLICANT_CREDIBILITY_APPLICATION_FORM_KEY_SUBMITTED,
        {
            defaultValue:
                typeof window === 'undefined'
                    ? false
                    : !!localStorage?.getItem(APPLICANT_CREDIBILITY_APPLICATION_FORM_KEY_SUBMITTED),
            initializeWithValue: false,
        }
    );

    const { value: isSuccessful, set: toggleIsSuccessful } = useLocalStorageValue(
        APPLICANT_CREDIBILITY_APPLICATION_FORM_KEY_SUCCESSFUL,
        {
            defaultValue:
                typeof window === 'undefined'
                    ? false
                    : !!localStorage?.getItem(APPLICANT_CREDIBILITY_APPLICATION_FORM_KEY_SUCCESSFUL),
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
    ] = useCounter(0, APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS_ARRAY.length - 1, 0);
    const [lastPassedStepIndex, { set: setLastPassedStepIndex }] = useCounter(0);

    const currentStep = APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS_ARRAY[currentStepIndex];
    const isLastStep =
        currentStep.id ===
        APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS_ARRAY[
            APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS_ARRAY.length - 1
        ].id;
    const canGoBack = currentStepIndex > 0;

    const parsedFormData = React.useMemo(() => {
        if (!formData) {
            return APPLICANT_CREDIBILITY_APPLICATION_FORM_INITIAL_STATE;
        }

        return JSON.parse(formData) as ApplicantCredibilityApplicationForm;
    }, [formData]);

    const goToNextStep = React.useCallback(() => {
        flushSync(() => {
            setAnimationDirection('next');
        });

        const isLastStepBeforeIncrement =
            currentStepIndex === APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS_ARRAY.length - 1;

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

        [setCurrentStepIndex, lastPassedStepIndex, currentStepIndex, setAnimationDirection]
    );

    const setFormStepData = React.useCallback(
        <TField extends keyof ApplicantCredibilityApplicationForm>(
            key: TField,
            data: ApplicantCredibilityApplicationForm[TField]
        ) => {
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
            steps: APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS_ARRAY,
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

    // React.useEffect(() => {
    //     if (currentStepIndex > lastPassedStepIndex) {
    //         setLastPassedStepIndex(currentStepIndex);
    //     }
    //     // eslint-disable-next-line
    // }, [currentStepIndex]);

    React.useEffect(() => {
        if (formData && isInitialStepSet) {
            return;
        }

        toggleIsLoading(true);

        const lastCorrectStepIndex = APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS_ARRAY.findIndex((step) => {
            const result = step.schema.safeParse(parsedFormData[step.id]);

            return !result.success;
        });

        setLastPassedStepIndex(lastCorrectStepIndex);
        setCurrentStepIndex(lastCorrectStepIndex);

        if (formData) {
            toggleIsInitialStepSet(true);
            toggleIsLoading(false);
        }
    }, [
        formData,
        isInitialStepSet,
        parsedFormData,
        setCurrentStepIndex,
        toggleIsInitialStepSet,
        toggleIsLoading,
        setLastPassedStepIndex,
    ]);

    useUnmountEffect(() => {
        cleanUp();
    });

    return (
        <ApplicantCredibilityApplicationFormContext value={memoizedValue}>
            {children}
        </ApplicantCredibilityApplicationFormContext>
    );
};

export const useApplicantCredibilityApplicationFormContext = () => {
    const context = React.useContext(ApplicantCredibilityApplicationFormContext);

    return context;
};

export const useApplicantCredibilityApplicationFormStepForm = <
    TStepId extends keyof ApplicantCredibilityApplicationForm,
>(
    stepId: TStepId
) => {
    const { formData, setFormStepData, goToNextStep } = useApplicantCredibilityApplicationFormContext();

    const [isLoading, toggleIsLoading] = useToggle(true);

    const stepSchema = APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS[stepId].schema as FormValidateOrFn<
        ApplicantCredibilityApplicationForm[TStepId]
    >;
    const stepValues = formData[stepId] as ApplicantCredibilityApplicationForm[TStepId];
    const defaultValues =
        typeof window === 'undefined' ? APPLICANT_CREDIBILITY_APPLICATION_FORM_INITIAL_STATE[stepId] : stepValues;

    const form = useAppForm({
        defaultValues: stepValues,
        validators: {
            onMount: stepSchema,
            onChange: stepSchema,
            onSubmit: stepSchema,
        },
        onSubmit: (data) => {
            if (data?.value) {
                setFormStepData(stepId, data.value as ApplicantCredibilityApplicationForm[TStepId]);
                goToNextStep();
            }
        },
    });

    React.useEffect(() => {
        toggleIsLoading(true);

        Object.keys(defaultValues ?? {}).forEach((key) => {
            form.setFieldValue(
                key as DeepKeys<ApplicantCredibilityApplicationForm[TStepId]>,
                defaultValues[key as keyof ApplicantCredibilityApplicationForm[TStepId]] as Updater<
                    DeepValue<
                        ApplicantCredibilityApplicationForm[TStepId],
                        DeepKeys<ApplicantCredibilityApplicationForm[TStepId]>
                    >
                >
            );
        });

        toggleIsLoading(false);
    }, [form, formData, defaultValues, stepId, toggleIsLoading]);

    return { form, isLoading };
};
