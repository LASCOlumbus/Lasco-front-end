import type { FormValidateOrFn } from '@tanstack/react-form';
import {
    adultGuardianshipCaseDetailsStepSchema,
    adultGuardianshipSafetyServiceStepSchema,
    adultGuardianshipWardLocationStepSchema,
    waiverNoticeCaseDetailsStepSchema,
    waiverNoticeWaiversListStepSchema,
    webcheckWaiverStepSchema,
} from '@/schemas/formSchemas';
import { z } from 'zod';
import {
    adultJurisdictionAffidavitAddressInformStepSchema,
    adultJurisdictionAffidavitCaseDetailsStepSchema,
    adultJurisdictionAffidavitLegalQuestionsStepSchema,
} from '@/modules/AdultJurisdictionAffidavit/schemas/adultJurisdictionAffidavit';
import {
    applicantCredibilityApplicationApplicantInformStepSchema,
    applicantCredibilityApplicationBankingInformStepSchema,
    applicantCredibilityApplicationCaseDetailsStepSchema,
    applicantCredibilityApplicationFamilyAndEmploymentStepSchema,
    applicantCredibilityApplicationLegalAndFinancialHistoryStepSchema,
} from '@/modules/ApplicantCredibilityApplication/schemas/applicantCredibilityApplication';
import {
    applicationForAppointmentApplicantInformStepSchema,
    applicationForAppointmentAssetsAndIncomeStepSchema,
    applicationForAppointmentCaseDetailsStepSchema,
    applicationForAppointmentGuardianshipTypeStepSchema,
    applicationForAppointmentLegalDeclarationsStepSchema,
    applicationForAppointmentWardInformStepSchema,
} from '@/modules/ApplicationForAppointment/schemas/applicationForAppointment';
import {
    nextKinProspectiveWardCaseDetailsStepSchema,
    nextKinProspectiveWardWaiversListStepSchema,
} from '@/modules/NextKinProspectiveWard/schemas/nextKinProspectiveWard';
import {
    prospectiveWardsFinancialInfoAssetsInterestsSchema,
    prospectiveWardsFinancialInfoBenefitsStepSchema,
    prospectiveWardsFinancialInfoFinancialAccountStepSchema,
    prospectiveWardsFinancialInfoFormCaseDetailsStepSchema,
    prospectiveWardsFinancialInfoPropertyStepSchema,
} from '@/modules/ProspectiveWardsFinancialInfoForm/schemas/prospectiveWardsFinancialInfo';

export type MultiStepFormStep<TForm, K extends keyof TForm = keyof TForm> = {
    id: K;
    label: string;
    schema: FormValidateOrFn<TForm[K]>;
    enabled: boolean;
};

export type MultiStepFormConfig<TForm> = {
    storageKey: string;
    submittedKey: string;
    successfulKey: string;
    initialState: TForm;
    steps: {
        [K in keyof TForm]: MultiStepFormStep<TForm, K>;
    };
};
export type ObjValues<TObj> = TObj[keyof TObj];

export type StringWithAutocompleteUnion<TUnion extends string> = TUnion | (string & {});

export type WithClassName<TProps = unknown> = TProps & {
    /**
        Extendable classnames of component
    */
    className?: string;
};

export type WithChildren<TProps = unknown> = TProps & {
    /**
     * Extendable children of component
     */
    children?: React.ReactNode;
};

export type SetStateValue<TValue> = React.Dispatch<React.SetStateAction<TValue>>;

export type AnimationDirection = 'next' | 'prev';

// FailureSectionProps
export type FailureSectionProps = {
    title: React.ReactNode;
    description: React.ReactNode;
    handleTryAgain?: () => void;
};

// SuccessSectionProps
export type SuccessSectionProps = {
    title: React.ReactNode;
    description: React.ReactNode;
    handlePrint?: () => void;
    handleDownload?: () => void;
};

//AnimatedFormWrapperProps
export type AnimatedFormWrapperProps = {
    currentStepIndex: number;
    animationDirection: AnimationDirection;
    isLoading: boolean;
};

// Webcheck Waiver Form
export type WebcheckWaiverStepSchema = z.infer<typeof webcheckWaiverStepSchema>;

export type WebcheckWaiverForm = {
    webcheckWaiverStep: WebcheckWaiverStepSchema;
};

export type WebcheckWaiverFormStep = {
    id: keyof WebcheckWaiverForm;
    label: string;
    schema: z.ZodSchema<WebcheckWaiverForm[keyof WebcheckWaiverForm]>;
    enabled?: boolean;
};

