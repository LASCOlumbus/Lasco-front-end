import { PhoneNumberUtil } from 'google-libphonenumber';
import { z } from 'zod';
import { ZIP_CODE_REGEX } from '@/lib/constants';

const phoneUtil = PhoneNumberUtil.getInstance();

export const booleanAnswer = z
    .boolean()
    .nullable()
    .refine((value) => {
        if (value !== null) {
            return true;
        }
        return false;
    }, 'This field is required.');

export const maybeDateSchema = z.union([z.date(), z.string()]).nullable().optional();
export const requiredStringSchema = z.string().min(1, 'This field is required');
export const zipCodeSchema = requiredStringSchema.regex(ZIP_CODE_REGEX, 'Invalid zip code');
export const numberSchema = z.number().min(0, { message: 'This field must be a valid number ' });
export const optionalNumberSchema = z.number().optional().nullable();
export const positiveNumberSchema = z.number().min(1, { message: 'This field must be a positive number' });

export const phoneSchema = requiredStringSchema
    .nullable()
    .refine((value) => {
        return value;
    }, 'This field is required')
    .refine((value) => {
        try {
            return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(value ?? ''));
        } catch {
            return false;
        }
    }, 'Invalid phone number');

// Webcheck Waiver Form

export const webcheckWaiverStepSchema = z.object({
    guardianName: requiredStringSchema,
    caseNumber: requiredStringSchema,
    applicantName: requiredStringSchema,
});

// Waiver of Notice Form

export const waiverNoticeCaseDetailsStepSchema = z.object({
    guardianName: requiredStringSchema,
    caseNumber: requiredStringSchema,
    applicantName: requiredStringSchema,
});

export const waiverNoticeWaiversListStepSchema = z.object({
    persons: z.array(z.string().min(1, 'This field is required.')).min(1, 'This field is required.'),
});

// Adult Guardianship

export const adultGuardianshipCaseDetailsStepSchema = z.object({
    guardianName: requiredStringSchema,
    caseNumber: requiredStringSchema,
    contactName: requiredStringSchema,
    contactPhone: phoneSchema,
});

export const adultGuardianshipWardLocationStepSchema = z.object({
    streetAddress: requiredStringSchema,
    city: requiredStringSchema,
    state: requiredStringSchema,
    zip: zipCodeSchema,
    wardPhone: phoneSchema,
});

export const answerWithExplanationSchema = z
    .object({
        answer: z
            .boolean()
            .nullable()
            .refine((value) => {
                return value !== null;
            }, 'This field is required.'),
        explanation: z.string().optional(),
    })
    .refine(
        (data) => {
            return data?.answer ? requiredStringSchema.safeParse(data.explanation).success : true;
        },
        {
            message: 'This field is required.',
            path: ['explanation'],
        }
    );

export const adultGuardianshipSafetyServiceStepSchema = z.object({
    isProspectiveWardLeaveDuringDay: answerWithExplanationSchema,
    specialCircumstances: answerWithExplanationSchema,
    isProspectiveWardHasCommunicationIssues: answerWithExplanationSchema,
});
