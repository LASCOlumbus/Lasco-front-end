import React from 'react';
import { useWaiverNoticeFormContext } from '@/modules/WaiverNotice/context/WaiverNoticeFormContext';
import FormStepper from '@/components/Forms/components/FormStepper';

const Sidebar: React.FC = () => {
    const { steps, currentStepIndex, isSubmitted, lastPassedStepIndex, goToSelectStep } = useWaiverNoticeFormContext();
    return <FormStepper steps={steps} currentStepIndex={currentStepIndex} lastPassedStepIndex={lastPassedStepIndex} isSubmitted={isSubmitted} onStepClick={goToSelectStep} />;
};

export default Sidebar;
