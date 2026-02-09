'use client';

import { FORM_TYPES } from '@/lib/constants';
import { createMultiStepForm } from '@/lib/createMultiStepForm';
import { ProspectiveWardsFinancialInfoCaseDetailsFormStep, ProspectiveWardsFinancialInfoForm } from '@/lib/types';
import {
    prospectiveWardsFinancialInfoAssetsInterestsSchema,
    prospectiveWardsFinancialInfoBenefitsStepSchema,
    prospectiveWardsFinancialInfoFinancialAccountStepSchema,
    prospectiveWardsFinancialInfoFormCaseDetailsStepSchema,
    prospectiveWardsFinancialInfoPropertyStepSchema,
} from '@/modules/ProspectiveWardsFinancialInfoForm/schemas/prospectiveWardsFinancialInfo';

const PROSPECTIVE_WARDS_FINANCIAL_INFO_FORM_INITIAL_STATE: ProspectiveWardsFinancialInfoForm = {
    caseDetailsStep: {
        inTheMatterOfTheGuardianshipOf: '',
        caseNumber: '',
    },
    benefitsStep: {
        benefit: [],
        socialSecurity: { representativePayeeName: '', socialSecuritySize: '' },
        PERS: {
            size: '',
        },
        VABenefits: {
            size: '',
        },
        railroadRetirement: {
            size: '',
        },
        medicaid: {
            isWardMedicaidFacilityResident: false,
        },
        otherInsuranceBenefits: {
            description: '',
        },
        otherPension: {
            description: '',
        },
    },
    financialAccountStep: {
        accounts: [{ institution: '', type: '', estimatedBalance: '' }],
    },
    propertyStep: {
        isProspectiveWardRealEstateOwner: null,
        prospectiveWardReceivesRentalIncome: null,
        realEstateAddress: '',
        rentalIncomeAmount: '',
    },
    assetsInterests: {
        prospectiveWardBeneficiaryOf: [],
        identifyingInformation: '',
        sourceOfIncomeOrAsset: '',
        amountOfIncomeOrAsset: '',
        hasSufficientFundsToPayCourtCosts: false,
        doesNotHaveSufficientFundsToPayCourtCosts: false,
    },
};
export const PROSPECTIVE_WARDS_FINANCIAL_INFO_FORM_STEPS = {
    caseDetailsStep: {
        id: 'caseDetailsStep',
        label: 'Case details',
        schema: prospectiveWardsFinancialInfoFormCaseDetailsStepSchema,
        enabled: true,
    },
    benefitsStep: {
        id: 'benefitsStep',
        label: 'Benefits',
        schema: prospectiveWardsFinancialInfoBenefitsStepSchema,
        enabled: true,
    },
    financialAccountStep: {
        id: 'financialAccountStep',
        label: 'Accounts and real estate',
        schema: prospectiveWardsFinancialInfoFinancialAccountStepSchema,
        enabled: true,
    },
    propertyStep: {
        id: 'propertyStep',
        label: 'Property',
        schema: prospectiveWardsFinancialInfoPropertyStepSchema,
        enabled: true,
    },
    assetsInterests: {
        id: 'assetsInterests',
        label: 'Assets & interests',
        schema: prospectiveWardsFinancialInfoAssetsInterestsSchema,
        enabled: true,
    },
} as const satisfies Record<keyof ProspectiveWardsFinancialInfoForm, ProspectiveWardsFinancialInfoCaseDetailsFormStep>;

const {
    Provider: BaseProvider,
    useFormContext,
    useStepForm,
} = createMultiStepForm<ProspectiveWardsFinancialInfoForm>(FORM_TYPES._PROSPECTIVE_WARDS_FINANCIAL_INFORMATION);

const PROSPECTIVE_WARDS_FINANCIAL_INFO_FORM_CONFIG = {
    storageKey: 'PROSPECTIVE_WARDS_FINANCIAL_INFO_multi-step-form',
    submittedKey: 'PROSPECTIVE_WARDS_FINANCIAL_INFO_multi-step-form-step_submitted',
    successfulKey: 'PROSPECTIVE_WARDS_FINANCIAL_INFO_multi-step-form-step_successful',
    initialState: PROSPECTIVE_WARDS_FINANCIAL_INFO_FORM_INITIAL_STATE,
    steps: PROSPECTIVE_WARDS_FINANCIAL_INFO_FORM_STEPS,
};

export const ProspectiveWardsFinancialInfoFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <BaseProvider config={PROSPECTIVE_WARDS_FINANCIAL_INFO_FORM_CONFIG}>{children}</BaseProvider>;
};

export const useProspectiveWardsFinancialInfoFormContext = useFormContext;
export const useProspectiveWardsFinancialInfoForm = useStepForm;
