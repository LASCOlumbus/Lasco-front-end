import { Component as CheckCircleIcon } from '@/icons/check-circle_24.svg?svgUse';
import { SuccessSectionProps } from '@/lib/types.ts';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

const SuccessSection: React.FC<SuccessSectionProps> = ({ title, description, handlePrint, handleDownload }) => {
    return (
        <section className={s.container}>
            <div className={s.wrap}>
                <header className={s.header}>
                    <CheckCircleIcon className={s.icon} width={72} height={72} color="green" />
                    <div className={s.messages}>
                        <Typography variant="heading-h2">{title}</Typography>
                        <Typography variant="body-m">{description}</Typography>
                    </div>
                </header>
                <footer className={s.buttons}>
                    <Button size="medium" variant="secondary" onClick={handlePrint}>
                        Print
                    </Button>
                    <Button size="medium" variant="primary" onClick={handleDownload}>
                        Download PDF
                    </Button>
                </footer>
            </div>
        </section>
    );
};

export default SuccessSection;
