import type { AdultGuardianshipFormStepProps } from './types';
import React from 'react';
import FailureSection from '@/components/FailureSection';
import SuccessSection from '@/components/SuccessSection';
import { useAdultGuardianshipFormContext } from '../../context/AdultGuardianshipFormContext';

const AdultGuardianshipFormStep: React.FC<React.PropsWithChildren<AdultGuardianshipFormStepProps>> = ({ children, id }) => {
    const { currentStep, isSuccessful, isSubmitted, toggleIsSubmitted, goToSelectStep, printPdf, downloadPdf } = useAdultGuardianshipFormContext();

    if (currentStep.id !== id) {
        return null;
    }

    if (isSubmitted && isSuccessful) {
        return (
            <SuccessSection
                handlePrint={printPdf}
                handleDownload={downloadPdf}
                title="Guardians credibility application form has been submitted"
                description="To finish your filing, please download the generated document, print it, and sign it. The court requires a physical signature. Unsigned documents cannot be processed."
            />
        );
    }

    if (isSubmitted && !isSuccessful) {
        return (
            <FailureSection
                title="Guardianship credibility application form has not been submitted"
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

export default AdultGuardianshipFormStep;
