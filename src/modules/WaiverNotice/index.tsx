import React from 'react';
import clsx from 'clsx';
import { toastManager } from '@/lib/@toastManager';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { WaiverNoticeFormProvider } from './context/WaiverNoticeFormContext';
import CaseDetailsStep from './components/CaseDetailsStep/index';
import Sidebar from './components/Sidebar/index';
import WaiverNoticeFormStep from './components/WaiverNoticeFormStep/index';
import WaiverNoticeFormWrapper from './components/WaiverNoticeFormWrapper/index';
import WaiversListStep from './components/WaiversListStep/index';
import s from './style.module.css';

const WaiverNotice: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <WaiverNoticeFormProvider>
                <div className={s.inner}>
                    <header className={s.header}>
                        <div className={s['header-information']}>
                            <Typography variant="body-m" render={<strong />}>
                                Waiver of notice
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
                        <WaiverNoticeFormWrapper>
                            <WaiverNoticeFormStep id={'caseDetailsStep'}>
                                <CaseDetailsStep key="caseDetailsStep" />
                            </WaiverNoticeFormStep>
                            <WaiverNoticeFormStep id="waiversListStep">
                                <WaiversListStep key="waiversListStep" />
                            </WaiverNoticeFormStep>
                        </WaiverNoticeFormWrapper>
                    </div>
                </div>
            </WaiverNoticeFormProvider>
        </main>
    );
};

export default WaiverNotice;
