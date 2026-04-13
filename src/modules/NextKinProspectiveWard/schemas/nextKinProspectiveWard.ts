import { generateRequiredStringWithLimitsSchema, maybeDateSchema, optionalStringSchema, requiredStringSchema, zipCodeSchema } from '@/schemas/formSchemas';
import { isValid } from 'date-fns';
import { z } from 'zod';

export const nextKinProspectiveWardCaseDetailsStepSchema = z.object({
    guardianName: generateRequiredStringWithLimitsSchema(4, 100),
    caseNumber: optionalStringSchema,
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
            if (!data.isRelativeUnder18) {
                return true;
            }

            if (!data.dob) {
                return false;
            }

            const date = data.dob instanceof Date ? data.dob : new Date(data.dob);

            return isValid(date);
        },
        {
            message: 'This field is required.',
            path: ['dob'],
        }
    );

export const nextKinProspectiveWardWaiversListStepSchema = z.object({
    relatives: z.array(relativePersonSchema).min(1, 'This field is required.'),
});
