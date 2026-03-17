import React from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import { AdultJurisdictionAffidavitFormProvider, useAdultJurisdictionAffidavitFormContext } from './context/AdultJurisdictionAffidavitFormContext';
import AddressInformStep from './components/AddressInformStep';
import AdultJurisdictionAffidavitFormStep from './components/AdultJurisdictionAffidavitFormStep';
import AdultJurisdictionAffidavitFormWrapper from './components/AdultJurisdictionAffidavitFormWrapper';
import CaseDetailsStep from './components/CaseDetailsStep';
import LegalQuestionsStep from './components/LegalQuestionsStep';
import Sidebar from './components/Sidebar';
import s from './style.module.css';

const ContentComponent = () => {
    const { downloadPdf, printPdf, printLoading, downloadLoading } = useAdultJurisdictionAffidavitFormContext();
    return (
        <div className={s.inner}>
            <header className={s.header}>
                <div className={s['header-information']}>
                    <Typography variant="body-m" render={<strong />}>
                        Adult jurisdiction affidavit
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
                <ScrollArea className={s.scroll}>
                    <div className={s.content}>
                        <AdultJurisdictionAffidavitFormWrapper>
                            <AdultJurisdictionAffidavitFormStep id="caseDetailsStep">
                                <CaseDetailsStep key="caseDetailsStep" />
                            </AdultJurisdictionAffidavitFormStep>
                            <AdultJurisdictionAffidavitFormStep id="addressInformStep">
                                <AddressInformStep key="addressInformStep" />
                            </AdultJurisdictionAffidavitFormStep>
                            <AdultJurisdictionAffidavitFormStep id="legalQuestionsStep">
                                <LegalQuestionsStep key="legalQuestionsStep" />
                            </AdultJurisdictionAffidavitFormStep>
                        </AdultJurisdictionAffidavitFormWrapper>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

const AdultJurisdictionAffidavit: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <AdultJurisdictionAffidavitFormProvider>
                <ContentComponent />
            </AdultJurisdictionAffidavitFormProvider>
        </main>
    );
};

export default AdultJurisdictionAffidavit;
