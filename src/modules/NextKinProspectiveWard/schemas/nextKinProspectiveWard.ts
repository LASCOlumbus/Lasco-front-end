import { maybeDateSchema, optionalStringSchema, optionalZipCodeSchema } from '@/schemas/formSchemas';
import { isValid } from 'date-fns';
import { z } from 'zod';

export const nextKinProspectiveWardCaseDetailsStepSchema = z.object({
    guardianName: optionalStringSchema,
    caseNumber: optionalStringSchema,
    applicantName: optionalStringSchema,
});

export const relativePersonSchema = z
    .object({
        fullName: optionalStringSchema,
        isRelativeUnder18: z.boolean().optional(),
        dob: maybeDateSchema.optional(),
        relationship: optionalStringSchema,
        address: optionalStringSchema,
        zip: optionalZipCodeSchema,
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
    relatives: z.array(relativePersonSchema).min(1, 'This field is required.').optional(),
});
