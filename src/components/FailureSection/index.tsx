import { Component as DangerIcon } from '@/icons/danger_20.svg?svgUse';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

type IFailureScreen = {
    title: string;
    description: string;
    handleTryAgain?: () => void;
};

const FailureSection: React.FC<IFailureScreen> = ({ title, description, handleTryAgain }) => {
    return (
        <div className={s.container}>
            <div className={s.wrap}>
                <DangerIcon className={s.icon} width={60} height={60} color="#C63C25" />
                <div className={s.messages}>
                    <Typography variant="heading-h2">{title}</Typography>
                    <Typography variant="body-m">{description}</Typography>
                </div>
                <div className={s.buttons}>
                    <Button size="medium" variant="secondary" onClick={handleTryAgain}>
                        Try again
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FailureSection;
