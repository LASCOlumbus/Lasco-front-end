import React from 'react';
import clsx from 'clsx';
import { toastManager } from '@/lib/@toastManager';
import AdultGuardianshipFormStep from '@/modules/AdultGuardianship/components/AdultGuardianshipFormStep';
import AdultGuardianshipFormWrapper from '@/modules/AdultGuardianship/components/AdultGuardianshipFormWrapper';
import SafetyServiceStep from '@/modules/AdultGuardianship/components/SafetyServiceStep';
import WaiversListStep from '@/modules/AdultGuardianship/components/WardLocationStep/index';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { AdultGuardianshipFormProvider } from './context/AdultGuardianshipFormContext';
import CaseDetailsStep from './components/CaseDetailsStep/index';
import Sidebar from './components/Sidebar/index';
import s from './style.module.css';

const AdultGuardianship: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <AdultGuardianshipFormProvider>
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
                        <div className={s.content}>
                            <AdultGuardianshipFormWrapper>
                                <AdultGuardianshipFormStep id={'caseDetailsStep'}>
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
                    </div>
                </div>
            </AdultGuardianshipFormProvider>
        </main>
    );
};

export default AdultGuardianship;
