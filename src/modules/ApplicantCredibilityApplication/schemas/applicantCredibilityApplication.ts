import { booleanAnswer, generateRequiredStringWithLimitsSchema, requiredStringSchema, zipCodeSchema } from '@/schemas/formSchemas';
import { addMinutes, isWithinInterval, subYears } from 'date-fns';
import { z } from 'zod';

export const applicantCredibilityApplicationCaseDetailsStepSchema = z.object({
    guardianName: generateRequiredStringWithLimitsSchema(4, 100),
    caseNumber: requiredStringSchema,
    nameOfProspectiveWard: requiredStringSchema,
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
    address: z.preprocess((value) => {
        return value === '' ? undefined : value;
    }, generateRequiredStringWithLimitsSchema(5, 100).optional()),
    from: z
        .union([z.date(), z.string()])
        .nullable()
        .refine(() => {
            return true;
        }),
    to: z.union([z.date(), z.string()]).nullable(),
});

export const applicantCredibilityApplicationApplicantInformStepSchema = z.object({
    applicantName: generateRequiredStringWithLimitsSchema(4, 100),
    dob: z
        .union([z.date(), z.string()])
        .nullable()
        .refine((value) => {
            return !!value;
        }, 'This field is required.'),
    applicantAddress: z
        .object({
            streetAddress: requiredStringSchema,
            city: requiredStringSchema,
            state: requiredStringSchema,
            zip: zipCodeSchema,
            from: z
                .union([z.date(), z.string()])
                .nullable()
                .refine((value) => {
                    return !!value;
                }, 'This field is required.'),
            isSameAddressLast5Years: booleanAnswer,
            previousAddresses: z.array(previousAddressOptionalSchema).optional(),
        })
        .superRefine((data, ctx) => {
            if (data.isSameAddressLast5Years !== false) return;

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

            const rootInterval =
                data.from !== null
                    ? {
                          from: data.from as Date,
                          to: addMinutes(new Date(data.from as Date), 1),
                      }
                    : null;

            const intervals = rootInterval ? [...validIntervals, rootInterval] : validIntervals;

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
                const fiveYearsAgo = subYears(new Date(), 5);

                if (oldestFrom > fiveYearsAgo) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Address history must cover at least 5 years.',
                        path: ['previousAddresses'],
                    });
                }
            }
        }),
});
export const previousEmployerSchema = z.object({
    employer: requiredStringSchema,
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

export const previousEmployerOptionalSchema = z.object({
    employer: z.string().optional(),
    from: z.union([z.date(), z.string()]).nullable(),
    to: z.union([z.date(), z.string()]).nullable(),
});

export const applicantCredibilityApplicationFamilyAndEmploymentStepSchema = z
    .object({
        isMarried: booleanAnswer,

        marriage: z
            .object({
                spouseName: z.string().optional(),
                yearMarried: z.string().optional(),
                spouseStreetAddress: z.string().optional(),
                city: z.string().optional(),
                state: z.string().optional(),
                zip: z.string().optional(),
            })
            .optional(),

        employment: z
            .object({
                currentEmployer: requiredStringSchema,

                from: z
                    .union([z.date(), z.string()])
                    .nullable()
                    .refine((value) => {
                        return value !== null;
                    }, 'This field is required.'),

                isSameEmployerLast5Years: booleanAnswer,

                previousEmployers: z.array(previousEmployerOptionalSchema).optional(),
            })
            .superRefine((data, ctx) => {
                if (data.isSameEmployerLast5Years !== false) return;

                if (!data.previousEmployers || data.previousEmployers.length === 0) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'This field is required.',
                        path: ['previousEmployers'],
                    });
                    return;
                }

                data.previousEmployers.forEach((item, index) => {
                    if (!item.employer) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: 'This field is required.',
                            path: ['previousEmployers', index, 'employer'],
                        });
                    }

                    if (!item.from) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: 'This field is required.',
                            path: ['previousEmployers', index, 'from'],
                        });
                    }

                    if (!item.to) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: 'This field is required.',
                            path: ['previousEmployers', index, 'to'],
                        });
                    }
                });

                const validIntervals = data.previousEmployers
                    .filter((item) => {
                        return item.from && item.to;
                    })
                    .map((item) => {
                        return { ...item };
                    });

                const rootInterval =
                    data.from !== null
                        ? {
                              from: data.from as Date,
                              to: addMinutes(new Date(data.from as Date), 1),
                          }
                        : null;

                const intervals = rootInterval ? [...validIntervals, rootInterval] : validIntervals;

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
                        const currentIndex = data.previousEmployers.findIndex((item) => {
                            return item.from === current.from && item.to === current.to;
                        });

                        const nextIndex = data.previousEmployers.findIndex((item) => {
                            return item.from === next.from && item.to === next.to;
                        });

                        if (currentIndex !== -1) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: 'Date intervals must not overlap',
                                path: ['previousEmployers', currentIndex, 'from'],
                            });
                        }

                        if (nextIndex !== -1) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: 'Date intervals must not overlap',
                                path: ['previousEmployers', nextIndex, 'from'],
                            });
                        }
                    }
                }

                const allFromDates = [
                    data.from,
                    ...data.previousEmployers.map((item) => {
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
                    const fiveYearsAgo = subYears(new Date(), 5);

                    if (oldestFrom > fiveYearsAgo) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: 'Employment history must cover at least 5 years.',
                            path: ['previousEmployers'],
                        });
                    }
                }
            }),
    })
    .superRefine((data, ctx) => {
        // 🔥 MARRIAGE REQUIRED LOGIC
        if (!data.isMarried) return;

        const marriage = data.marriage;

        if (!marriage) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'This field is required.',
                path: ['marriage'],
            });
            return;
        }

        if (!marriage.spouseName) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'This field is required.',
                path: ['marriage', 'spouseName'],
            });
        }

        if (!marriage.yearMarried) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'This field is required.',
                path: ['marriage', 'yearMarried'],
            });
        }

        if (!marriage.spouseStreetAddress) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'This field is required.',
                path: ['marriage', 'spouseStreetAddress'],
            });
        }

        if (!marriage.city) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'This field is required.',
                path: ['marriage', 'city'],
            });
        }

        if (!marriage.state) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'This field is required.',
                path: ['marriage', 'state'],
            });
        }

        if (!marriage.zip) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'This field is required.',
                path: ['marriage', 'zip'],
            });
        }
    });

export const applicantCredibilityApplicationBankingInformStepSchema = z.object({
    bankName: requiredStringSchema,
    accountType: z.array(requiredStringSchema).min(1, 'This field is required.'),
});

export const applicantCredibilityApplicationLegalAndFinancialHistoryStepSchema = z
    .object({
        isApplicantEverFiledBankruptcy: booleanAnswer,
        isApplicantEverBeenGarnished: booleanAnswer,
        isApplicantEverBeenInReceivership: booleanAnswer,
        isApplicantEverBeenConvictedFelony: booleanAnswer,
        isApplicantHadExperienceHandlingInvestments: booleanAnswer,
        explanation: z.string().optional(),
    })
    .refine(
        (data) => {
            if ([data?.isApplicantEverFiledBankruptcy, data?.isApplicantEverBeenGarnished, data?.isApplicantEverBeenInReceivership, data?.isApplicantEverBeenConvictedFelony, data?.isApplicantHadExperienceHandlingInvestments].some(Boolean)) {
                return requiredStringSchema.safeParse(data.explanation).success;
            }

            return true;
        },
        {
            message: 'This field is required.',
            path: ['explanation'],
        }
    );
