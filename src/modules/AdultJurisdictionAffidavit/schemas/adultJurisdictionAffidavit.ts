import { requiredStringSchema } from '@/schemas/formSchemas';
import { z } from 'zod';

export const booleanAnswer = z
    .boolean()
    .nullable()
    .refine((value) => {
        if (value !== null) {
            return true;
        }
        return false;
    }, 'This field is required.');

export const adultJurisdictionAffidavitCaseDetailsStepSchema = z.object({
    guardianName: requiredStringSchema,
    caseNumber: requiredStringSchema,
    applicantName: requiredStringSchema,
});

export const previousAddressSchema = z.object({
    address: requiredStringSchema,
    from: z
        .union([z.date(), z.string()])
        .nullable()
        .refine((value) => {
            return value !== null;
        }, 'This field is required.'),
    to: z
        .union([z.date(), z.string()])
        .nullable()
        .refine((value) => {
            return value !== null;
        }, 'This field is required.'),
});

export const previousAddressOptionalSchema = z.object({
    address: z.string().optional(),
    from: z.union([z.date(), z.string()]).nullable(),
    to: z.union([z.date(), z.string()]).nullable(),
});

export const adultJurisdictionAffidavitAddressInformStepSchema = z
    .object({
        currentAddress: requiredStringSchema,
        from: z.union([z.date(), z.string()]).nullable(),
        to: z.union([z.date(), z.string()]).nullable(),
        withWhom: requiredStringSchema,
        isSameAddressLast2Years: booleanAnswer,
        previousAddresses: z.array(previousAddressOptionalSchema).optional(),
    })
    .refine(
        (data) => {
            return data?.isSameAddressLast2Years === false
                ? z.array(previousAddressSchema).min(1, 'This field is required.').safeParse(data.previousAddresses)
                      .success
                : true;
        },
        {
            message: 'This field is required.',
            path: ['previousAddresses.address'],
        }
    );

export const adultJurisdictionAffidavitLegalQuestionsStepSchema = z
    .object({
        isAffiantHaveInfoAboutAnyGuardianship: booleanAnswer,
        infoAboutCourtProceeding: requiredStringSchema,
        isAllegedIncompetentDivorced: booleanAnswer,
        isDivorcePending: booleanAnswer,
        courtName: z.string().optional(),
        isAllegedIncompetentCurrently: booleanAnswer,
        additionalInfo: requiredStringSchema,
    })
    .refine(
        (data) => {
            if (data?.isDivorcePending) {
                return requiredStringSchema.safeParse(data.courtName).success;
            }

            return true;
        },
        {
            message: 'This field is required.',
            path: ['courtName'],
        }
    );
