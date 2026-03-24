import { booleanAnswer, phoneSchema, positiveNumberSchema, requiredStringSchema } from '@/schemas/formSchemas';
import { z } from 'zod';

export const applicationForAppointmentCaseDetailsStepSchema = z.object({
    guardianName: requiredStringSchema.min(4, 'Minimum 4 characters required').max(100),
    caseNumber: requiredStringSchema,
    relationshipToWard: requiredStringSchema,
});

export const militaryServiceSchema = z.object({
    militaryId: requiredStringSchema,
    branchService: requiredStringSchema,
    startDateOfService: z
        .union([z.date(), z.string()])
        .nullable()
        .refine((value) => {
            return value !== null;
        }, 'This field is required.'),
    endDateOfService: z
        .union([z.date(), z.string()])
        .nullable()
        .refine((value) => {
            return value !== null;
        }, 'This field is required.'),
});

export const militaryServiceOptionalSchema = z.object({
    militaryId: z.string().optional(),
    branchService: z.string().optional(),
    startDateOfService: z.union([z.date(), z.string()]).nullable(),
    endDateOfService: z.union([z.date(), z.string()]).nullable(),
});

export const applicationForAppointmentWardInformStepSchema = z
    .object({
        wardName: requiredStringSchema,
        wardDob: z
            .union([z.date(), z.string()])
            .nullable()
            .refine((value) => {
                return value !== null;
            }, 'This field is required.'),
        wardAddress: requiredStringSchema,
        explanationNeedsOfGuardian: requiredStringSchema,
        isWardNeedsInterpreterForEnglish: booleanAnswer,
        wardSpeakLanguage: z.string().optional(),
        wardPrescriptions: requiredStringSchema,
        isWardHasMilitaryService: booleanAnswer,
        militaryService: militaryServiceOptionalSchema,
    })
    .refine(
        (data) => {
            return data?.isWardNeedsInterpreterForEnglish ? requiredStringSchema.safeParse(data.wardSpeakLanguage).success : true;
        },
        {
            message: 'This field is required.',
            path: ['wardSpeakLanguage'],
        }
    )
    .refine(
        (data) => {
            return data?.isWardHasMilitaryService ? militaryServiceSchema.safeParse(data.militaryService).success : true;
        },
        {
            message: 'This field is required.',
            path: ['militaryService'],
        }
    );

export const applicationForAppointmentAssetsAndIncomeStepSchema = z
    .object({
        estimatedValuePersonalProperty: positiveNumberSchema,
        estimatedValueRealEstate: positiveNumberSchema,
        annualRentsReceived: positiveNumberSchema,
        otherAnnualIncome: positiveNumberSchema,
        bondAmount: positiveNumberSchema,
        publicPrivateAssistance: requiredStringSchema,
        isWardHasRepresentativePayee: booleanAnswer,
        payeeName: z.string().optional(),
        payeeAddress: z.string().optional(),
    })
    .refine(
        (data) => {
            return data.isWardHasRepresentativePayee ? requiredStringSchema.safeParse(data.payeeName).success : true;
        },
        {
            message: 'This field is required.',
            path: ['payeeName'],
        }
    )
    .refine(
        (data) => {
            return data.isWardHasRepresentativePayee ? requiredStringSchema.safeParse(data.payeeAddress).success : true;
        },
        {
            message: 'This field is required.',
            path: ['payeeAddress'],
        }
    );

export const specifyTimePeriodSchema = z.object({
    start: z
        .union([z.date(), z.string()])
        .nullable()
        .refine((value) => {
            return value !== null;
        }, 'This field is required.'),
    end: z
        .union([z.date(), z.string()])
        .nullable()
        .refine((value) => {
            return value !== null;
        }, 'This field is required.'),
});

export const applicationForAppointmentGuardianshipTypeStepSchema = z
    .object({
        guardianResponsibility: requiredStringSchema,
        typeGuardianship: z.array(requiredStringSchema).min(1, 'This field is required.'),
        limitedPowersRequested: z.string().optional(),
        timePeriodRequested: requiredStringSchema,
        specifyTimePeriod: z.object({
            start: z.union([z.date(), z.string()]).nullable().optional(),
            end: z.union([z.date(), z.string()]).nullable().optional(),
        }),
    })
    .refine(
        (data) => {
            return data.typeGuardianship.includes('Limited') ? requiredStringSchema.safeParse(data.limitedPowersRequested).success : true;
        },
        {
            message: 'This field is required.',
            path: ['limitedPowersRequested'],
        }
    )
    .refine(
        (data) => {
            return data.timePeriodRequested.includes('Limited to a specific time period') ? specifyTimePeriodSchema.safeParse(data.specifyTimePeriod).success : true;
        },
        {
            message: 'This field is required.',
            path: ['specifyTimePeriod'],
        }
    );

export const applicationForAppointmentApplicantInformStepSchema = z
    .object({
        applicantName: requiredStringSchema.min(4, 'Minimum 4 characters required').max(100),
        applicantDob: z
            .union([z.date(), z.string()])
            .nullable()
            .refine((value) => {
                return value !== null;
            }, 'This field is required.'),
        applicantPhone: phoneSchema,
        applicantEmail: z.email(),
        applicantAddress: requiredStringSchema,
        applicantRelationshipToWard: requiredStringSchema,
        isApplicantRequiringInterpreter: booleanAnswer,
        applicantSpeakLanguage: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data?.isApplicantRequiringInterpreter) {
                return requiredStringSchema.safeParse(data.applicantSpeakLanguage).success;
            }

            return true;
        },
        {
            message: 'This field is required.',
            path: ['applicantSpeakLanguage'],
        }
    );

export const convictionSchema = z.object({
    convictionName: requiredStringSchema,
    convictionDate: z
        .union([z.date(), z.string()])
        .nullable()
        .refine((value) => {
            return value !== null;
        }, 'This field is required.'),
    convictionPlace: requiredStringSchema,
});

export const convictionOptionalSchema = z.object({
    convictionName: z.string().optional(),
    convictionDate: z.union([z.date(), z.string()]).nullable().optional(),
    convictionPlace: z.string().optional(),
});

export const applicationForAppointmentLegalDeclarationsStepSchema = z
    .object({
        isApplicantHasBeenChargedWithViolence: booleanAnswer,
        conviction: convictionOptionalSchema,
        isGuardianHasBeenNominatedInWriting: booleanAnswer,
        nominatedPersonName: z.string().optional(),
        isNominatedPersonContactInfoListedOnForm15: z.boolean().nullable().optional(),
        isGuardianNominatedDocumentAttached: z.boolean().nullable().optional(),
        isNotAdmin: z.boolean().nullable().optional(),
        isApplicantAgreed: z.boolean().refine((value) => {
            return value;
        }, 'This field is required.'),
    })
    .refine(
        (data) => {
            if (data?.isGuardianHasBeenNominatedInWriting) {
                return requiredStringSchema.safeParse(data.nominatedPersonName).success;
            }

            return true;
        },
        {
            message: 'This field is required.',
            path: ['nominatedPersonName'],
        }
    )
    .refine(
        (data) => {
            if (data?.isApplicantHasBeenChargedWithViolence) {
                return convictionSchema.safeParse(data.conviction).success;
            }

            return true;
        },
        {
            message: 'This field is required.',
            path: ['conviction'],
        }
    );
