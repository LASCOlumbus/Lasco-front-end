import { z } from 'zod';

export const stepOneSchema = z.object({
    fizz_one: z.string(),
    buzz_one: z.number(),
});

export const stepTwoSchema = z.object({
    fizz_two: z.string(),
    buzz_two: z.number(),
});

export const stepThreeSchema = z.object({
    fizz_three: z.string(),
    buzz_three: z.number(),
});

// Webcheck Waiver Form

export const webcheckWaiverStepOneSchema = z.object({
    guardianName: z.string().min(1, 'This field is required.'),
    caseNumber: z.string().min(1, 'This field is required.'),
    applicantName: z.string().min(1, 'This field is required.'),
});

// Waiver of Notice Form

export const waiverNoticeStepOneSchema = z.object({
    guardianName: z.string().min(1, 'This field is required.'),
    caseNumber: z.string().min(1, 'This field is required.'),
    applicantName: z.string().min(1, 'This field is required.'),
});

export const waiverNoticeStepTwoSchema = z.object({
    persons: z.array(z.string().min(1, 'This field is required.')).min(1, 'This field is required.'),
});
