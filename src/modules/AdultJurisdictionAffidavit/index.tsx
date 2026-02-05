import React from 'react';
import clsx from 'clsx';
import { toastManager } from '@/lib/@toastManager';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import { AdultJurisdictionAffidavitFormProvider } from './context/AdultJurisdictionAffidavitFormContext';
import AddressInformStep from './components/AddressInformStep';
import AdultJurisdictionAffidavitFormStep from './components/AdultJurisdictionAffidavitFormStep';
import AdultJurisdictionAffidavitFormWrapper from './components/AdultJurisdictionAffidavitFormWrapper';
import CaseDetailsStep from './components/CaseDetailsStep';
import LegalQuestionsStep from './components/LegalQuestionsStep';
import Sidebar from './components/Sidebar';
import s from './style.module.css';

const AdultJurisdictionAffidavit: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <AdultJurisdictionAffidavitFormProvider>
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
            </AdultJurisdictionAffidavitFormProvider>
        </main>
    );
};

export default AdultJurisdictionAffidavit;
