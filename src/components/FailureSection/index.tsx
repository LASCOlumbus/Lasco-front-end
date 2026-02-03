import type { FailureSectionProps } from '@/lib/types';
import { Component as DangerIcon } from '@/icons/danger_72.svg?svgUse';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

const FailureSection: React.FC<FailureSectionProps> = ({ title, description, handleTryAgain }) => {
    return (
        <section className={s.container}>
            <div className={s.wrap}>
                <header className={s.header}>
                    <DangerIcon className={s.icon} />
                    <div className={s.messages}>
                        <Typography variant="heading-h2">{title}</Typography>
                        <Typography variant="body-m">{description}</Typography>
                    </div>
                </header>
                <footer className={s.buttons}>
                    <Button size="medium" variant="secondary" onClick={handleTryAgain}>
                        Try again
                    </Button>
                </footer>
            </div>
        </section>
    );
};

export default FailureSection;
