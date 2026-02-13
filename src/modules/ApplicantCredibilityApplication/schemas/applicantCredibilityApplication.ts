import { booleanAnswer, requiredStringSchema, zipCodeSchema } from '@/schemas/formSchemas';
import { addMinutes, isWithinInterval } from 'date-fns';
import { z } from 'zod';

export const applicantCredibilityApplicationCaseDetailsStepSchema = z.object({
    guardianName: requiredStringSchema,
    caseNumber: requiredStringSchema,
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
    from: z
        .union([z.date(), z.string()])
        .nullable()
        .refine(() => {
            return true;
        }),
    to: z.union([z.date(), z.string()]).nullable(),
});

export const applicantCredibilityApplicationApplicantInformStepSchema = z.object({
    applicantName: requiredStringSchema,
    dob: z
        .union([z.date(), z.string()])
        .nullable()
        .refine((value) => {
            return value !== null;
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
                    return value !== null;
                }, 'This field is required.'),
            isSameAddressLast5Years: booleanAnswer,
            previousAddresses: z.array(previousAddressOptionalSchema).optional(),
        })
        .refine(
            (data) => {
                return data?.isSameAddressLast5Years === false
                    ? z
                          .array(previousAddressSchema)
                          .min(1, 'This field is required.')
                          .superRefine((intervals, ctx) => {
                              const sorted = [...intervals, { from: data.from as Date, to: addMinutes(new Date(data.from as Date), 1) }].sort((a, b) => {
                                  return new Date(a.from).getTime() - new Date(b.from).getTime();
                              });

                              for (let i = 0; i < sorted.length - 1; i++) {
                                  const current = sorted[i];
                                  const next = sorted?.[i + 1];

                                  if (
                                      isWithinInterval(next?.from, {
                                          start: current.from,
                                          end: current.to,
                                      }) ||
                                      isWithinInterval(next?.to, {
                                          start: current.from,
                                          end: current.to,
                                      })
                                  ) {
                                      ctx.addIssue({
                                          code: z.ZodIssueCode.custom,
                                          message: 'Date intervals must not overlap',
                                          path: [i],
                                      });

                                      ctx.addIssue({
                                          code: z.ZodIssueCode.custom,
                                          message: 'Date intervals must not overlap',
                                          path: [i + 1],
                                      });
                                  }
                              }
                          })
                          .safeParse(data.previousAddresses).success
                    : true;
            },
            {
                message: 'This field is required.',
                path: ['previousAddresses.address'],
            }
        ),
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
            .refine(
                (data) => {
                    return data?.isSameEmployerLast5Years === false
                        ? z
                              .array(previousEmployerSchema)
                              .min(1, 'This field is required.')
                              .superRefine((intervals, ctx) => {
                                  const sorted = [...intervals, { from: data.from as Date, to: addMinutes(new Date(data.from as Date), 1) }].sort((a, b) => {
                                      return new Date(a.from).getTime() - new Date(b.from).getTime();
                                  });

                                  for (let i = 0; i < sorted.length - 1; i++) {
                                      const current = sorted[i];
                                      const next = sorted?.[i + 1];

                                      if (
                                          isWithinInterval(next?.from, {
                                              start: current.from,
                                              end: current.to,
                                          }) ||
                                          isWithinInterval(next?.to, {
                                              start: current.from,
                                              end: current.to,
                                          })
                                      ) {
                                          ctx.addIssue({
                                              code: z.ZodIssueCode.custom,
                                              message: 'Date intervals must not overlap',
                                              path: [i],
                                          });

                                          ctx.addIssue({
                                              code: z.ZodIssueCode.custom,
                                              message: 'Date intervals must not overlap',
                                              path: [i + 1],
                                          });
                                      }
                                  }
                              })
                              .safeParse(data.previousEmployers).success
                        : true;
                },
                {
                    message: 'This field is required.',
                    path: ['previousEmployers'],
                }
            ),
    })
    .refine(
        (data) => {
            return data.isMarried
                ? z
                      .object({
                          spouseName: requiredStringSchema,
                          yearMarried: requiredStringSchema,
                          spouseStreetAddress: requiredStringSchema,
                          city: requiredStringSchema,
                          state: requiredStringSchema,
                          zip: zipCodeSchema,
                      })
                      .safeParse(data.marriage).success
                : true;
        },
        {
            message: 'This field is required.',
            path: ['marriage'],
        }
    );

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
