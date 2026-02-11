import React from 'react';
import AnimatedFormWrapper from '@/components/Forms/components/AnimatedFormWrapper';
import { useApplicationForAppointmentFormContext } from '../../context/ApplicationForAppointmentFormContext';

const ApplicationForAppointmentFormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { currentStepIndex, animationDirection, isLoading } = useApplicationForAppointmentFormContext();

    return (
        <AnimatedFormWrapper currentStepIndex={currentStepIndex} animationDirection={animationDirection} isLoading={isLoading}>
            {children}
        </AnimatedFormWrapper>
    );
};

export default ApplicationForAppointmentFormWrapper;
