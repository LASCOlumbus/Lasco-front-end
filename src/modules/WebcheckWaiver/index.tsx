import React from 'react';
import clsx from 'clsx';
import { toastManager } from '@/lib/@toastManager.ts';
import { IWebcheckWaiverFormStep } from '@/lib/types.ts';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import { WebcheckWaiverFormProvider } from './context/WebcheckWaiverFormContext.tsx';
import WebcheckWaiverFormStep from './components/WebcheckWaiverFormStep';
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
                    <ScrollArea className={s.content}>
                        <WebcheckWaiverFormWrapper>
                            <WebcheckWaiverFormStep id={'webcheckWaiverStep' as keyof IWebcheckWaiverFormStep}>
                                <WebcheckWaiverStep key="webcheckWaiverStep" />
                            </WebcheckWaiverFormStep>
                        </WebcheckWaiverFormWrapper>
                    </ScrollArea>
                </div>
            </WebcheckWaiverFormProvider>
        </main>
    );
};

export default WebcheckWaiver;
