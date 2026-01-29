import { z } from 'zod';
import {
    stepOneSchema,
    stepTwoSchema,
    stepThreeSchema,
    webcheckWaiverStepOneSchema, waiverNoticeStepOneSchema, waiverNoticeStepTwoSchema
} from "@/schemas/multiStepFormSchemas.ts";

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

export type StepOneSchema = z.infer<typeof stepOneSchema>;
export type StepTwoSchema = z.infer<typeof stepTwoSchema>;
export type StepThreeSchema = z.infer<typeof stepThreeSchema>;

export type MultiStepForm = {
    stepOne: StepOneSchema;
    stepTwo: StepTwoSchema;
    stepThree: StepThreeSchema;
};

export type MultiStepFormStep = {
    id: keyof MultiStepForm;
    label: string;
    schema: z.ZodSchema<MultiStepForm[keyof MultiStepForm]>;
    enabled?: boolean;
};

// Webcheck Waiver Form
export type WebcheckWaiverStepOneSchema = z.infer<typeof webcheckWaiverStepOneSchema>;

export type WebcheckWaiverForm = {
    stepOne: WebcheckWaiverStepOneSchema;
};

export type IWebcheckWaiverFormStep = {
    id: keyof WebcheckWaiverForm;
    label: string;
    schema: z.ZodSchema<WebcheckWaiverForm[keyof WebcheckWaiverForm]>;
    enabled?: boolean;
};

// Waiver of Notice Form
export type WaiverNoticeStepOneSchema = z.infer<typeof waiverNoticeStepOneSchema>;
export type WaiverNoticeStepTwoSchema = z.infer<typeof waiverNoticeStepTwoSchema>;


export type WaiverNoticeForm = {
    stepOne: WaiverNoticeStepOneSchema;
    stepTwo: WaiverNoticeStepTwoSchema;
};

export type IWaiverNoticeFormStep = {
    id: keyof WaiverNoticeForm;
    label: string;
    schema: z.ZodSchema<WaiverNoticeForm[keyof WaiverNoticeForm]>;
    enabled?: boolean;
};
