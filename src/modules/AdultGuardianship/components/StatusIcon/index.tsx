import type { StatusIconProps } from './types';
import React from 'react';
import { Component as CheckCircle20Icon } from '@/icons/check-circle_24.svg?svgUse';
import { Component as EmptyCircle24Icon } from '@/icons/empty-circle_24.svg?svgUse';
import { Component as Progress20Icon } from '@/icons/progress_20.svg?svgUse';
import { useAdultGuardianshipFormContext } from '@/modules/AdultGuardianship/context/AdultGuardianshipFormContext';

const StatusIcon: React.FC<StatusIconProps> = ({ index }) => {
    const { currentStepIndex, lastPassedStepIndex } = useAdultGuardianshipFormContext();

    if (index === currentStepIndex) {
        return <Progress20Icon width={22} height={22} />;
    }

    if (index < lastPassedStepIndex) {
        return <CheckCircle20Icon width={22} height={22} />;
    }

    return <EmptyCircle24Icon width={24} height={24} />;
};

export default StatusIcon;
