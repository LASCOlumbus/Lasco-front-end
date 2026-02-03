import { PhoneNumberUtil } from 'google-libphonenumber';
import { z } from 'zod';

const phoneUtil = PhoneNumberUtil.getInstance();

export const requiredStringSchema = z.string().min(1, 'This field is required');

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
    zip: requiredStringSchema,
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
