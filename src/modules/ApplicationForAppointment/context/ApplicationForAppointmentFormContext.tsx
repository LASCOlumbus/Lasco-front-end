import React from 'react';
import { FORM_TYPES } from '@/lib/constants';
import { createMultiStepForm } from '@/lib/createMultiStepForm';
import { ApplicationForAppointmentForm, ApplicationForAppointmentFormStep } from '@/lib/types';
import {
    applicationForAppointmentApplicantInformStepSchema,
    applicationForAppointmentAssetsAndIncomeStepSchema,
    applicationForAppointmentCaseDetailsStepSchema,
    applicationForAppointmentGuardianshipTypeStepSchema,
    applicationForAppointmentLegalDeclarationsStepSchema,
    applicationForAppointmentWardInformStepSchema,
} from '../schemas/applicationForAppointment';

export const APPLICATION_FOR_APPOINTMENT_FORM_STEPS = {
    caseDetailsStep: {
        id: 'caseDetailsStep',
        label: 'Case details',
        schema: applicationForAppointmentCaseDetailsStepSchema,
        enabled: true,
    },
    wardInformStep: {
        id: 'wardInformStep',
        label: 'Ward information',
        schema: applicationForAppointmentWardInformStepSchema,
        enabled: true,
    },
    assetsAndIncomeStep: {
        id: 'assetsAndIncomeStep',
        label: 'Assets and income',
        schema: applicationForAppointmentAssetsAndIncomeStepSchema,
        enabled: true,
    },
    guardianshipTypeStep: {
        id: 'guardianshipTypeStep',
        label: 'Guardianship type',
        schema: applicationForAppointmentGuardianshipTypeStepSchema,
        enabled: true,
    },
    applicantInformStep: {
        id: 'applicantInformStep',
        label: 'Applicant information',
        schema: applicationForAppointmentApplicantInformStepSchema,
        enabled: true,
    },
    legalDeclarationsStep: {
        id: 'legalDeclarationsStep',
        label: 'Legal declarations',
        schema: applicationForAppointmentLegalDeclarationsStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof ApplicationForAppointmentForm, ApplicationForAppointmentFormStep>;
const APPLICATION_FOR_APPOINTMENT_FORM_INITIAL_STATE: ApplicationForAppointmentForm = {
    caseDetailsStep: {
        guardianName: '',
        caseNumber: '',
        relationshipToWard: '',
    },
    wardInformStep: {
        wardName: '',
        wardDob: null,
        wardAddress: '',
        explanationNeedsOfGuardian: '',
        isWardNeedsInterpreterForEnglish: null,
        wardSpeakLanguage: '',
        wardPrescriptions: '',
        isWardHasMilitaryService: null,
        militaryService: {
            militaryId: '',
            branchService: '',
            startDateOfService: null,
            endDateOfService: null,
        },
    },
    assetsAndIncomeStep: {
        estimatedValuePersonalProperty: 0,
        estimatedValueRealEstate: 0,
        annualRentsReceived: 0,
        otherAnnualIncome: 0,
        bondAmount: 0,
        publicPrivateAssistance: '',
        isWardHasRepresentativePayee: null,
        payeeName: '',
        payeeAddress: '',
    },
    guardianshipTypeStep: {
        guardianResponsibility: '',
        typeGuardianship: [],
        limitedPowersRequested: '',
        timePeriodRequested: '',
        specifyTimePeriod: {
            start: null,
            end: null,
        },
    },
    applicantInformStep: {
        applicantName: '',
        applicantDob: null,
        applicantPhone: '',
        applicantEmail: '',
        applicantAddress: '',
        state: '',
        zip: '',
        city: '',
        applicantRelationshipToWard: '',
        isApplicantRequiringInterpreter: null,
        applicantSpeakLanguage: '',
    },
    legalDeclarationsStep: {
        isApplicantHasBeenChargedWithViolence: null,
        conviction: {
            convictionName: '',
            convictionDate: null,
            convictionPlace: '',
        },
        isGuardianHasBeenNominatedInWriting: null,
        nominatedPersonName: '',
        isNominatedPersonContactInfoListedOnForm15: null,
        isGuardianNominatedDocumentAttached: null,
        isNotAdmin: null,
        isApplicantAgreed: true,
    },
};

const { Provider: BaseProvider, useFormContext, useStepForm } = createMultiStepForm<ApplicationForAppointmentForm>(FORM_TYPES.applicationForAppointmentOfGuardian);

const APPLICATION_FOR_APPOINTMENT_FORM_CONFIG = {
    storageKey: 'APPLICATION_FOR_APPOINTMENT_multi-step-form',
    submittedKey: 'APPLICATION_FOR_APPOINTMENT_multi-step-form-step_submitted',
    successfulKey: 'APPLICATION_FOR_APPOINTMENT_multi-step-form-step_successful',
    initialState: APPLICATION_FOR_APPOINTMENT_FORM_INITIAL_STATE,
    steps: APPLICATION_FOR_APPOINTMENT_FORM_STEPS,
};

export const ApplicationForAppointmentFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <BaseProvider config={APPLICATION_FOR_APPOINTMENT_FORM_CONFIG}>{children}</BaseProvider>;
};

export const useApplicationForAppointmentFormContext = useFormContext;
export const useApplicationForAppointmentFormStepForm = useStepForm;
