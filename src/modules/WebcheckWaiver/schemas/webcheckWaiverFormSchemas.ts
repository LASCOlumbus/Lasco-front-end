import { z } from 'zod';

export const webcheckWaiverStepSchema = z.object({
    guardianName: z.string().min(1, 'This field is required.'),
    caseNumber: z.string().min(1, 'This field is required.'),
    applicantName: z.string().min(1, 'This field is required.'),
});
