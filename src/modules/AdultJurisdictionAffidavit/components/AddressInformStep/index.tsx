import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { useStore } from '@tanstack/react-form';
import { addDays, differenceInYears, subDays } from 'date-fns';
import { checkIfDateRangesOverlap } from '@/lib/utils/checkIfDateRangesOverlap';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import { parseDate } from '@/lib/utils/parseDate';
import { getMaxDate } from '@/lib/utils/parseDatePickerValue';
import FormFieldWrapper from '@/components/Forms/components/FormFieldWrapper';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import DatePicker from '@/components/ui/DatePicker';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { Typography } from '@/components/ui/Typography';
import { useAdultJurisdictionAffidavitFormContext, useAdultJurisdictionAffidavitFormStepForm } from '../../context/AdultJurisdictionAffidavitFormContext';
import s from './styles.module.css';

const AddressInformStep: React.FC = () => {
    const { form, isLoading } = useAdultJurisdictionAffidavitFormStepForm('addressInformStep');
    const { goToPreviousStep } = useAdultJurisdictionAffidavitFormContext();

    const rootFromToRange = useStore(form.store, (state) => {
        return {
            from: state.values.from ? parseDate(state.values.from) : null,
            to: state.values.to ? parseDate(state.values.to) : null,
            index: -1,
        };
    });

    const previousAddresses = useStore(form.store, (state) => {
        return (state.values.previousAddresses || []).map((address, index) => {
            return {
                ...address,
                index,
            };
        });
    });

    const overlappingAddressesIndexes = React.useMemo(() => {
        return checkIfDateRangesOverlap([rootFromToRange, ...previousAddresses]);
    }, [previousAddresses, rootFromToRange]);

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
                                {({ maxDate }) => {
                                    return (
                                        <form.AppField
                                            name="from"
                                            validators={{
                                                onChangeListenTo: ['to'],
                                            }}
                                            children={(field) => {
                                                const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                                return (
                                                    <FormFieldWrapper name="from" label={<>From</>}>
                                                        <DatePicker
                                                            value={parseDate(field.state.value)}
                                                            placeholder="MM / DD / YYYY"
                                                            errorMessage={errorMessage}
                                                            maxDate={maxDate || new Date()}
                                                            onChange={(date) => {
                                                                field.handleChange(date as Date);
                                                                form.validateAllFields('change');
                                                            }}
                                                        />
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
                                {({ minDate }) => {
                                    return (
                                        <form.AppField
                                            name="to"
                                            validators={{
                                                onChangeListenTo: ['from'],
                                            }}
                                            children={(field) => {
                                                const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                                return (
                                                    <FormFieldWrapper name="to" label={<>To</>}>
                                                        <DatePicker
                                                            value={parseDate(field.state.value)}
                                                            placeholder="MM / DD / YYYY"
                                                            errorMessage={errorMessage}
                                                            maxDate={new Date()}
                                                            onChange={(date) => {
                                                                field.handleChange(date as Date);
                                                                form.validateAllFields('change');
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
                        <form.Subscribe
                            selector={(state) => {
                                const from = state.values.from ? parseDate(state.values.from) : '';
                                const to = state.values.to ? parseDate(state.values.to) : '';

                                let isSameAddressLast2Years: boolean | undefined;

                                if (from && to) {
                                    const years = differenceInYears(to, from);
                                    isSameAddressLast2Years = years >= 2;
                                }

                                if (isSameAddressLast2Years) {
                                    form.setFieldValue('previousAddresses', [
                                        {
                                            from: '',
                                            to: '',
                                            withWhom: '',
                                            address: '',
                                        },
                                    ]);
                                }

                                return { isSameAddressLast2Years };
                            }}
                        >
                            {({ isSameAddressLast2Years }) => {
                                return (
                                    <form.Field
                                        name="isSameAddressLast2Years"
                                        children={(field) => {
                                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                            if (isSameAddressLast2Years !== undefined && field.state.value !== isSameAddressLast2Years) {
                                                field.handleChange(isSameAddressLast2Years);
                                                form.validateAllFields('change');
                                            }

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
                                );
                            }}
                        </form.Subscribe>
                    </div>

                    <form.Field
                        name="isSameAddressLast2Years"
                        children={(field) => {
                            return field.state.value === false ? (
                                <form.Field
                                    name="previousAddresses"
                                    mode="array"
                                    children={(field) => {
                                        const errorMessage = getFieldErrorMessage(field.state.meta.errors);
                                        return (
                                            <>
                                                {field.state?.value?.map((_, index) => {
                                                    return (
                                                        <form.Field
                                                            name={`previousAddresses[${index}]`}
                                                            key={`previous-addresses-${index}`}
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
                                                                        <form.AppField
                                                                            name={`previousAddresses[${index}].withWhom`}
                                                                            children={(field) => {
                                                                                return <field.InputField name={`previousAddresses[${index}].withWhom`} label={<>With whom did you live?</>} placeholder="Spouse and one child" onBlur={field.handleBlur} />;
                                                                            }}
                                                                        />

                                                                        <div className={s['inputs-wrapper']}>
                                                                            <form.Subscribe
                                                                                selector={(state) => {
                                                                                    const findTo = state.values.previousAddresses?.[index].to;
                                                                                    const findPrevFrom = index === 0 ? state.values.from : state.values.previousAddresses?.[index - 1].from;
                                                                                    const findPrevTo = state.values.previousAddresses?.[index + 1]?.to;
                                                                                    const to = findTo ? parseDate(findTo) : null;
                                                                                    const prevTo = findPrevTo ? parseDate(findPrevTo) : null;
                                                                                    const prevFrom = findPrevFrom ? parseDate(findPrevFrom) : null;

                                                                                    const isOverlapping = overlappingAddressesIndexes.includes(index);
                                                                                    return {
                                                                                        maxDate: getMaxDate(to, prevFrom),
                                                                                        minDate: prevTo ? subDays(new Date(prevTo), 1) : prevTo,
                                                                                        isOverlapping,
                                                                                    };
                                                                                }}
                                                                            >
                                                                                {({ maxDate, minDate, isOverlapping }) => {
                                                                                    return (
                                                                                        <form.AppField
                                                                                            name={`previousAddresses[${index}].from`}
                                                                                            children={(field) => {
                                                                                                const errorMessage = isOverlapping ? 'Date intervals must not overlap' : getFieldErrorMessage(field.state.meta.errors);

                                                                                                return (
                                                                                                    <FormFieldWrapper name={`previousAddresses[${index}].from`} label={<>From</>} errorMessage={errorMessage}>
                                                                                                        <DatePicker
                                                                                                            minDate={minDate}
                                                                                                            maxDate={maxDate}
                                                                                                            value={parseDate(field.state.value)}
                                                                                                            onChange={(date) => {
                                                                                                                field.handleChange(date as Date);
                                                                                                                form.validateAllFields('change');
                                                                                                            }}
                                                                                                            placeholder="MM / DD / YYYY"
                                                                                                            errorMessage={errorMessage}
                                                                                                        />
                                                                                                    </FormFieldWrapper>
                                                                                                );
                                                                                            }}
                                                                                        />
                                                                                    );
                                                                                }}
                                                                            </form.Subscribe>
                                                                            <form.Subscribe
                                                                                selector={(state) => {
                                                                                    const findFrom = state.values.previousAddresses?.[index].from;
                                                                                    const from = findFrom ? parseDate(findFrom) : null;
                                                                                    const findPrevFrom = index === 0 ? state.values.from : state.values.previousAddresses?.[index - 1].from;
                                                                                    const prevFrom = findPrevFrom ? parseDate(findPrevFrom) : null;
                                                                                    const isOverlapping = overlappingAddressesIndexes.includes(index);

                                                                                    return {
                                                                                        minDate: from ? addDays(new Date(from), 1) : from,
                                                                                        maxDate: prevFrom ? subDays(new Date(prevFrom), 1) : prevFrom,

                                                                                        isOverlapping,
                                                                                    };
                                                                                }}
                                                                            >
                                                                                {({ minDate, maxDate, isOverlapping }) => {
                                                                                    return (
                                                                                        <form.AppField
                                                                                            name={`previousAddresses[${index}].to`}
                                                                                            children={(field) => {
                                                                                                const errorMessage = isOverlapping ? 'Date intervals must not overlap' : getFieldErrorMessage(field.state.meta.errors);

                                                                                                return (
                                                                                                    <FormFieldWrapper name={`previousAddresses[${index}].to`} label={<>To</>} errorMessage={errorMessage}>
                                                                                                        <DatePicker
                                                                                                            minDate={minDate}
                                                                                                            maxDate={maxDate}
                                                                                                            value={parseDate(field.state.value)}
                                                                                                            onChange={(date) => {
                                                                                                                field.handleChange(date as Date);
                                                                                                                form.validateAllFields('change');
                                                                                                            }}
                                                                                                            placeholder="MM / DD / YYYY"
                                                                                                            errorMessage={errorMessage}
                                                                                                        />
                                                                                                    </FormFieldWrapper>
                                                                                                );
                                                                                            }}
                                                                                        />
                                                                                    );
                                                                                }}
                                                                            </form.Subscribe>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }}
                                                        />
                                                    );
                                                })}
                                                {errorMessage && (
                                                    <Typography variant="body-s" className={s.error}>
                                                        {errorMessage}
                                                    </Typography>
                                                )}
                                                <Button
                                                    variant="secondary"
                                                    size="small"
                                                    onClick={() => {
                                                        field.pushValue({
                                                            withWhom: '',
                                                            address: '',
                                                            from: '',
                                                            to: '',
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
