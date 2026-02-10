import React from 'react';
import clsx from 'clsx';
import AdultGuardianshipFormStep from '@/modules/AdultGuardianship/components/AdultGuardianshipFormStep';
import AdultGuardianshipFormWrapper from '@/modules/AdultGuardianship/components/AdultGuardianshipFormWrapper';
import SafetyServiceStep from '@/modules/AdultGuardianship/components/SafetyServiceStep';
import WaiversListStep from '@/modules/AdultGuardianship/components/WardLocationStep';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import { AdultGuardianshipFormProvider, useAdultGuardianshipFormContext } from './context/AdultGuardianshipFormContext';
import CaseDetailsStep from './components/CaseDetailsStep';
import Sidebar from './components/Sidebar';
import s from './style.module.css';

const ContentComponent = () => {
    const { downloadPdf, printPdf } = useAdultGuardianshipFormContext();
    return (
        <div className={s.inner}>
            <header className={s.header}>
                <div className={s['header-information']}>
                    <Typography variant="body-m" render={<strong />}>
                        Adult guardianship
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
            <div className={s['sidebar-wrapper']}>
                <Sidebar />
                <ScrollArea className={s.scroll}>
                    <div className={s.content}>
                        <AdultGuardianshipFormWrapper>
                            <AdultGuardianshipFormStep id="caseDetailsStep">
                                <CaseDetailsStep key="caseDetailsStep" />
                            </AdultGuardianshipFormStep>
                            <AdultGuardianshipFormStep id="wardLocationStep">
                                <WaiversListStep key="wardLocationStep" />
                            </AdultGuardianshipFormStep>
                            <AdultGuardianshipFormStep id="safetyServiceStep">
                                <SafetyServiceStep key="safetyServiceStep" />
                            </AdultGuardianshipFormStep>
                        </AdultGuardianshipFormWrapper>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

const AdultGuardianship: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <AdultGuardianshipFormProvider>
                <ContentComponent />
            </AdultGuardianshipFormProvider>
        </main>
    );
};

export default AdultGuardianship;