// Waiver of Notice Form
export type WaiverNoticeCaseDetailsStepSchema = z.infer<typeof waiverNoticeCaseDetailsStepSchema>;
export type WaiverNoticeWaiversListStepSchema = z.infer<typeof waiverNoticeWaiversListStepSchema>;

export type WaiverNoticeForm = {
    caseDetailsStep: WaiverNoticeCaseDetailsStepSchema;
    waiversListStep: WaiverNoticeWaiversListStepSchema;
};

export type IWaiverNoticeFormStep = {
    id: keyof WaiverNoticeForm;
    label: string;
    schema: z.ZodSchema<WaiverNoticeForm[keyof WaiverNoticeForm]>;
    enabled?: boolean;
};

// Adult Guardianship
type AllowNullForSubProperties<T> = {
    [Property in keyof T]: T[Property] extends object
        ? {
              [SubProperty in keyof T[Property]]: T[Property][SubProperty] | null;
          }
        : T[Property] | null;
};

export type AdultGuardianshipCaseDetailsStepSchema = z.infer<typeof adultGuardianshipCaseDetailsStepSchema>;
export type AdultGuardianshipWardLocationStepSchema = z.infer<typeof adultGuardianshipWardLocationStepSchema>;
export type AdultGuardianshipSafetyServiceStepSchema = AllowNullForSubProperties<
    z.infer<typeof adultGuardianshipSafetyServiceStepSchema>
>;

export type AdultGuardianshipForm = {
    caseDetailsStep: AdultGuardianshipCaseDetailsStepSchema;
    wardLocationStep: AdultGuardianshipWardLocationStepSchema;
    safetyServiceStep: AdultGuardianshipSafetyServiceStepSchema;
};

export type AdultGuardianshipFormStep = {
    id: keyof AdultGuardianshipForm;
    label: string;
    schema: z.ZodSchema<AdultGuardianshipForm[keyof AdultGuardianshipForm]>;
    enabled?: boolean;
};

// Next Kin Prospective Ward
export type NextKinProspectiveWardCaseDetailsStepSchema = z.infer<typeof nextKinProspectiveWardCaseDetailsStepSchema>;
export type NextKinProspectiveWardWaiversListStepSchema = z.infer<typeof nextKinProspectiveWardWaiversListStepSchema>;

export type NextKinProspectiveWardForm = {
    caseDetailsStep: NextKinProspectiveWardCaseDetailsStepSchema;
    waiversListStep: NextKinProspectiveWardWaiversListStepSchema;
};

export type NextKinProspectiveWardFormStep = {
    id: keyof NextKinProspectiveWardForm;
    label: string;
    schema: z.ZodSchema<NextKinProspectiveWardForm[keyof NextKinProspectiveWardForm]>;
    enabled?: boolean;
};

// Applicant Credibility Application
export type ApplicantCredibilityApplicationCaseDetailsStepSchema = z.infer<
    typeof applicantCredibilityApplicationCaseDetailsStepSchema
>;
export type ApplicantCredibilityApplicationApplicantInformStepSchema = z.infer<
    typeof applicantCredibilityApplicationApplicantInformStepSchema
>;
export type ApplicantCredibilityApplicationFamilyAndEmploymentStepSchema = z.infer<
    typeof applicantCredibilityApplicationFamilyAndEmploymentStepSchema
>;
export type ApplicantCredibilityApplicationBankingInformStepSchema = z.infer<
    typeof applicantCredibilityApplicationBankingInformStepSchema
>;
export type ApplicantCredibilityApplicationLegalAndFinancialHistoryStepSchema = z.infer<
    typeof applicantCredibilityApplicationLegalAndFinancialHistoryStepSchema
>;

export type ApplicantCredibilityApplicationForm = {
    caseDetailsStep: ApplicantCredibilityApplicationCaseDetailsStepSchema;
    applicantInformStep: ApplicantCredibilityApplicationApplicantInformStepSchema;
    familyAndEmploymentStep: ApplicantCredibilityApplicationFamilyAndEmploymentStepSchema;
    bankingInformStep: ApplicantCredibilityApplicationBankingInformStepSchema;
    legalAndFinancialHistoryStep: ApplicantCredibilityApplicationLegalAndFinancialHistoryStepSchema;
};

export type ApplicantCredibilityApplicationFormStep = {
    id: keyof ApplicantCredibilityApplicationForm;
    label: string;
    schema: z.ZodSchema<ApplicantCredibilityApplicationForm[keyof ApplicantCredibilityApplicationForm]>;
    enabled?: boolean;
};

// Application For Appointment
export type ApplicationForAppointmentCaseDetailsStepSchema = z.infer<
    typeof applicationForAppointmentCaseDetailsStepSchema
