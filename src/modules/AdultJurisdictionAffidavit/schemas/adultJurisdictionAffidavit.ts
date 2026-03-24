import { generateRequiredStringWithLimitsSchema, requiredStringSchema } from '@/schemas/formSchemas';
import { isWithinInterval } from 'date-fns';
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
        withWhom: generateRequiredStringWithLimitsSchema(4, 100),
        isSameAddressLast2Years: booleanAnswer,
        previousAddresses: z.array(previousAddressOptionalSchema).optional(),
    })
    .refine(
        (data) => {
            return data?.isSameAddressLast2Years === false
                ? z
                      .array(previousAddressSchema)
                      .min(1, 'This field is required.')
                      .superRefine((intervals, ctx) => {
                          const sorted = [...intervals, { from: data.from, to: data.to }].sort((a, b) => {
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
