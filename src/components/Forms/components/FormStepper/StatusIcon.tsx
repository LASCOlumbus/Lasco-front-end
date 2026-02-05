import { Component as CheckCircle20Icon } from '@/icons/check-circle_24.svg?svgUse';
import { Component as Progress20Icon } from '@/icons/progress_20.svg?svgUse';

type Props = {
    index: number;
    currentStepIndex: number;
    lastPassedStepIndex: number;
};

const StatusIcon = ({ index, currentStepIndex, lastPassedStepIndex }: Props) => {
    if (index < lastPassedStepIndex) {
        return <CheckCircle20Icon width={22} height={22} />;
    }

    if (index === currentStepIndex) {
        return <Progress20Icon width={22} height={22} />;
    }

    return null;
};

export default StatusIcon;
