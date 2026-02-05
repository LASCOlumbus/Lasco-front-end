import React from 'react';
import AnimatedFormWrapper from '@/components/Forms/components/AnimatedFormWrapper';
import { useApplicantCredibilityApplicationFormContext } from '../../context/ApplicantCredibilityApplicationFormContext';

const ApplicantCredibilityApplicationFormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { currentStepIndex, animationDirection, isLoading } = useApplicantCredibilityApplicationFormContext();

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

export default ApplicantCredibilityApplicationFormWrapper;
