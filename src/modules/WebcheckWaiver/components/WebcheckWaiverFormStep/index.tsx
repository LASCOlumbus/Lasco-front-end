import React from 'react';
import { WebcheckWaiverForm } from '@/lib/types.ts';
import FailureSection from '@/components/FailureSection';
import SuccessSection from '@/components/SuccessSection';
import { useWebcheckWaiverFormContext } from '../../context/WebcheckWaiverFormContext.tsx';
import { WebcheckWaiverFormStepProps } from './types.ts';

const WebcheckWaiverFormStep: React.FC<React.PropsWithChildren<WebcheckWaiverFormStepProps>> = ({ children, id }) => {
    const { currentStep, isSuccessful, isSubmitted, toggleIsSubmitted } = useWebcheckWaiverFormContext();

    if (currentStep.id !== (id as keyof WebcheckWaiverForm)) {
        return null;
    }

    if (isSubmitted && isSuccessful) {
        return (
            <SuccessSection
                title="Webcheck waiver form has been submitted"
                description="To finish your filing, please download the generated document, print it, and sign it. The court requires a physical signature. Unsigned documents cannot be processed."
            />
        );
    }

    if (isSubmitted && !isSuccessful) {
        return (
            <FailureSection
                title="Waiver of notice form has not been submitted"
                description="Something went wrong while submitting your form. Your answers are saved. Please try again."
                handleTryAgain={() => {
                    toggleIsSubmitted();
                }}
            />
        );
    }

    return children;
};

export default WebcheckWaiverFormStep;
