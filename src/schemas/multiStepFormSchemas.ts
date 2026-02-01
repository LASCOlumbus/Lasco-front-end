import { z } from 'zod';

// Webcheck Waiver Form

export const webcheckWaiverStepSchema = z.object({
    guardianName: z.string().min(1, 'This field is required.'),
    caseNumber: z.string().min(1, 'This field is required.'),
    applicantName: z.string().min(1, 'This field is required.'),
});

// Waiver of Notice Form

export const waiverNoticeCaseDetailsStepSchema = z.object({
    guardianName: z.string().min(1, 'This field is required.'),
    caseNumber: z.string().min(1, 'This field is required.'),
    applicantName: z.string().min(1, 'This field is required.'),
});

export const waiverNoticeWaiversListStepSchema = z.object({
    persons: z.array(z.string().min(1, 'This field is required.')).min(1, 'This field is required.'),
});

// Adult Guardianship

export const adultGuardianshipCaseDetailsStepSchema = z.object({
    guardianName: z.string().min(1, 'This field is required.'),
    caseNumber: z.string().min(1, 'This field is required.'),
    contactName: z.string().min(1, 'This field is required.'),
    contactPhone: z
        .string()
        .min(10, { message: 'Must be a valid mobile number' })
        .max(14, { message: 'Must be a valid mobile number' }),
});

export const adultGuardianshipWardLocationStepSchema = z.object({
    streetAddress: z.string().min(1, 'This field is required.'),
    city: z.string().min(1, 'This field is required.'),
    state: z.string().min(1, 'This field is required.'),
    zip: z.string().min(1, 'This field is required.'),
    wardPhone: z
        .string()
        .min(10, { message: 'Must be a valid mobile number' })
        .max(14, { message: 'Must be a valid mobile number' }),
});

export const adultGuardianshipSafetyServiceStepSchema = z.object({
    answer_1: z.string().min(1, 'This field is required.'),
    answer_explanation_1: z.string().min(1, 'This field is required.'),
    answer_2: z.string().min(1, 'This field is required.'),
    answer_explanation_2: z.string().min(1, 'This field is required.'),
    answer_3: z.string().min(1, 'This field is required.'),
    answer_explanation_3: z.string().min(1, 'This field is required.'),
});
