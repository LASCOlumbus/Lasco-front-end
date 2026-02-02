import React from 'react';
import clsx from 'clsx';
import { toastManager } from '@/lib/@toastManager';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { WebcheckWaiverFormProvider } from './context/WebcheckWaiverFormContext';
import WebcheckWaiverFormStepWrapper from './components/WebcheckWaiverFormStepWrapper';
import WebcheckWaiverFormWrapper from './components/WebcheckWaiverFormWrapper';
import WebcheckWaiverStep from './components/WebcheckWaiverStep';
import s from './style.module.css';

const WebcheckWaiver: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <WebcheckWaiverFormProvider>
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
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={() => {
                                    toastManager.add({
                                        type: 'error',
                                        title: 'In progress of development',
                                        timeout: 7000,
                                    });
                                }}
                            >
                                Print
                            </Button>
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={() => {
                                    toastManager.add({
                                        type: 'error',
                                        title: 'In progress of development',
                                        timeout: 7000,
                                    });
                                }}
                            >
                                Download
                            </Button>
                        </div>
                    </header>
                    <div className={s.content}>
                        <WebcheckWaiverFormWrapper>
                            <WebcheckWaiverFormStepWrapper id={'webcheckWaiverStep'}>
                                <WebcheckWaiverStep key="webcheckWaiverStep" />
                            </WebcheckWaiverFormStepWrapper>
                        </WebcheckWaiverFormWrapper>
                    </div>
                </div>
            </WebcheckWaiverFormProvider>
        </main>
    );
};

export default WebcheckWaiver;
