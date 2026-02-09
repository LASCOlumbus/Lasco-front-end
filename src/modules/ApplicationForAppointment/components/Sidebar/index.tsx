import React from 'react';
import FormStepper from '@/components/Forms/components/FormStepper';
import { useApplicationForAppointmentFormContext } from '../../context/ApplicationForAppointmentFormContext';

const Sidebar: React.FC = () => {
    const { steps, currentStepIndex, isSubmitted, lastPassedStepIndex, goToSelectStep } =
        useApplicationForAppointmentFormContext();

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
