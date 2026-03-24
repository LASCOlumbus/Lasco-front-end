import { generateRequiredStringWithLimitsSchema, maybeDateSchema, requiredStringSchema, zipCodeSchema } from '@/schemas/formSchemas';
import { z } from 'zod';

export const nextKinProspectiveWardCaseDetailsStepSchema = z.object({
    guardianName: generateRequiredStringWithLimitsSchema(4, 100),
    caseNumber: requiredStringSchema,
    applicantName: generateRequiredStringWithLimitsSchema(4, 100),
});

export const relativePersonSchema = z
    .object({
        fullName: requiredStringSchema,
        isRelativeUnder18: z.boolean(),
        dob: maybeDateSchema,
        relationship: requiredStringSchema,
        address: requiredStringSchema,
        zip: zipCodeSchema,
    })
    .refine(
        (data) => {
            if (!data.isRelativeUnder18) return true;

            if (!data.dob) return false;

            const date = data.dob instanceof Date ? data.dob : new Date(data.dob);

            return !isNaN(date.getTime());
        },
        {
            message: 'This field is required.',
            path: ['dob'],
        }
    );

export const nextKinProspectiveWardWaiversListStepSchema = z.object({
    relatives: z.array(relativePersonSchema).min(1, 'This field is required.'),
});
