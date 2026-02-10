import React from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import {
    ApplicationForAppointmentFormProvider,
    useApplicationForAppointmentFormContext,
} from './context/ApplicationForAppointmentFormContext';
import ApplicantInformStep from './components/ApplicantInformStep';
import ApplicationForAppointmentFormStep from './components/ApplicationForAppointmentFormStep';
import ApplicationForAppointmentFormWrapper from './components/ApplicationForAppointmentFormWrapper';
import AssetsAndIncomeStep from './components/AssetsAndIncomeStep';
import CaseDetailsStep from './components/CaseDetailsStep';
import GuardianshipTypeStep from './components/GuardianshipTypeStep';
import LegalDeclarationsStep from './components/LegalDeclarationsStep';
import Sidebar from './components/Sidebar';
import WardInformStep from './components/WardInformStep';
import s from './style.module.css';

const ContentComponent = () => {
    const { downloadPdf, printPdf } = useApplicationForAppointmentFormContext();
    return (
        <div className={s.inner}>
            <header className={s.header}>
                <div className={s['header-information']}>
                    <Typography variant="body-m" render={<strong />}>
                        Application for appointment of guardian of alleged incompetent
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
                        <ApplicationForAppointmentFormWrapper>
                            <ApplicationForAppointmentFormStep id="caseDetailsStep">
                                <CaseDetailsStep key="caseDetailsStep" />
                            </ApplicationForAppointmentFormStep>
                            <ApplicationForAppointmentFormStep id="wardInformStep">
                                <WardInformStep key="wardInformStep" />
                            </ApplicationForAppointmentFormStep>
                            <ApplicationForAppointmentFormStep id="assetsAndIncomeStep">
                                <AssetsAndIncomeStep key="assetsAndIncomeStep" />
                            </ApplicationForAppointmentFormStep>
                            <ApplicationForAppointmentFormStep id="guardianshipTypeStep">
                                <GuardianshipTypeStep key="guardianshipTypeStep" />
                            </ApplicationForAppointmentFormStep>
                            <ApplicationForAppointmentFormStep id="applicantInformStep">
                                <ApplicantInformStep key="applicantInformStep" />
                            </ApplicationForAppointmentFormStep>
                            <ApplicationForAppointmentFormStep id="legalDeclarationsStep">
                                <LegalDeclarationsStep key="legalDeclarationsStep" />
                            </ApplicationForAppointmentFormStep>
                        </ApplicationForAppointmentFormWrapper>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

const ApplicationForAppointment: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <ApplicationForAppointmentFormProvider>
                <ContentComponent />
            </ApplicationForAppointmentFormProvider>
        </main>
    );
};

export default ApplicationForAppointment;
