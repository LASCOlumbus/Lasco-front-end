import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { addDays, isWithinInterval, subDays } from 'date-fns';
import { z } from 'zod';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import { parseDate } from '@/lib/utils/parseDate';
import { previousAddressSchema } from '@/modules/AdultJurisdictionAffidavit/schemas/adultJurisdictionAffidavit';
import FormFieldWrapper from '@/components/Forms/components/FormFieldWrapper';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import DatePicker from '@/components/ui/DatePicker';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { Typography } from '@/components/ui/Typography';
import { useAdultJurisdictionAffidavitFormContext, useAdultJurisdictionAffidavitFormStepForm } from '../../context/AdultJurisdictionAffidavitFormContext';
import s from './styles.module.css';

const checkOverlappingDates = (dates: unknown[]) => {
    const isOverlapped = z
        .array(previousAddressSchema)
        .min(1, 'This field is required.')
        .superRefine((intervals, ctx) => {
            const sorted = [...intervals].sort((a, b) => {
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
                        path: ['from'],
                    });

                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Date intervals must not overlap',
                        path: ['to'],
                    });
                }
            }
        })
        .safeParse(dates).success;

    return isOverlapped;
};

const AddressInformStep: React.FC = () => {
    const { form, isLoading } = useAdultJurisdictionAffidavitFormStepForm('addressInformStep');
    const { goToPreviousStep } = useAdultJurisdictionAffidavitFormContext();

    if (isLoading) {
        return <ResponsiveLoader />;
    }

    return (
        <form
            className={s.form}
            onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                form.handleSubmit();
            }}
        >
            <div className={s['scroll-container-wrapper']}>
                <div className={s['content-description']}>
                    <Typography variant="body-m">Affiant, being first duly sworn, states the present address of the alleged incompetent, the names of the person(s) with whom they are living, and any former addresses</Typography>
                </div>

                <div className={s.inputs}>
                    <div className={s['relative-card']}>
                        <form.AppField
                            name="currentAddress"
                            children={(field) => {
                                return <field.InputField name="currentAddress" label={<>Current address</>} placeholder="Type street, city, state" onBlur={field.handleBlur} />;
                            }}
                        />

                        <div className={s['inputs-wrapper']}>
                            <form.Subscribe
                                selector={(state) => {
                                    const to = state.values.to ? parseDate(state.values.to) : null;
                                    const dates = [
                                        ...(state.values.previousAddresses || []),
                                        {
                                            to: state.values.to,
                                        },
                                    ];

                                    return { maxDate: to ? subDays(new Date(to), 1) : to, dates };
                                }}
                            >
                                {({ maxDate, dates }) => {
                                    return (
                                        <form.AppField
                                            name="from"
                                            validators={{
                                                onChangeListenTo: ['from'],
                                            }}
                                            children={(field) => {
                                                const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                                return (
                                                    <FormFieldWrapper name="from" label={<>From sdfsdfsdfs</>}>
                                                        <DatePicker
                                                            value={parseDate(field.state.value)}
                                                            placeholder="MM / DD / YYYY"
                                                            errorMessage={errorMessage}
                                                            maxDate={maxDate}
                                                            onChange={(date) => {
                                                                field.handleChange(date as Date);
                                                                checkOverlappingDates(dates);
                                                            }}
                                                        />
                                                        івіаів
                                                    </FormFieldWrapper>
                                                );
                                            }}
                                        />
                                    );
                                }}
                            </form.Subscribe>

                            <form.Subscribe
                                selector={(state) => {
                                    const from = state.values.from ? parseDate(state.values.from) : null;
                                    const dates = [
                                        ...(state.values.previousAddresses || []),
                                        {
                                            address: 'test',
                                            from: state.values.from,
                                            to: state.values.to,
                                        },
                                    ];

                                    return { minDate: from ? addDays(new Date(from), 1) : from, dates };
                                }}
                            >
                                {({ minDate, dates }) => {
                                    return (
                                        <form.AppField
                                            name="to"
                                            validators={{
                                                onChangeListenTo: ['from'],
                                            }}
                                            children={(field) => {
                                                const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                                return (
                                                    <FormFieldWrapper name="to" label={<>To sdfs====</>}>
                                                        <DatePicker
                                                            value={parseDate(field.state.value)}
                                                            placeholder="MM / DD / YYYY"
                                                            errorMessage={errorMessage}
                                                            // onChange={field.handleChange}
                                                            onChange={(date) => {
                                                                field.handleChange(date as Date);
                                                                checkOverlappingDates(dates);
                                                            }}
                                                            minDate={minDate}
                                                        />
                                                    </FormFieldWrapper>
                                                );
                                            }}
                                        />
                                    );
                                }}
                            </form.Subscribe>
                        </div>

                        <form.AppField
                            name="withWhom"
                            children={(field) => {
                                return <field.InputField name="withWhom" label={<>With whom</>} placeholder="People living at this address" onBlur={field.handleBlur} />;
                            }}
                        />

                        <form.Field
                            name="isSameAddressLast2Years"
                            children={(field) => {
                                const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                return (
                                    <FormFieldLabelErrorWrapper className={s['field-wrap']} name="isSameAddressLast2Years" label={<>Have you lived at this address for the last 2 years?</>} errorMessage={errorMessage}>
                                        <RadioGroup
                                            className={s['checkbox-group']}
                                            value={field.state.value}
                                            onValueChange={(value) => {
                                                field.handleChange(value as boolean);
                                            }}
                                        >
                                            <RadioGroupItem label="Yes" value={true} />
                                            <RadioGroupItem label="No" value={false} />
                                        </RadioGroup>
                                    </FormFieldLabelErrorWrapper>
                                );
                            }}
                        />
                    </div>

                    <form.Field
                        name="isSameAddressLast2Years"
                        children={(field) => {
                            return field.state.value === false ? (
                                <form.Field
                                    name="previousAddresses"
                                    mode="array"
                                    children={(field) => {
                                        return (
                                            <>
                                                {field.state?.value?.map((_, index) => {
                                                    return (
                                                        <form.Field
                                                            name={`previousAddresses[${index}]`}
                                                            children={() => {
                                                                return (
                                                                    <div className={s['relative-card']} key={index}>
                                                                        <div className={s['relative-card-header']}>
                                                                            <Typography variant="heading-h4" render={<strong />}>
                                                                                Applicant previous address
                                                                            </Typography>

                                                                            {(field.state.value?.length as number) > 1 && (
                                                                                <Button
                                                                                    variant="secondary"
                                                                                    size="small"
                                                                                    onClick={() => {
                                                                                        field.removeValue(index);
                                                                                    }}
                                                                                >
                                                                                    Remove
                                                                                </Button>
                                                                            )}
                                                                        </div>

                                                                        <form.AppField
                                                                            name={`previousAddresses[${index}].address`}
                                                                            children={(field) => {
                                                                                return <field.InputField name={`previousAddresses[${index}].address`} label={<>Previous address</>} placeholder="Type previous address" onBlur={field.handleBlur} />;
                                                                            }}
                                                                        />

                                                                        <div className={s['inputs-wrapper']}>
                                                                            <form.AppField
                                                                                name={`previousAddresses[${index}].from`}
                                                                                children={(field) => {
                                                                                    const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                                                                    return (
                                                                                        <form.Subscribe
                                                                                            selector={(state) => {
                                                                                                const findTo = state.values.previousAddresses?.[index].to;
                                                                                                const to = findTo ? parseDate(findTo) : null;
                                                                                                const dates = [
                                                                                                    ...(state.values.previousAddresses || []),
                                                                                                    {
                                                                                                        from: state.values.previousAddresses?.[index].from,
                                                                                                        to: state.values.previousAddresses?.[index].to,
                                                                                                    },
                                                                                                ];
                                                                                                return { maxDate: to ? subDays(new Date(to), 1) : to, dates, errorMessage };
                                                                                            }}
                                                                                        >
                                                                                            {({ maxDate, dates }) => {
                                                                                                return (
                                                                                                    <FormFieldWrapper name={`previousAddresses[${index}].from`} label={<>From</>}>
                                                                                                        <DatePicker
                                                                                                            maxDate={maxDate}
                                                                                                            value={parseDate(field.state.value)}
                                                                                                            onChange={(date) => {
                                                                                                                field.handleChange(date as Date);
                                                                                                                checkOverlappingDates(dates);
                                                                                                            }}
                                                                                                            placeholder="MM / DD / YYYY"
                                                                                                            errorMessage={errorMessage}
                                                                                                        />
                                                                                                    </FormFieldWrapper>
                                                                                                );
                                                                                            }}
                                                                                        </form.Subscribe>
                                                                                    );
                                                                                }}
                                                                            />

                                                                            <form.AppField
                                                                                name={`previousAddresses[${index}].to`}
                                                                                children={(field) => {
                                                                                    const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                                                                    return (
                                                                                        <form.Subscribe
                                                                                            selector={(state) => {
                                                                                                const findFrom = state.values.previousAddresses?.[index].from;
                                                                                                const from = findFrom ? parseDate(findFrom) : null;
                                                                                                const dates = [
                                                                                                    ...(state.values.previousAddresses || []),
                                                                                                    {
                                                                                                        from: state.values.previousAddresses?.[index].from,
                                                                                                        to: state.values.previousAddresses?.[index].to,
                                                                                                    },
                                                                                                ];

                                                                                                return { minDate: from ? addDays(new Date(from), 1) : from, dates, errorMessage };
                                                                                            }}
                                                                                        >
                                                                                            {({ minDate, dates }) => {
                                                                                                return (
                                                                                                    <FormFieldWrapper name={`previousAddresses[${index}].to`} label={<>To</>}>
                                                                                                        <DatePicker
                                                                                                            minDate={minDate}
                                                                                                            value={parseDate(field.state.value)}
                                                                                                            onChange={(date) => {
                                                                                                                field.handleChange(date as Date);
                                                                                                                checkOverlappingDates(dates);
                                                                                                            }}
                                                                                                            placeholder="MM / DD / YYYY"
                                                                                                            errorMessage={errorMessage}
                                                                                                        />
                                                                                                    </FormFieldWrapper>
                                                                                                );
                                                                                            }}
                                                                                        </form.Subscribe>
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }}
                                                        />
                                                    );
                                                })}
                                                <Button
                                                    variant="secondary"
                                                    size="small"
                                                    onClick={() => {
                                                        field.pushValue({
                                                            address: '',
                                                            from: null,
                                                            to: null,
                                                        });
                                                    }}
                                                >
                                                    Add another address
                                                </Button>
                                            </>
                                        );
                                    }}
                                />
                            ) : null;
                        }}
                    />
                </div>
            </div>
            <div className={s.footer}>
                <Button variant="secondary" size="big" onClick={goToPreviousStep} type="button">
                    Back
                </Button>
                <form.Subscribe
                    selector={(state) => {
                        const isValid = state.isFieldsValid && state.isFormValid;
                        const canSubmit = state.isValid && !state.isPristine;

                        return [canSubmit, isValid];
                    }}
                    children={([canSubmit, isValid]) => {
                        return (
                            <Button variant="primary" type="submit" size="big" disabled={!canSubmit || !isValid}>
                                Next step
                            </Button>
                        );
                    }}
                />
            </div>
        </form>
    );
};

export default AddressInformStep;
