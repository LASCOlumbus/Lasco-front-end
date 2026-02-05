import type { DeepKeys, DeepValue, FormValidateOrFn, Updater } from '@tanstack/react-form';
import React from 'react';
import { flushSync } from 'react-dom';
import { useCounter, useLocalStorageValue, useToggle, useUnmountEffect } from '@react-hookz/web';
import { AdultJurisdictionAffidavitForm, AdultJurisdictionAffidavitFormStep, AnimationDirection } from '@/lib/types';
import { useAppForm } from '@/components/Forms/hooks/useAppForm';
import {
    adultJurisdictionAffidavitAddressInformStepSchema,
    adultJurisdictionAffidavitCaseDetailsStepSchema,
    adultJurisdictionAffidavitLegalQuestionsStepSchema,
} from '../schemas/adultJurisdictionAffidavit';

type AdultJurisdictionAffidavitFormContext = {
    formData: AdultJurisdictionAffidavitForm;
    steps: AdultJurisdictionAffidavitFormStep[];
    currentStepIndex: number;
    currentStep: AdultJurisdictionAffidavitFormStep;
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
    setFormStepData: <TField extends keyof AdultJurisdictionAffidavitForm>(
        // eslint-disable-next-line no-unused-vars
        key: TField,
        // eslint-disable-next-line no-unused-vars
        data: AdultJurisdictionAffidavitForm[TField]
    ) => void;
    lastPassedStepIndex: number;
};

export const ADULT_JURISDICTION_AFFIDAVIT_FORM_KEY = 'ADULT_JURISDICTION_AFFIDAVIT_multi-step-form';
export const ADULT_JURISDICTION_AFFIDAVIT_FORM_KEY_SUBMITTED =
    'ADULT_JURISDICTION_AFFIDAVIT_multi-step-form-step_submitted';
export const ADULT_JURISDICTION_AFFIDAVIT_FORM_KEY_SUCCESSFUL =
    'ADULT_JURISDICTION_AFFIDAVIT_multi-step-form-step_successful';

