import React from 'react';
import clsx from 'clsx';
import { toastManager } from '@/lib/@toastManager';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import { NextKinProspectiveWardFormProvider } from './context/NextKinProspectiveWardFormContext';
import CaseDetailsStep from './components/CaseDetailsStep';
import NextKinProspectiveWardFormStep from './components/NextKinProspectiveWardFormStep';
import NextKinProspectiveWardFormWrapper from './components/NextKinProspectiveWardFormWrapper';
import Sidebar from './components/Sidebar';
import WaiversListStep from './components/WaiversListStep';
import s from './style.module.css';

const NextKinProspectiveWard: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <NextKinProspectiveWardFormProvider>
                <div className={s.inner}>
                    <header className={s.header}>
                        <div className={s['header-information']}>
                            <Typography variant="body-m" render={<strong />}>
                                Next of kin of prospective ward
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
                    <div className={s['sidebar-wrapper']}>
                        <Sidebar />
                        <ScrollArea className={s.scroll}>
                            <div className={s.content}>
                                <NextKinProspectiveWardFormWrapper>
                                    <NextKinProspectiveWardFormStep id="caseDetailsStep">
                                        <CaseDetailsStep key="caseDetailsStep" />
                                    </NextKinProspectiveWardFormStep>
                                    <NextKinProspectiveWardFormStep id="waiversListStep">
                                        <WaiversListStep key="waiversListStep" />
                                    </NextKinProspectiveWardFormStep>
                                </NextKinProspectiveWardFormWrapper>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </NextKinProspectiveWardFormProvider>
        </main>
    );
};

export default NextKinProspectiveWard;