>;
export type ApplicationForAppointmentWardInformStepSchema = AllowNullForSubProperties<
    z.infer<typeof applicationForAppointmentWardInformStepSchema>
>;
export type ApplicationForAppointmentAssetsAndIncomeStepSchema = z.infer<
    typeof applicationForAppointmentAssetsAndIncomeStepSchema
>;
export type ApplicationForAppointmentGuardianshipTypeStepSchema = z.infer<
    typeof applicationForAppointmentGuardianshipTypeStepSchema
>;
export type ApplicationForAppointmentApplicantInformStepSchema = AllowNullForSubProperties<
    z.infer<typeof applicationForAppointmentApplicantInformStepSchema>
>;
export type ApplicationForAppointmentLegalDeclarationsStepSchema = z.infer<
    typeof applicationForAppointmentLegalDeclarationsStepSchema
>;

export type ApplicationForAppointmentForm = {
    caseDetailsStep: ApplicationForAppointmentCaseDetailsStepSchema;
    wardInformStep: ApplicationForAppointmentWardInformStepSchema;
    assetsAndIncomeStep: ApplicationForAppointmentAssetsAndIncomeStepSchema;
    guardianshipTypeStep: ApplicationForAppointmentGuardianshipTypeStepSchema;
    applicantInformStep: ApplicationForAppointmentApplicantInformStepSchema;
    legalDeclarationsStep: ApplicationForAppointmentLegalDeclarationsStepSchema;
};

export type ApplicationForAppointmentFormStep = {
    id: keyof ApplicationForAppointmentForm;
    label: string;
    schema: z.ZodSchema<ApplicationForAppointmentForm[keyof ApplicationForAppointmentForm]>;
    enabled?: boolean;
};

// Adult Jurisdiction Affidavit
export type AdultJurisdictionAffidavitCaseDetailsStepSchema = z.infer<
    typeof adultJurisdictionAffidavitCaseDetailsStepSchema
>;
export type AdultJurisdictionAffidavitAddressInformStepSchema = z.infer<
    typeof adultJurisdictionAffidavitAddressInformStepSchema
>;
export type AdultJurisdictionAffidavitLegalQuestionsStepSchema = z.infer<
    typeof adultJurisdictionAffidavitLegalQuestionsStepSchema
>;

export type AdultJurisdictionAffidavitForm = {
    caseDetailsStep: AdultJurisdictionAffidavitCaseDetailsStepSchema;
    addressInformStep: AdultJurisdictionAffidavitAddressInformStepSchema;
    legalQuestionsStep: AdultJurisdictionAffidavitLegalQuestionsStepSchema;
};

export type AdultJurisdictionAffidavitFormStep = {
    id: keyof AdultJurisdictionAffidavitForm;
    label: string;
    schema: z.ZodSchema<AdultJurisdictionAffidavitForm[keyof AdultJurisdictionAffidavitForm]>;
    enabled?: boolean;
};

export type ProspectiveWardsFinancialInfoCaseDetailsFormStep = {
    id: keyof ProspectiveWardsFinancialInfoForm;
    label: string;
    schema: z.ZodSchema<ProspectiveWardsFinancialInfoForm[keyof ProspectiveWardsFinancialInfoForm]>;
    enabled?: boolean;
};

export type ProspectiveWardsFinancialInfoCaseDetailsStepSchema = z.infer<
    typeof prospectiveWardsFinancialInfoFormCaseDetailsStepSchema
>;
export type ProspectiveWardsFinancialInfoBenefitsStepStepSchema = z.infer<
    typeof prospectiveWardsFinancialInfoBenefitsStepSchema
>;
export type ProspectiveWardsFinancialInfoFinancialAccountStepSchema = z.infer<
    typeof prospectiveWardsFinancialInfoFinancialAccountStepSchema
>;

export type ProspectiveWardsFinancialInfoPropertyStepSchema = z.infer<
    typeof prospectiveWardsFinancialInfoPropertyStepSchema
>;
export type ProspectiveWardsFinancialInfoAssetsInterestsStepSchema = z.infer<
    typeof prospectiveWardsFinancialInfoAssetsInterestsSchema
>;

export type ProspectiveWardsFinancialInfoForm = {
    caseDetailsStep: ProspectiveWardsFinancialInfoCaseDetailsStepSchema;
    benefitsStep: ProspectiveWardsFinancialInfoBenefitsStepStepSchema;
    financialAccountStep: ProspectiveWardsFinancialInfoFinancialAccountStepSchema;
    propertyStep: ProspectiveWardsFinancialInfoPropertyStepSchema;
    assetsInterests: ProspectiveWardsFinancialInfoAssetsInterestsStepSchema;
};
