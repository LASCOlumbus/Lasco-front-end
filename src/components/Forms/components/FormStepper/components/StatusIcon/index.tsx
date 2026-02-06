import { Component as CheckCircle20Icon } from '@/icons/check-circle_24.svg?svgUse';
import { Component as Progress20Icon } from '@/icons/progress_20.svg?svgUse';
import { StatusIconProps } from '@/components/Forms/components/FormStepper/components/StatusIcon/types';

const StatusIcon: React.FC<StatusIconProps> = ({ index, currentStepIndex, lastPassedStepIndex }) => {
    if (index < lastPassedStepIndex) {
        return <CheckCircle20Icon width={22} height={22} />;
    }

    if (index === currentStepIndex) {
        return <Progress20Icon width={22} height={22} />;
    }

    return null;
};

export default StatusIcon;
