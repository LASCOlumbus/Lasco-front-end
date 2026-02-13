import type { AdultJurisdictionAffidavitForm, AdultJurisdictionAffidavitFormStep, MultiStepFormConfig } from '@/lib/types';
import React from 'react';
import { FORM_TYPES } from '@/lib/constants';
import { createMultiStepForm } from '@/lib/createMultiStepForm';
import { adultJurisdictionAffidavitAddressInformStepSchema, adultJurisdictionAffidavitCaseDetailsStepSchema, adultJurisdictionAffidavitLegalQuestionsStepSchema } from '@/modules/AdultJurisdictionAffidavit/schemas/adultJurisdictionAffidavit';

export const ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS = {
    caseDetailsStep: {
        id: 'caseDetailsStep',
        label: 'Case details',
        schema: adultJurisdictionAffidavitCaseDetailsStepSchema,
        enabled: true,
    },
    addressInformStep: {
        id: 'addressInformStep',
        label: 'Address information',
        schema: adultJurisdictionAffidavitAddressInformStepSchema,
        enabled: true,
    },
    legalQuestionsStep: {
        id: 'legalQuestionsStep',
        label: 'Family and employment',
        schema: adultJurisdictionAffidavitLegalQuestionsStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof AdultJurisdictionAffidavitForm, AdultJurisdictionAffidavitFormStep>;

const ADULT_JURISDICTION_AFFIDAVIT_FORM_INITIAL_STATE: AdultJurisdictionAffidavitForm = {
    caseDetailsStep: {
        guardianName: '',
        caseNumber: '',
        applicantName: '',
    },
    addressInformStep: {
        currentAddress: '',
        from: '',
        to: '',
        withWhom: '',
        isSameAddressLast2Years: null,
        previousAddresses: [
            {
                address: '',
                from: null,
                to: null,
            },
        ],
    },
    legalQuestionsStep: {
        isAffiantHaveInfoAboutAnyGuardianship: null,
        infoAboutCourtProceeding: '',
        isAllegedIncompetentDivorced: null,
        isDivorcePending: null,
        courtName: '',
        isAllegedIncompetentCurrently: null,
        additionalInfo: '',
    },
};

const { Provider: BaseProvider, useFormContext, useStepForm } = createMultiStepForm<AdultJurisdictionAffidavitForm>(FORM_TYPES.adultJurisdictionAffidavit);

const ADULT_JURISDICTION_AFFIDAVIT_FORM_CONFIG = {
    storageKey: 'ADULT_JURISDICTION_AFFIDAVIT_multi-step-form',
    submittedKey: 'ADULT_JURISDICTION_AFFIDAVIT_multi-step-form-step_submitted',
    successfulKey: 'ADULT_JURISDICTION_AFFIDAVIT_multi-step-form-step_successful',
    initialState: ADULT_JURISDICTION_AFFIDAVIT_FORM_INITIAL_STATE,
    steps: ADULT_JURISDICTION_AFFIDAVIT_FORM_STEPS,
} as MultiStepFormConfig<AdultJurisdictionAffidavitForm>;

export const AdultJurisdictionAffidavitFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <BaseProvider config={ADULT_JURISDICTION_AFFIDAVIT_FORM_CONFIG}>{children}</BaseProvider>;
};

export const useAdultJurisdictionAffidavitFormContext = useFormContext;
export const useAdultJurisdictionAffidavitFormStepForm = useStepForm;
