import { z } from 'zod';

export const waiverNoticeCaseDetailsStepSchema = z.object({
    guardianName: z.string().min(1, 'This field is required.'),
    caseNumber: z.string().min(1, 'This field is required.'),
    applicantName: z.string().min(1, 'This field is required.'),
});

export const waiverNoticeWaiversListStepSchema = z.object({
    persons: z.array(z.string().min(1, 'This field is required.')).min(1, 'This field is required.'),
});
