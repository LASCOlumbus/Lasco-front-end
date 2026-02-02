import React from 'react';
import { WaiverNoticeForm } from '@/lib/types.ts';
import FailureSection from '@/components/FailureSection';
import SuccessSection from '@/components/SuccessSection';
import { useWaiverNoticeFormContext } from '../../context/WaiverNoticeFormContext.tsx';
import { WaiverNoticeFormStepProps } from './types.ts';

const WaiverNoticeFormStep: React.FC<React.PropsWithChildren<WaiverNoticeFormStepProps>> = ({ children, id }) => {
    const { currentStep, isSuccessful, isSubmitted, goToSelectStep, toggleIsSubmitted } = useWaiverNoticeFormContext();

    if (currentStep.id !== (id as keyof WaiverNoticeForm)) {
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
                    goToSelectStep(0);
                    toggleIsSubmitted(false);
                }}
            />
        );
    }

    return children;
};

export default WaiverNoticeFormStep;
