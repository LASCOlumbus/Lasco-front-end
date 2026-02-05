import React from 'react';
import { FormStepper } from '@/components/Forms/components/FormStepper';
import { useApplicantCredibilityApplicationFormContext } from '../../context/ApplicantCredibilityApplicationFormContext';

const Sidebar: React.FC = () => {
    const { steps, currentStepIndex, isSubmitted, lastPassedStepIndex, goToSelectStep } =
        useApplicantCredibilityApplicationFormContext();

    return (
        <FormStepper
            steps={steps}
            currentStepIndex={currentStepIndex}
            lastPassedStepIndex={lastPassedStepIndex}
            isSubmitted={isSubmitted}
            onStepClick={goToSelectStep}
        />
    );
};
export default Sidebar;
