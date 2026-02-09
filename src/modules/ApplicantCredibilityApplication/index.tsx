import React from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import {
    ApplicantCredibilityApplicationFormProvider,
    useApplicantCredibilityApplicationFormContext,
} from './context/ApplicantCredibilityApplicationFormContext';
import ApplicantCredibilityApplicationFormStep from './components/ApplicantCredibilityApplicationFormStep';
import ApplicantCredibilityApplicationFormWrapper from './components/ApplicantCredibilityApplicationFormWrapper';
import ApplicantInformStep from './components/ApplicantInformStep';
import BankingInformStep from './components/BankingInformStep';
import CaseDetailsStep from './components/CaseDetailsStep';
import FamilyAndEmploymentStep from './components/FamilyAndEmploymentStep';
import LegalAndFinancialHistoryStep from './components/LegalAndFinancialHistoryStep';
import Sidebar from './components/Sidebar';
import s from './style.module.css';

const ContentComponent = () => {
    const { downloadPdf, printPdf } = useApplicantCredibilityApplicationFormContext();
    return (
        <div className={s.inner}>
            <header className={s.header}>
                <div className={s['header-information']}>
                    <Typography variant="body-m" render={<strong />}>
                        Applicant&apos;s credibility application
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
                        <ApplicantCredibilityApplicationFormWrapper>
                            <ApplicantCredibilityApplicationFormStep id="caseDetailsStep">
                                <CaseDetailsStep key="caseDetailsStep" />
                            </ApplicantCredibilityApplicationFormStep>
                            <ApplicantCredibilityApplicationFormStep id="applicantInformStep">
                                <ApplicantInformStep key="applicantInformStep" />
                            </ApplicantCredibilityApplicationFormStep>
                            <ApplicantCredibilityApplicationFormStep id="familyAndEmploymentStep">
                                <FamilyAndEmploymentStep key="familyAndEmploymentStep" />
                            </ApplicantCredibilityApplicationFormStep>
                            <ApplicantCredibilityApplicationFormStep id="bankingInformStep">
                                <BankingInformStep key="bankingInformStep" />
                            </ApplicantCredibilityApplicationFormStep>
                            <ApplicantCredibilityApplicationFormStep id="legalAndFinancialHistoryStep">
                                <LegalAndFinancialHistoryStep key="legalAndFinancialHistoryStep" />
                            </ApplicantCredibilityApplicationFormStep>
                        </ApplicantCredibilityApplicationFormWrapper>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

const ApplicantCredibilityApplication: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <ApplicantCredibilityApplicationFormProvider>
                <ContentComponent />
            </ApplicantCredibilityApplicationFormProvider>
        </main>
    );
};

export default ApplicantCredibilityApplication;
