import React from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useWaiverNoticeFormContext, WaiverNoticeFormProvider } from './context/WaiverNoticeFormContext';
import CaseDetailsStep from './components/CaseDetailsStep/index';
import Sidebar from './components/Sidebar/index';
import WaiverNoticeFormStep from './components/WaiverNoticeFormStep/index';
import WaiverNoticeFormWrapper from './components/WaiverNoticeFormWrapper/index';
import WaiversListStep from './components/WaiversListStep/index';
import s from './style.module.css';

const ContentComponent = () => {
    const { downloadPdf, printPdf, printLoading, downloadLoading } = useWaiverNoticeFormContext();
    return (
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
                        disabled={printLoading}
                        variant="secondary"
                        size="small"
                        onClick={() => {
                            return printPdf(true);
                        }}
                    >
                        Print
                    </Button>
                    <Button
                        variant="secondary"
                        size="small"
                        disabled={downloadLoading}
                        onClick={() => {
                            return downloadPdf(true);
                        }}
                    >
                        Download
                    </Button>
                </div>
            </header>
            <div className={s['sidebar-wrapper']}>
                <Sidebar />
                <WaiverNoticeFormWrapper>
                    <WaiverNoticeFormStep id="caseDetailsStep">
                        <CaseDetailsStep key="caseDetailsStep" />
                    </WaiverNoticeFormStep>
                    <WaiverNoticeFormStep id="waiversListStep">
                        <WaiversListStep key="waiversListStep" />
                    </WaiverNoticeFormStep>
                </WaiverNoticeFormWrapper>
            </div>
        </div>
    );
};

const WaiverNotice: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <WaiverNoticeFormProvider>
                <ContentComponent />
            </WaiverNoticeFormProvider>
        </main>
    );
};

export default WaiverNotice;
