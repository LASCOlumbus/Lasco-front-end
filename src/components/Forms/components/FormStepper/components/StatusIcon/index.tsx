import { Component as CheckCircle20Icon } from '@/icons/check-circle_24.svg?svgUse';
import { Component as Progress20Icon } from '@/icons/progress_20.svg?svgUse';
import { StatusIconProps } from '@/components/Forms/components/FormStepper/components/StatusIcon/types';
import s from './styles.module.css';

const StatusIcon: React.FC<StatusIconProps> = ({ index, currentStepIndex, lastPassedStepIndex }) => {
    if (index < lastPassedStepIndex) {
        return <CheckCircle20Icon width={22} height={22} />;
    }

    if (index === currentStepIndex) {
        return (
            <div className={s['status-icon']}>
                <Progress20Icon width={22} height={22} />
            </div>
        );
    }

    return null;
};

export default StatusIcon;
