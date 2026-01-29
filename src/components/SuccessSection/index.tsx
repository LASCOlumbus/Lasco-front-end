import { Component as CheckCircleIcon } from '@/icons/check-circle_20.svg?svgUse';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

type ISuccessScreen = {
    title: string;
    description: string;
    handlePrint?: () => void;
    handleDownload?: () => void;
};

const SuccessSection: React.FC<ISuccessScreen> = ({ title, description, handlePrint, handleDownload }) => {
    return (
        <div className={s.container}>
            <div className={s.wrap}>
                <CheckCircleIcon className={s.icon} width={72} height={72} color="green" />
                <div className={s.messages}>
                    <Typography variant="heading-h2">{title}</Typography>
                    <Typography variant="body-m">{description}</Typography>
                </div>
                <div className={s.buttons}>
                    <Button size="medium" variant="secondary" onClick={handlePrint}>
                        Print
                    </Button>
                    <Button size="medium" variant="primary" onClick={handleDownload}>
                        Download PDF
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SuccessSection;