export const ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS = {
    caseDetailsStep: {
        id: 'caseDetailsStep',
        label: 'Case details',
        schema: adultJurisdictionAffidavitCaseDetailsStepSchema,
        enabled: true,
    },
    addressInformStep: {
        id: 'addressInformStep',
        label: 'Address information',
        schema: adultJurisdictionAffidavitAddressInformStepSchema,
        enabled: true,
    },
    legalQuestionsStep: {
        id: 'legalQuestionsStep',
        label: 'Family and employment',
        schema: adultJurisdictionAffidavitLegalQuestionsStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof AdultJurisdictionAffidavitForm, AdultJurisdictionAffidavitFormStep>;
const ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS_ARRAY = Object.values(ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS).filter(
    (step) => {
        return step.enabled;
    }
);

const ADULT_JURISDICTION_AFFIDAVIT_FORM_INITIAL_STATE: AdultJurisdictionAffidavitForm = {
    caseDetailsStep: {
        guardianName: '',
        caseNumber: '',
        applicantName: '',
    },
    addressInformStep: {
        currentAddress: '',
        from: null,
        to: null,
        withWhom: '',
        isSameAddressLast2Years: null,
        previousAddresses: [
            {
                address: '',
                from: null,
                to: null,
            },
        ],
    },
    legalQuestionsStep: {
        isAffiantHaveInfoAboutAnyGuardianship: null,
        infoAboutCourtProceeding: '',
        isAllegedIncompetentDivorced: null,
        isDivorcePending: null,
        courtName: '',
        isAllegedIncompetentCurrently: null,
        additionalInfo: '',
    },
};

const AdultJurisdictionAffidavitFormContext = React.createContext<AdultJurisdictionAffidavitFormContext>(
    {} as AdultJurisdictionAffidavitFormContext
);
AdultJurisdictionAffidavitFormContext.displayName = 'AdultJurisdictionAffidavitFormContext';

export const AdultJurisdictionAffidavitFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { value: formData, set: setFormData } = useLocalStorageValue(ADULT_JURISDICTION_AFFIDAVIT_FORM_KEY, {
        defaultValue:
            typeof window === 'undefined'
                ? JSON.stringify(ADULT_JURISDICTION_AFFIDAVIT_FORM_INITIAL_STATE)
                : (localStorage?.getItem(ADULT_JURISDICTION_AFFIDAVIT_FORM_KEY) ??
                  JSON.stringify(ADULT_JURISDICTION_AFFIDAVIT_FORM_INITIAL_STATE)),
        initializeWithValue: false,
    });

    const { value: isSubmitted, set: toggleIsSubmitted } = useLocalStorageValue(
        ADULT_JURISDICTION_AFFIDAVIT_FORM_KEY_SUBMITTED,
        {
            defaultValue:
                typeof window === 'undefined'
                    ? false
                    : !!localStorage?.getItem(ADULT_JURISDICTION_AFFIDAVIT_FORM_KEY_SUBMITTED),
            initializeWithValue: false,
        }
    );

    const { value: isSuccessful, set: toggleIsSuccessful } = useLocalStorageValue(
        ADULT_JURISDICTION_AFFIDAVIT_FORM_KEY_SUCCESSFUL,
        {
            defaultValue:
                typeof window === 'undefined'
                    ? false
                    : !!localStorage?.getItem(ADULT_JURISDICTION_AFFIDAVIT_FORM_KEY_SUCCESSFUL),
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
    ] = useCounter(0, ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS_ARRAY.length - 1, 0);
    const [lastPassedStepIndex, { set: setLastPassedStepIndex }] = useCounter(0);

    const currentStep = ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS_ARRAY[currentStepIndex];
    const isLastStep =
        currentStep.id ===
        ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS_ARRAY[ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS_ARRAY.length - 1].id;
    const canGoBack = currentStepIndex > 0;

    const parsedFormData = React.useMemo(() => {
        if (!formData) {
            return ADULT_JURISDICTION_AFFIDAVIT_FORM_INITIAL_STATE;
        }

        return JSON.parse(formData) as AdultJurisdictionAffidavitForm;
    }, [formData]);

    const goToNextStep = React.useCallback(() => {
        flushSync(() => {
            setAnimationDirection('next');
        });

        const isLastStepBeforeIncrement = currentStepIndex === ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS_ARRAY.length - 1;

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
        <TField extends keyof AdultJurisdictionAffidavitForm>(
            key: TField,
            data: AdultJurisdictionAffidavitForm[TField]
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
            steps: ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS_ARRAY,
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

        const lastCorrectStepIndex = ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS_ARRAY.findIndex((step) => {
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
        <AdultJurisdictionAffidavitFormContext value={memoizedValue}>{children}</AdultJurisdictionAffidavitFormContext>
    );
};

export const useAdultJurisdictionAffidavitFormContext = () => {
    const context = React.useContext(AdultJurisdictionAffidavitFormContext);

    return context;
};

export const useAdultJurisdictionAffidavitFormStepForm = <TStepId extends keyof AdultJurisdictionAffidavitForm>(
    stepId: TStepId
) => {
    const { formData, setFormStepData, goToNextStep } = useAdultJurisdictionAffidavitFormContext();

    const [isLoading, toggleIsLoading] = useToggle(true);

    const stepSchema = ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS[stepId].schema as FormValidateOrFn<
        AdultJurisdictionAffidavitForm[TStepId]
    >;
    const stepValues = formData[stepId] as AdultJurisdictionAffidavitForm[TStepId];
    const defaultValues =
        typeof window === 'undefined' ? ADULT_JURISDICTION_AFFIDAVIT_FORM_INITIAL_STATE[stepId] : stepValues;

    const form = useAppForm({
        defaultValues: stepValues,
        validators: {
            onMount: stepSchema,
            onChange: stepSchema,
            onSubmit: stepSchema,
        },
        onSubmit: (data) => {
            if (data?.value) {
                setFormStepData(stepId, data.value as AdultJurisdictionAffidavitForm[TStepId]);

                goToNextStep();
            }
        },
    });

    React.useEffect(() => {
        toggleIsLoading(true);

        Object.keys(defaultValues ?? {}).forEach((key) => {
            form.setFieldValue(
                key as DeepKeys<AdultJurisdictionAffidavitForm[TStepId]>,
                defaultValues[key as keyof AdultJurisdictionAffidavitForm[TStepId]] as Updater<
                    DeepValue<
                        AdultJurisdictionAffidavitForm[TStepId],
                        DeepKeys<AdultJurisdictionAffidavitForm[TStepId]>
                    >
                >
            );
        });

        toggleIsLoading(false);
    }, [form, formData, defaultValues, stepId, toggleIsLoading]);

    return { form, isLoading };
};
