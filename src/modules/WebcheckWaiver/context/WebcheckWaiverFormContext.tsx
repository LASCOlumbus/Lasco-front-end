import type { AnimationDirection, WebcheckWaiverForm, WebcheckWaiverFormStep } from '@/lib/types';
import React, { useContext } from 'react';
import { flushSync } from 'react-dom';
import { useCounter, useLocalStorageValue, useToggle, useUnmountEffect } from '@react-hookz/web';
import { DeepKeys, DeepValue, Updater, useForm } from '@tanstack/react-form';
import { webcheckWaiverStepSchema } from '../schemas/webcheckWaiverFormSchemas';

type WebcheckWaiverFormContextType = {
    formData: WebcheckWaiverForm;
    steps: WebcheckWaiverFormStep[];
    currentStepIndex: number;
    currentStep: WebcheckWaiverFormStep;
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
    setFormStepData: <TField extends keyof WebcheckWaiverForm>(
        // eslint-disable-next-line no-unused-vars
        key: TField,
        // eslint-disable-next-line no-unused-vars
        data: WebcheckWaiverForm[TField]
    ) => void;
};

export const WEBCHECK_WAIVER_FORM_KEY = 'WEBCHECK_WAIVER_multi-step-form';

const WEBCHECK_WAIVER_FORM_STEPS = {
    webcheckWaiverStep: {
        id: 'webcheckWaiverStep',
        label: 'Webcheck Waiver',
        schema: webcheckWaiverStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof WebcheckWaiverForm, WebcheckWaiverFormStep>;
const WEBCHECK_WAIVER_FORM_STEPS_ARRAY = Object.values(WEBCHECK_WAIVER_FORM_STEPS).filter((step) => {
    return step.enabled;
});

const WEBCHECK_WAIVER_FORM_INITIAL_STATE: WebcheckWaiverForm = {
    webcheckWaiverStep: {
        guardianName: '',
        caseNumber: '',
        applicantName: '',
    },
};

const WebcheckWaiverFormContext = React.createContext<WebcheckWaiverFormContextType>(
    {} as WebcheckWaiverFormContextType
);
WebcheckWaiverFormContext.displayName = 'WebcheckWaiverFormContext';

export const WebcheckWaiverFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { value: formData, set: setFormData } = useLocalStorageValue(WEBCHECK_WAIVER_FORM_KEY, {
        defaultValue:
            typeof window === 'undefined'
                ? JSON.stringify(WEBCHECK_WAIVER_FORM_INITIAL_STATE)
                : (localStorage?.getItem(WEBCHECK_WAIVER_FORM_KEY) ??
                  JSON.stringify(WEBCHECK_WAIVER_FORM_INITIAL_STATE)),
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
    ] = useCounter(0, WEBCHECK_WAIVER_FORM_STEPS_ARRAY.length - 1, 0);

    const currentStep = WEBCHECK_WAIVER_FORM_STEPS_ARRAY[currentStepIndex];
    const isLastStep =
        currentStep.id === WEBCHECK_WAIVER_FORM_STEPS_ARRAY[WEBCHECK_WAIVER_FORM_STEPS_ARRAY.length - 1].id;
    const canGoBack = currentStepIndex > 0;

    const parsedFormData = React.useMemo(() => {
        if (!formData) {
            return WEBCHECK_WAIVER_FORM_INITIAL_STATE;
        }

        return JSON.parse(formData) as WebcheckWaiverForm;
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
        <TField extends keyof WebcheckWaiverForm>(key: TField, data: WebcheckWaiverForm[TField]) => {
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
        setFormData(JSON.stringify(WEBCHECK_WAIVER_FORM_INITIAL_STATE));
    }, [resetCurrentStepIndex, setFormData]);

    const memoizedValue = React.useMemo(() => {
        return {
            formData: parsedFormData,
            currentStepIndex,
            steps: WEBCHECK_WAIVER_FORM_STEPS_ARRAY,
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

        const lastCorrectStepIndex = WEBCHECK_WAIVER_FORM_STEPS_ARRAY.findIndex((step) => {
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

    return <WebcheckWaiverFormContext value={memoizedValue}>{children}</WebcheckWaiverFormContext>;
};

export const useWebcheckWaiverFormContext = () => {
    const context = useContext(WebcheckWaiverFormContext);

    return context;
};

export const useWebcheckWaiverFormStepForm = <TStepId extends keyof WebcheckWaiverForm>(stepId: TStepId) => {
    const { formData, setFormStepData, toggleIsSubmitted, toggleIsSuccessful } = useWebcheckWaiverFormContext();

    const [isLoading, toggleIsLoading] = useToggle(true);

    const formDataValue = formData[stepId];

    const defaultValues = typeof window === 'undefined' ? WEBCHECK_WAIVER_FORM_INITIAL_STATE[stepId] : formDataValue;

    // eslint-disable-next-line
    // @ts-ignore
    const form = useForm<WebcheckWaiverForm[TStepId]>({
        defaultValues: formDataValue as WebcheckWaiverForm[TStepId],
        validators: {
            onSubmit: WEBCHECK_WAIVER_FORM_STEPS[stepId].schema,
        },
        onSubmit: (data) => {
            if (data?.value) {
                setFormStepData('webcheckWaiverStep', data.value);
                toggleIsSubmitted();
                toggleIsSuccessful();
            }
        },
    });

    React.useEffect(() => {
        toggleIsLoading(true);

        Object.keys(defaultValues ?? {}).forEach((key: string) => {
            form.setFieldValue(
                key as DeepKeys<WebcheckWaiverForm[TStepId]>,
                defaultValues[key as keyof WebcheckWaiverForm[TStepId]] as Updater<
                    DeepValue<WebcheckWaiverForm[TStepId], DeepKeys<WebcheckWaiverForm[TStepId]>>
                >
            );
        });

        toggleIsLoading(false);
    }, [form, formData, defaultValues, stepId, toggleIsLoading]);

    return { form, isLoading };
};
