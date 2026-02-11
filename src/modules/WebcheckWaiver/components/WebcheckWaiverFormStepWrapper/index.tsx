import type { WebcheckWaiverFormStepProps } from './types';
import React from 'react';
import FailureSection from '@/components/FailureSection';
import SuccessSection from '@/components/SuccessSection';
import { useWebcheckWaiverFormContext } from '../../context/WebcheckWaiverFormContext';

const WebcheckWaiverFormStepWrapper: React.FC<React.PropsWithChildren<WebcheckWaiverFormStepProps>> = ({ children, id }) => {
    const { currentStep, isSuccessful, isSubmitted, toggleIsSubmitted, printPdf, downloadPdf } = useWebcheckWaiverFormContext();

    if (currentStep.id !== id) {
        return null;
    }

    if (isSubmitted && isSuccessful) {
        return (
            <SuccessSection
                handlePrint={printPdf}
                handleDownload={downloadPdf}
                title="Webcheck waiver form has been submitted"
                description="To finish your filing, please download the generated document, print it, and sign it. The court requires a physical signature. Unsigned documents cannot be processed."
            />
        );
    }

    if (isSubmitted && !isSuccessful) {
        return (
            <FailureSection
                title="Webcheck waiver form has not been submitted"
                description="Something went wrong while submitting your form. Your answers are saved. Please try again."
                handleTryAgain={() => {
                    toggleIsSubmitted(true);
                }}
            />
        );
    }

    return children;
};

export default WebcheckWaiverFormStepWrapper;
