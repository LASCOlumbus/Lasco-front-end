import React from 'react';
import AnimatedFormWrapper from '@/components/Forms/components/AnimatedFormWrapper';
import { useNextKinProspectiveWardFormContext } from '../../context/NextKinProspectiveWardFormContext';

const NextKinProspectiveWardFormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { currentStepIndex, animationDirection, isLoading } = useNextKinProspectiveWardFormContext();

    return (
        <AnimatedFormWrapper currentStepIndex={currentStepIndex} animationDirection={animationDirection} isLoading={isLoading}>
            {children}
        </AnimatedFormWrapper>
    );
};

export default NextKinProspectiveWardFormWrapper;
