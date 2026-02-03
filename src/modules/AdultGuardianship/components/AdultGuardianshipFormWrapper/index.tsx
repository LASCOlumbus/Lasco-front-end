import React from 'react';
import AnimatedFormWrapper from '@/components/Forms/components/AnimatedFormWrapper';
import { useAdultGuardianshipFormContext } from '../../context/AdultGuardianshipFormContext';

const AdultGuardianshipFormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { currentStepIndex, animationDirection, isLoading } = useAdultGuardianshipFormContext();

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

export default AdultGuardianshipFormWrapper;
