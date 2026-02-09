import React from 'react';
import { useProspectiveWardsFinancialInfoFormContext } from '@/modules/ProspectiveWardsFinancialInfoForm/context/ProspectiveWardsFinancialInfoForm';
import AnimatedFormWrapper from '@/components/Forms/components/AnimatedFormWrapper';

const ProspectiveWardsFinancialInfoFormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { currentStepIndex, animationDirection, isLoading } = useProspectiveWardsFinancialInfoFormContext();

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

export default ProspectiveWardsFinancialInfoFormWrapper;
