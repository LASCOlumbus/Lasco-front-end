import React from 'react';
import { useNextKinProspectiveWardFormContext } from '@/modules/NextKinProspectiveWard/context/NextKinProspectiveWardFormContext';
import FormStepper from '@/components/Forms/components/FormStepper';

const Sidebar: React.FC = () => {
    const { steps, currentStepIndex, isSubmitted, lastPassedStepIndex, goToSelectStep } =
        useNextKinProspectiveWardFormContext();

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
