import { optionalNumberSchema, positiveNumberSchema, requiredStringSchema } from '@/schemas/formSchemas';
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
export const prospectiveWardsFinancialInfoFormCaseDetailsStepSchema = z.object({
    inTheMatterOfTheGuardianshipOf: requiredStringSchema,
    caseNumber: requiredStringSchema,
});
export const BENEFITS_LABELS = {
    socialSecurity: 'Social security',
    PERS: 'P.E.R.S.',
    VABenefits: 'V.A. benefits',
    railroadRetirement: 'Railroad retirement',
    medicaid: 'Medicaid',
    otherInsuranceBenefits: 'Other insurance benefits',
    otherPension: 'Other pension(s)',
    other: 'Other',
};

export const BENEFIT_KEYS = ['socialSecurity', 'PERS', 'VABenefits', 'railroadRetirement', 'medicaid', 'otherInsuranceBenefits', 'otherPension', 'other'] as const;

export type BenefitKey = (typeof BENEFIT_KEYS)[number];

export const prospectiveWardsFinancialInfoBenefitsStepSchema = z
    .object({
        benefit: z.array(z.enum(BENEFIT_KEYS)).min(1, 'Select at least one benefit'),
        socialSecurity: z
            .object({
                representativePayeeName: z.string(),
                socialSecuritySize: optionalNumberSchema,
            })
            .partial(),
        PERS: z
            .object({
                size: optionalNumberSchema,
            })
            .partial(),
        VABenefits: z
            .object({
                size: optionalNumberSchema,
            })
            .partial(),

        railroadRetirement: z
            .object({
                size: optionalNumberSchema,
            })
            .partial(),

        medicaid: z
            .object({
                isWardMedicaidFacilityResident: z.boolean(),
            })
            .partial(),

        otherInsuranceBenefits: z
            .object({
                description: z.string(),
            })
            .partial(),

        otherPension: z
            .object({
                describeOtherPensionSize: optionalNumberSchema,
                sourceOfOtherPension: z.string(),
            })
            .partial(),
        other: z
            .object({
                description: z.string(),
            })
            .partial(),
    })
    .superRefine((data, ctx) => {
        data.benefit.forEach((key) => {
            const value = data[key as BenefitKey];
            Object.entries(value).forEach(([k, v]) => {
                const isSizeField = k.toLowerCase().includes('size');
                if (((!isSizeField && (v === '' || v === undefined)) || (k.toLowerCase().includes('size') && !positiveNumberSchema.safeParse(v).success)) && k !== 'representativePayeeName') {
                    ctx.addIssue({
                        path: [`${key}.${k}`],
                        message: `This field is required because "${BENEFITS_LABELS[key]}" is selected`,
                        code: 'custom',
                    });
                }
            });
        });
    });

export const financialAccountSchema = z.object({
    institution: requiredStringSchema,
    type: requiredStringSchema,
    estimatedBalance: positiveNumberSchema,
});
export const prospectiveWardsFinancialInfoFinancialAccountStepSchema = z.object({
    accounts: z.array(financialAccountSchema).min(1, 'This field is required.'),
});

export const prospectiveWardsFinancialInfoPropertyStepSchema = z
    .object({
        isProspectiveWardRealEstateOwner: booleanAnswer,
        prospectiveWardReceivesRentalIncome: booleanAnswer,
        realEstateAddress: z.string().optional(),
        rentalIncomeAmount: z.number().optional().nullable(),
    })
    .superRefine((data, ctx) => {
        if (data.isProspectiveWardRealEstateOwner === true) {
            if (!data.realEstateAddress?.trim()) {
                ctx.addIssue({
                    path: ['realEstateAddress'],
                    message: 'This field is required.',
                    code: 'custom',
                });
            }
        }

        if (data.prospectiveWardReceivesRentalIncome) {
            if (!positiveNumberSchema.safeParse(data.rentalIncomeAmount).success) {
                ctx.addIssue({
                    path: ['rentalIncomeAmount'],
                    message: 'This field must be a positive number',
                    code: 'custom',
                });
            }
        }
    });

export const BENEFICIARY_KEYS = ['decedentEstate', 'otherTrust', 'specialNeedsTrust'] as const;
export const BENEFICIARY_LABELS = {
    decedentEstate: 'Decedent’s estate',
    otherTrust: 'Any other trust',
    specialNeedsTrust: 'Special needs trust',
} as const;
export type BeneficiaryKey = (typeof BENEFICIARY_KEYS)[number];

export const prospectiveWardsFinancialInfoAssetsInterestsSchema = z
    .object({
        prospectiveWardBeneficiaryOf: z.array(z.enum(BENEFICIARY_KEYS)),
        identifyingInformation: z.string().optional(),
        sourceOfIncomeOrAsset: z.string().optional(),
        amountOfIncomeOrAsset: z.string().optional().nullable(),
        hasSufficientFundsToPayCourtCosts: z.boolean(),
        doesNotHaveSufficientFundsToPayCourtCosts: z.boolean(),
    })
    .superRefine((data, ctx) => {
        if (data.prospectiveWardBeneficiaryOf.length > 0) {
            if (!data.identifyingInformation || data.identifyingInformation.trim() === '') {
                ctx.addIssue({
                    path: ['identifyingInformation'],
                    message: 'This field is required.',
                    code: 'custom',
                });
            }
        }

        if (!data.hasSufficientFundsToPayCourtCosts && !data.doesNotHaveSufficientFundsToPayCourtCosts) {
            ctx.addIssue({
                path: ['hasSufficientFundsToPayCourtCosts'],
                message: 'Select at least one option.',
                code: 'custom',
            });

            ctx.addIssue({
                path: ['doesNotHaveSufficientFundsToPayCourtCosts'],
                message: 'Select at least one option.',
                code: 'custom',
            });
        }
    });
