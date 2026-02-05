import React from 'react';
import AnimatedFormWrapper from '@/components/Forms/components/AnimatedFormWrapper';
import { useAdultJurisdictionAffidavitFormContext } from '../../context/AdultJurisdictionAffidavitFormContext';

const AdultJurisdictionAffidavitFormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { currentStepIndex, animationDirection, isLoading } = useAdultJurisdictionAffidavitFormContext();

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

export default AdultJurisdictionAffidavitFormWrapper;
