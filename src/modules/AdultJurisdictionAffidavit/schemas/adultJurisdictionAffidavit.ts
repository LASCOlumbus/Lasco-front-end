import { generateRequiredStringWithLimitsSchema, requiredStringSchema } from '@/schemas/formSchemas';
import { isWithinInterval, subYears } from 'date-fns';
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
    guardianName: generateRequiredStringWithLimitsSchema(4, 100),
    caseNumber: requiredStringSchema,
    applicantName: generateRequiredStringWithLimitsSchema(4, 100),
});

export const previousAddressSchema = z.object({
    address: requiredStringSchema,
    withWhom: requiredStringSchema,
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
    withWhom: z.string(),
    address: z.string(),
    from: z.union([z.date(), z.string()]).nullable(),
    to: z.union([z.date(), z.string()]).nullable(),
});

export const adultJurisdictionAffidavitAddressInformStepSchema = z
    .object({
        currentAddress: generateRequiredStringWithLimitsSchema(5, 100),
        from: z.union([z.date(), z.string()]).refine((value) => {
            return value !== '';
        }, 'This field is required.'),
        to: z.union([z.date(), z.string()]).refine((value) => {
            return value !== '';
        }, 'This field is required.'),
        withWhom: generateRequiredStringWithLimitsSchema(4, 100),
        isSameAddressLast2Years: booleanAnswer,
        previousAddresses: z.array(previousAddressOptionalSchema).optional(),
    })
    .superRefine((data, ctx) => {
        if (data.isSameAddressLast2Years !== false) return;

        if (!data.previousAddresses || data.previousAddresses.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'This field is required.',
                path: ['previousAddresses'],
            });
            return;
        }

        data.previousAddresses.forEach((item, index) => {
            if (!item.address) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'This field is required.',
                    path: ['previousAddresses', index, 'address'],
                });
            }

            if (!item.withWhom) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'This field is required.',
                    path: ['previousAddresses', index, 'withWhom'],
                });
            }

            if (!item.from) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'This field is required.',
                    path: ['previousAddresses', index, 'from'],
                });
            }

            if (!item.to) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'This field is required.',
                    path: ['previousAddresses', index, 'to'],
                });
            }
        });

        const validIntervals = data.previousAddresses
            .filter((item) => {
                return item.from && item.to;
            })
            .map((item) => {
                return {
                    ...item,
                };
            });

        const intervals = [...validIntervals, { from: data.from, to: data.to }];

        const sorted = intervals.sort((a, b) => {
            return new Date(a.from || '').getTime() - new Date(b.from || '').getTime();
        });

        for (let i = 0; i < sorted.length - 1; i++) {
            const current = sorted[i];
            const next = sorted[i + 1];

            if (
                isWithinInterval(new Date(next.from || ''), {
                    start: new Date(current.from || ''),
                    end: new Date(current.to || ''),
                }) ||
                isWithinInterval(new Date(next.to || ''), {
                    start: new Date(current.from || ''),
                    end: new Date(current.to || ''),
                })
            ) {
                const currentIndex = data.previousAddresses.findIndex((item) => {
                    return item.from === current.from && item.to === current.to;
                });

                const nextIndex = data.previousAddresses.findIndex((item) => {
                    return item.from === next.from && item.to === next.to;
                });

                if (currentIndex !== -1) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Date intervals must not overlap',
                        path: ['previousAddresses', currentIndex, 'from'],
                    });
                }

                if (nextIndex !== -1) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Date intervals must not overlap',
                        path: ['previousAddresses', nextIndex, 'from'],
                    });
                }
            }
        }

        const allFromDates = [
            data.from,
            ...data.previousAddresses.map((item) => {
                return item.from;
            }),
        ]
            .filter((date) => {
                return !!date;
            })
            .map((date) => {
                return new Date(date as Date);
            });

        if (allFromDates.length > 0) {
            const oldestFrom = new Date(
                Math.min(
                    ...allFromDates.map((d) => {
                        return d.getTime();
                    })
                )
            );

            const twoYearsAgo = subYears(new Date(), 2);

            if (oldestFrom > twoYearsAgo) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Address history must cover at least 2 years.',
                    path: ['previousAddresses'],
                });
            }
        }
    });

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
