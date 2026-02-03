import React from 'react';
import AnimatedFormWrapper from '@/components/form/AnimatedFormWrapper';
import { useWaiverNoticeFormContext } from '../../context/WaiverNoticeFormContext';

const WaiverNoticeFormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { currentStepIndex, animationDirection, isLoading } = useWaiverNoticeFormContext();

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

export default WaiverNoticeFormWrapper;
