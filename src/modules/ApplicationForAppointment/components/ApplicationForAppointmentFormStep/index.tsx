import React from 'react';
import FailureSection from '@/components/FailureSection';
import SuccessSection from '@/components/SuccessSection';
import { useApplicationForAppointmentFormContext } from '../../context/ApplicationForAppointmentFormContext';
import { ApplicationForAppointmentFormStepProps } from './types';

const ApplicationForAppointmentFormStep: React.FC<React.PropsWithChildren<ApplicationForAppointmentFormStepProps>> = ({
    children,
    id,
}) => {
    const { currentStep, isSuccessful, isSubmitted, toggleIsSubmitted, goToSelectStep, printPdf, downloadPdf } =
        useApplicationForAppointmentFormContext();

    if (currentStep.id !== id) {
        return null;
    }

    if (isSubmitted && isSuccessful) {
        return (
            <SuccessSection
                handlePrint={printPdf}
                handleDownload={downloadPdf}
                title="Applicant's credibility application form has been submitted"
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

export default ApplicationForAppointmentFormStep;
