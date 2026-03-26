import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { useStore } from '@tanstack/react-form';
import { addDays, addMinutes, subDays } from 'date-fns';
import { US_STATES_SELECT_OPTIONS } from '@/lib/constants';
import { checkIfDateRangesOverlap } from '@/lib/utils/checkIfDateRangesOverlap';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import { parseDate } from '@/lib/utils/parseDate';
import FormFieldWrapper from '@/components/Forms/components/FormFieldWrapper';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import DatePicker from '@/components/ui/DatePicker';
import { FieldSetCard, FieldSetCardHeader } from '@/components/ui/FieldSetCard';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { Typography } from '@/components/ui/Typography';
import { useApplicantCredibilityApplicationFormContext, useApplicantCredibilityApplicationFormStepForm } from '../../context/ApplicantCredibilityApplicationFormContext';
import s from './styles.module.css';

const ApplicantInformStep: React.FC = () => {
    const { form, isLoading } = useApplicantCredibilityApplicationFormStepForm('applicantInformStep');
    const { goToPreviousStep } = useApplicantCredibilityApplicationFormContext();

    const rootFromToRange = useStore(form.store, (state) => {
        return {
            from: state.values.applicantAddress.from ? parseDate(state.values.applicantAddress.from) : null,
            to: state.values.applicantAddress.from ? parseDate(addMinutes(new Date(state.values.applicantAddress.from), 1)) : null,
            index: -1,
        };
    });

    const previousAddresses = useStore(form.store, (state) => {
        return (state.values.applicantAddress.previousAddresses || []).map((address, index) => {
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

    const renderFormAppFields = (index: number) => {
        return (
            <>
                <form.AppField
                    name={`applicantAddress.previousAddresses[${index}].address`}
                    children={(field) => {
                        return <field.InputField name={`applicantAddress.previousAddresses[${index}].address`} label={<>Previous address</>} placeholder="Type previous address" onBlur={field.handleBlur} />;
                    }}
                />
                <div className={s['inputs-wrapper']}>
                    <form.Subscribe
                        selector={(state) => {
                            const findTo = state.values.applicantAddress.previousAddresses?.[index].to;
                            const findPrevFrom = index === 0 ? state.values.applicantAddress.from : state.values.applicantAddress.previousAddresses?.[index - 1].from;

                            const findPrevTo = state.values.applicantAddress.previousAddresses?.[index + 1]?.to;
                            const to = findTo ? parseDate(findTo) : null;
                            const prevTo = findPrevTo ? parseDate(findPrevTo) : null;
                            const prevFrom = findPrevFrom ? parseDate(findPrevFrom) : null;

                            const isOverlapping = overlappingAddressesIndexes.includes(index);

                            const getMaxDate = () => {
                                if (to) {
                                    return subDays(new Date(to), 1);
                                } else if (prevFrom) {
                                    return prevFrom;
                                } else {
                                    return to;
                                }
                            };
                            return {
                                maxDate: getMaxDate(),
                                minDate: prevTo ? subDays(new Date(prevTo), 1) : prevTo,
                                isOverlapping,
                            };
                        }}
                    >
                        {({ maxDate, minDate, isOverlapping }) => {
                            return (
                                <form.AppField
                                    name={`applicantAddress.previousAddresses[${index}].from`}
                                    validators={{
                                        onChangeListenTo: ['applicantAddress.from', 'applicantAddress.previousAddresses'],
                                    }}
                                    children={(previousAddressFromField) => {
                                        const errorMessage = isOverlapping ? 'Date intervals must not overlap' : getFieldErrorMessage(previousAddressFromField.state.meta.errors);

                                        return (
                                            <FormFieldWrapper name={`applicantAddress.previousAddresses[${index}].from`} label={<>From</>} errorMessage={errorMessage}>
                                                <DatePicker
                                                    minDate={minDate}
                                                    maxDate={maxDate}
                                                    value={parseDate(previousAddressFromField.state.value)}
                                                    onChange={(date) => {
                                                        previousAddressFromField.handleChange(date as Date);
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
                            const findFrom = state.values.applicantAddress.previousAddresses?.[index].from;
                            const findPrevFrom = index === 0 ? state.values.applicantAddress.from : state.values.applicantAddress.previousAddresses?.[index - 1].from;
                            const from = findFrom ? parseDate(findFrom) : null;
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
                                    name={`applicantAddress.previousAddresses[${index}].to`}
                                    children={(previousAddressToField) => {
                                        const errorMessage = isOverlapping ? 'Date intervals must not overlap' : getFieldErrorMessage(previousAddressToField.state.meta.errors);

                                        return (
                                            <FormFieldWrapper name={`applicantAddress.previousAddresses[${index}].to`} label={<>To</>} errorMessage={errorMessage}>
                                                <DatePicker
                                                    minDate={minDate}
                                                    maxDate={maxDate}
                                                    value={previousAddressToField.state.value ? parseDate(previousAddressToField.state.value) : parseDate(maxDate)}
                                                    onChange={(date) => {
                                                        previousAddressToField.handleChange(date as Date);
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
                <Alert>Please list any addresses where the person lived during the last 5 years</Alert>
            </>
        );
    };

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
                    <div className={s['inputs-wrapper']}>
                        <form.AppField
                            name="applicantName"
                            children={(field) => {
                                return <field.InputField name="applicantName" label={<>Name of applicant to be appointed guardian</>} placeholder="Type applicant’s full name" onBlur={field.handleBlur} />;
                            }}
                        />
                        <form.AppField
                            name="dob"
                            children={(dobField) => {
                                const errorMessage = getFieldErrorMessage(dobField.state.meta.errors);

                                return (
                                    <FormFieldWrapper name="dob" label={<>Date of birth</>}>
                                        <DatePicker
                                            value={parseDate(dobField.state.value)}
                                            placeholder="MM / DD / YYYY"
                                            errorMessage={errorMessage}
                                            onChange={(value) => {
                                                dobField.handleChange(value as Date);
                                            }}
                                        />
                                    </FormFieldWrapper>
                                );
                            }}
                        />
                    </div>
                </div>

                <div className={s.inputs}>
                    <FieldSetCard>
                        <FieldSetCardHeader>
                            <Typography variant="heading-h4" render={<strong />}>
                                Applicant address
                            </Typography>
                        </FieldSetCardHeader>

                        <div className={s['inputs-wrapper']}>
                            <form.AppField
                                name="applicantAddress.streetAddress"
                                children={(field) => {
                                    return <field.InputField name="applicantAddress.streetAddress" label={<>Current street address</>} placeholder="Type your street address" onBlur={field.handleBlur} />;
                                }}
                            />
                            <form.AppField
                                name="applicantAddress.city"
                                children={(field) => {
                                    return <field.InputField name="applicantAddress.city" label={<>City</>} placeholder="Type city" onBlur={field.handleBlur} />;
                                }}
                            />
                        </div>

                        <div className={s['inputs-wrapper']}>
                            <form.AppField
                                name="applicantAddress.state"
                                children={(field) => {
                                    return (
                                        <field.SelectField
                                            name="applicantAddress.state"
                                            type="single"
                                            label={<>State</>}
                                            placeholder="Select state"
                                            isSearchable
                                            options={[
                                                ...US_STATES_SELECT_OPTIONS.map((state) => {
                                                    return {
                                                        label: `${state.value} - ${state.label}`,
                                                        value: state.value,
                                                    };
                                                }),
                                            ]}
                                        />
                                    );
                                }}
                            />
                            <form.AppField
                                name="applicantAddress.zip"
                                children={(field) => {
                                    return <field.InputField name="applicantAddress.zip" label={<>ZIP code...</>} placeholder="Ex. 43215" onBlur={field.handleBlur} />;
                                }}
                            />
                        </div>

                        <form.AppField
                            name="applicantAddress.from"
                            children={(fromField) => {
                                const errorMessage = getFieldErrorMessage(fromField.state.meta.errors);

                                return (
                                    <FormFieldWrapper name="applicantAddress.from" label={<>From</>}>
                                        <DatePicker
                                            value={parseDate(fromField.state.value)}
                                            placeholder="MM / DD / YYYY"
                                            errorMessage={errorMessage}
                                            onChange={(value) => {
                                                fromField.handleChange(value as Date);
                                            }}
                                        />
                                    </FormFieldWrapper>
                                );
                            }}
                        />

                        <form.Field
                            name="applicantAddress.isSameAddressLast5Years"
                            children={(field) => {
                                const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                return (
                                    <FormFieldLabelErrorWrapper className={s['field-wrap']} name="applicantAddress.isSameAddressLast5Years" label={<>Have you lived at this address for the last 5 years?</>} errorMessage={errorMessage}>
                                        <RadioGroup
                                            className={s['checkbox-group']}
                                            value={field.state.value}
                                            onValueChange={(value) => {
                                                if (value) {
                                                    form.setFieldValue('applicantAddress.previousAddresses', [{ address: '', from: null, to: null }]);
                                                }

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
                    </FieldSetCard>

                    <form.Field
                        name="applicantAddress.isSameAddressLast5Years"
                        children={(field) => {
                            return field.state.value === false ? (
                                <form.Field
                                    name="applicantAddress.previousAddresses"
                                    children={(field) => {
                                        return (
                                            <>
                                                {field.state?.value?.map((_, index) => {
                                                    return (
                                                        <form.Field
                                                            mode="array"
                                                            name={`applicantAddress.previousAddresses[${index}]`}
                                                            children={(_) => {
                                                                return (
                                                                    <FieldSetCard key={index}>
                                                                        <FieldSetCardHeader>
                                                                            <Typography variant="heading-h4" render={<strong />}>
                                                                                Previous address (within last 5 years)
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
                                                                        </FieldSetCardHeader>
                                                                        {renderFormAppFields(index)}
                                                                    </FieldSetCard>
                                                                );
                                                            }}
                                                        />
                                                    );
                                                })}
                                                <Button
                                                    variant="secondary"
                                                    size="small"
                                                    type="button"
                                                    onClick={() => {
                                                        field.pushValue({ address: '', from: null, to: null });
                                                    }}
                                                >
                                                    Add previous address
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

export default ApplicantInformStep;
