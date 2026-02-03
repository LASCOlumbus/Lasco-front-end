import {
    waiverNoticeCaseDetailsStepSchema,
    waiverNoticeWaiversListStepSchema,
    webcheckWaiverStepSchema,
} from '@/schemas/formSchemas';
import { z } from 'zod';
import {
    adultGuardianshipCaseDetailsStepSchema,
    adultGuardianshipSafetyServiceStepSchema,
    adultGuardianshipWardLocationStepSchema,
} from '@/modules/AdultGuardianship/schemas/adultGuardianshipFormSchemas';

export type ObjValues<TObj> = TObj[keyof TObj];

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
    title: string;
    description: string;
    handleTryAgain?: () => void;
};

// SuccessSectionProps
export type SuccessSectionProps = {
    title: string;
    description: string;
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
