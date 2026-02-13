import React from 'react';
import { useProspectiveWardsFinancialInfoFormContext } from '@/modules/ProspectiveWardsFinancialInfoForm/context/ProspectiveWardsFinancialInfoForm';
import FailureSection from '@/components/FailureSection';
import SuccessSection from '@/components/SuccessSection';
import { ProspectiveWardsFinancialInfoFormStepProps } from './types';

const ProspectiveWardsFinancialInfoFormStep: React.FC<React.PropsWithChildren<ProspectiveWardsFinancialInfoFormStepProps>> = ({ children, id }) => {
    const { currentStep, printPdf, downloadPdf, isSuccessful, isSubmitted, toggleIsSubmitted, goToSelectStep } = useProspectiveWardsFinancialInfoFormContext();

    if (currentStep.id !== id) {
        return null;
    }

    if (isSubmitted && isSuccessful) {
        return (
            <SuccessSection
                handlePrint={printPdf}
                handleDownload={downloadPdf}
                title="Prospective ward's financial information form has been submitted"
                description="To finish your filing, please download the generated document, print it, and sign it. The court requires a physical signature. Unsigned documents cannot be processed."
            />
        );
    }

    if (isSubmitted && !isSuccessful) {
        return (
            <FailureSection
                title="Prospective ward's financial information form has not been submitted"
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

export default ProspectiveWardsFinancialInfoFormStep;
