import React from 'react';
import { FormStepper } from '@/components/Forms/components/FormStepper';
import { useAdultJurisdictionAffidavitFormContext } from '../../context/AdultJurisdictionAffidavitFormContext';

const Sidebar: React.FC = () => {
    const { steps, currentStepIndex, isSubmitted, lastPassedStepIndex, goToSelectStep } =
        useAdultJurisdictionAffidavitFormContext();
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
