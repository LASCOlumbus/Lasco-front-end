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
export const requiredStringSchema = z.string().trim().min(1, 'This field is required');
export const optionalStringSchema = z.string().trim().optional();
export const zipCodeSchema = requiredStringSchema.regex(ZIP_CODE_REGEX, 'Invalid zip code');
export const optionalZipCodeSchema = z
    .string()
    .optional()
    .refine((value) => {
        return !value || ZIP_CODE_REGEX.test(value);
    }, 'Invalid zip code');
export const numberSchema = z.number().min(0, { message: 'This field must be a valid number ' });
export const optionalNumberSchema = z.number().optional().nullable();
export const positiveNumberSchema = z.number().min(1, { message: 'This field must be a positive number' });
export const generateRequiredStringWithLimitsSchema = (min = 4, max = 100) => {
    return requiredStringSchema.min(min, `Minimum ${min} characters required`).max(max, `Maximum ${max} characters allowed`);
};
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
    guardianName: generateRequiredStringWithLimitsSchema(4, 100),
    caseNumber: optionalStringSchema,
    applicantName: generateRequiredStringWithLimitsSchema(4, 100),
});

// Waiver of Notice Form

export const waiverNoticeCaseDetailsStepSchema = z.object({
    guardianName: generateRequiredStringWithLimitsSchema(4, 100),
    caseNumber: optionalStringSchema,
    applicantName: generateRequiredStringWithLimitsSchema(4, 100),
});

export const waiverNoticeWaiversListStepSchema = z.object({
    persons: z.array(z.string().min(1, 'This field is required.')).min(1, 'This field is required.'),
});

// Adult Guardianship

export const adultGuardianshipCaseDetailsStepSchema = z.object({
    guardianName: generateRequiredStringWithLimitsSchema(4, 100),
    caseNumber: optionalStringSchema,
    contactName: requiredStringSchema,
    contactPhone: phoneSchema,
});

export const adultGuardianshipWardLocationStepSchema = z.object({
    streetAddress: generateRequiredStringWithLimitsSchema(5, 100),
    city: requiredStringSchema.min(2, 'Minimum 2 characters required').max(50, 'Maximum 50 characters allowed'),
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

        explanation: z.string().optional(), // без trim/min/max тут
    })
    .refine(
        (data) => {
            if (data.answer === true) {
                return z.string().trim().min(1, 'Minimum 1 character required').max(300, 'Maximum 300 characters allowed').safeParse(data.explanation).success;
            }
            return true;
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
