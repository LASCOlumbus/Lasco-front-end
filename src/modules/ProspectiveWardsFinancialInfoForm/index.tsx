import React from 'react';
import clsx from 'clsx';
import AccountAndRealEstateStep from '@/modules/ProspectiveWardsFinancialInfoForm/components/AccountAndRealEstate';
import AssetsInterestsStep from '@/modules/ProspectiveWardsFinancialInfoForm/components/AssetsInterestsStep';
import BenefitsStep from '@/modules/ProspectiveWardsFinancialInfoForm/components/BenefitsStep';
import CaseDetailsStep from '@/modules/ProspectiveWardsFinancialInfoForm/components/CaseDetailsStep';
import PropertyStep from '@/modules/ProspectiveWardsFinancialInfoForm/components/PropertyStep';
import ProspectiveWardsFinancialInfoFormStep from '@/modules/ProspectiveWardsFinancialInfoForm/components/ProspectiveWardsFinancialInfoFormStep';
import ProspectiveWardsFinancialInfoFormWrapper from '@/modules/ProspectiveWardsFinancialInfoForm/components/ProspectiveWardsFinancialInfoFormWrapper';
import Sidebar from '@/modules/ProspectiveWardsFinancialInfoForm/components/Sidebar';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import { ProspectiveWardsFinancialInfoFormProvider, useProspectiveWardsFinancialInfoFormContext } from './context/ProspectiveWardsFinancialInfoForm';
import s from './style.module.css';

const ContentComponent = () => {
    const { downloadPdf, printPdf } = useProspectiveWardsFinancialInfoFormContext();

    return (
        <div className={s.inner}>
            <header className={s.header}>
                <div className={s['header-information']}>
                    <Typography variant="body-m" render={<strong />}>
                        Prospective ward's financial information
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
                        <ProspectiveWardsFinancialInfoFormWrapper>
                            <ProspectiveWardsFinancialInfoFormStep id="caseDetailsStep">
                                <CaseDetailsStep />
                            </ProspectiveWardsFinancialInfoFormStep>
                            <ProspectiveWardsFinancialInfoFormStep id="benefitsStep">
                                <BenefitsStep />
                            </ProspectiveWardsFinancialInfoFormStep>
                            <ProspectiveWardsFinancialInfoFormStep id="financialAccountStep">
                                <AccountAndRealEstateStep />
                            </ProspectiveWardsFinancialInfoFormStep>
                            <ProspectiveWardsFinancialInfoFormStep id="propertyStep">
                                <PropertyStep />
                            </ProspectiveWardsFinancialInfoFormStep>
                            <ProspectiveWardsFinancialInfoFormStep id="assetsInterests">
                                <AssetsInterestsStep />
                            </ProspectiveWardsFinancialInfoFormStep>
                        </ProspectiveWardsFinancialInfoFormWrapper>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

const ProspectiveWardsFinancialInfo: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <ProspectiveWardsFinancialInfoFormProvider>
                <ContentComponent />
            </ProspectiveWardsFinancialInfoFormProvider>
        </main>
    );
};

export default ProspectiveWardsFinancialInfo;
