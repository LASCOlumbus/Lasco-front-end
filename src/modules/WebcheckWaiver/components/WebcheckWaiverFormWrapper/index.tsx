import React from 'react';
import AnimatedFormWrapper from '@/components/Forms/components/AnimatedFormWrapper';
import { useWebcheckWaiverFormContext } from '../../context/WebcheckWaiverFormContext';

const WebcheckWaiverFormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { currentStepIndex, animationDirection, isLoading } = useWebcheckWaiverFormContext();

    return (
        <AnimatedFormWrapper
            currentStepIndex={currentStepIndex}
            animationDirection={animationDirection}
            isLoading={isLoading}
        >
            {children}
        </AnimatedFormWrapper>
    );
};

export default WebcheckWaiverFormWrapper;
