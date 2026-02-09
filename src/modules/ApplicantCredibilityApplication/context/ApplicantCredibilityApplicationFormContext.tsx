'use client';

import { FORM_TYPES } from '@/lib/constants';
import { createMultiStepForm } from '@/lib/createMultiStepForm';
import { ApplicantCredibilityApplicationForm, ApplicantCredibilityApplicationFormStep } from '@/lib/types';
import {
    applicantCredibilityApplicationApplicantInformStepSchema,
    applicantCredibilityApplicationBankingInformStepSchema,
    applicantCredibilityApplicationCaseDetailsStepSchema,
    applicantCredibilityApplicationFamilyAndEmploymentStepSchema,
    applicantCredibilityApplicationLegalAndFinancialHistoryStepSchema,
} from '@/modules/ApplicantCredibilityApplication/schemas/applicantCredibilityApplication';

export const APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS = {
    caseDetailsStep: {
        id: 'caseDetailsStep',
        label: 'Case details',
        schema: applicantCredibilityApplicationCaseDetailsStepSchema,
        enabled: true,
    },
    applicantInformStep: {
        id: 'applicantInformStep',
        label: 'Applicant information',
        schema: applicantCredibilityApplicationApplicantInformStepSchema,
        enabled: true,
    },
    familyAndEmploymentStep: {
        id: 'familyAndEmploymentStep',
        label: 'Family and employment',
        schema: applicantCredibilityApplicationFamilyAndEmploymentStepSchema,
        enabled: true,
    },
    bankingInformStep: {
        id: 'bankingInformStep',
        label: 'Banking information',
        schema: applicantCredibilityApplicationBankingInformStepSchema,
        enabled: true,
    },
    legalAndFinancialHistoryStep: {
        id: 'legalAndFinancialHistoryStep',
        label: 'Legal & financial history',
        schema: applicantCredibilityApplicationLegalAndFinancialHistoryStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof ApplicantCredibilityApplicationForm, ApplicantCredibilityApplicationFormStep>;
const APPLICANT_CREDIBILITY_APPLICATION_FORM_INITIAL_STATE: ApplicantCredibilityApplicationForm = {
    caseDetailsStep: {
        guardianName: '',
        caseNumber: '',
    },
    applicantInformStep: {
        applicantName: '',
        dob: null,
        applicantAddress: {
            streetAddress: '',
            city: '',
            state: '',
            zip: '',
            from: null,
            isSameAddressLast5Years: null,
            previousAddresses: [
                {
                    address: '',
                    from: null,
                    to: null,
                },
            ],
        },
    },
    familyAndEmploymentStep: {
        isMarried: null,
        marriage: {
            spouseName: '',
            yearMarried: '',
            spouseStreetAddress: '',
            city: '',
            state: '',
            zip: '',
        },
        employment: {
            currentEmployer: '',
            from: null,
            isSameEmployerLast5Years: null,
            previousEmployers: [
                {
                    employer: '',
                    from: null,
                    to: null,
                },
            ],
        },
    },
    bankingInformStep: {
        bankName: '',
        accountType: [],
    },
    legalAndFinancialHistoryStep: {
        isApplicantEverFiledBankruptcy: null,
        isApplicantEverBeenGarnished: null,
        isApplicantEverBeenInReceivership: null,
        isApplicantEverBeenConvictedFelony: null,
        isApplicantHadExperienceHandlingInvestments: null,
        explanation: '',
    },
};

const {
    Provider: BaseProvider,
    useFormContext,
    useStepForm,
} = createMultiStepForm<ApplicantCredibilityApplicationForm>(FORM_TYPES._APPLICANT_CREDIBILITY_APPLICATION);

const APPLICANT_CREDIBILITY_APPLICATION_FORM_CONFIG = {
    storageKey: 'APPLICANT_CREDIBILITY_APPLICATION_multi-step-form',
    submittedKey: 'APPLICANT_CREDIBILITY_APPLICATION_multi-step-form-step_submitted',
    successfulKey: 'APPLICANT_CREDIBILITY_APPLICATION_multi-step-form-step_successful',
    initialState: APPLICANT_CREDIBILITY_APPLICATION_FORM_INITIAL_STATE,
    steps: APPLICANT_CREDIBILITY_APPLICATION_FORM_STEPS,
};

export const ApplicantCredibilityApplicationFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <BaseProvider config={APPLICANT_CREDIBILITY_APPLICATION_FORM_CONFIG}>{children}</BaseProvider>;
};

export const useApplicantCredibilityApplicationFormContext = useFormContext;
export const useApplicantCredibilityApplicationFormStepForm = useStepForm;
