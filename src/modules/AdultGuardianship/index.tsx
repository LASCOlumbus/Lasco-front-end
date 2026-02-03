import React from 'react';
import clsx from 'clsx';
import { toastManager } from '@/lib/@toastManager.ts';
import { AdultGuardianshipForm } from '@/lib/types.ts';
import AdultGuardianshipFormStep from '@/modules/AdultGuardianship/components/AdultGuardianshipFormStep';
import AdultGuardianshipFormWrapper from '@/modules/AdultGuardianship/components/AdultGuardianshipFormWrapper';
import SafetyServiceStep from '@/modules/AdultGuardianship/components/SafetyServiceStep';
import WaiversListStep from '@/modules/AdultGuardianship/components/WardLocationStep/index.tsx';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea/index.tsx';
import { Typography } from '@/components/ui/Typography/index.tsx';
import { AdultGuardianshipFormProvider } from './context/AdultGuardianshipFormContext.tsx';
import CaseDetailsStep from './components/CaseDetailsStep/index.tsx';
import Sidebar from './components/Sidebar/index.tsx';
import s from './style.module.css';

const AdultGuardianship: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <AdultGuardianshipFormProvider>
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
                                <AdultGuardianshipFormWrapper>
                                    <AdultGuardianshipFormStep id={'caseDetailsStep' as keyof AdultGuardianshipForm}>
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
            </AdultGuardianshipFormProvider>
        </main>
    );
};

export default AdultGuardianship;
