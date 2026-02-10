import React from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useWebcheckWaiverFormContext, WebcheckWaiverFormProvider } from './context/WebcheckWaiverFormContext';
import WebcheckWaiverFormStepWrapper from './components/WebcheckWaiverFormStepWrapper';
import WebcheckWaiverFormWrapper from './components/WebcheckWaiverFormWrapper';
import WebcheckWaiverStep from './components/WebcheckWaiverStep';
import s from './style.module.css';

const ContentComponent = () => {
    const { downloadPdf, printPdf } = useWebcheckWaiverFormContext();
    return (
        <div className={s.inner}>
            <header className={s.header}>
                <div className={s['header-information']}>
                    <Typography variant="body-m" render={<strong />}>
                        Webcheck waiver
                    </Typography>
                    <Typography variant="body-s" className={s.description}>
                        Probate court of Franklin County, Ohio | Judge: Jeffrey D. Mackey
                    </Typography>
                </div>
                <div className={s['header-buttons']}>
                    <Button variant="secondary" size="small" onClick={printPdf}>
                        Print
                    </Button>
                    <Button variant="secondary" size="small" onClick={downloadPdf}>
                        Download
                    </Button>
                </div>
            </header>
            <div className={s.content}>
                <WebcheckWaiverFormWrapper>
                    <WebcheckWaiverFormStepWrapper id="webcheckWaiverStep">
                        <WebcheckWaiverStep key="webcheckWaiverStep" />
                    </WebcheckWaiverFormStepWrapper>
                </WebcheckWaiverFormWrapper>
            </div>
        </div>
    );
};

const WebcheckWaiver: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <WebcheckWaiverFormProvider>
                <ContentComponent />
            </WebcheckWaiverFormProvider>
        </main>
    );
};

export default WebcheckWaiver;
