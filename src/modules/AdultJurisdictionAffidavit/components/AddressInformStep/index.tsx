import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import { parseDate } from '@/lib/utils/parseDate';
import FormFieldWrapper from '@/components/Forms/components/FormFieldWrapper';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import DatePicker from '@/components/ui/DatePicker';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { Typography } from '@/components/ui/Typography';
import {
    useAdultJurisdictionAffidavitFormContext,
    useAdultJurisdictionAffidavitFormStepForm,
} from '../../context/AdultJurisdictionAffidavitFormContext';
import s from './styles.module.css';

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
                    <Typography variant="body-m">
                        Affiant, being first duly sworn, states the present address of the alleged incompetent, the
                        names of the person(s) with whom they are living, and any former addresses
                    </Typography>
                </div>

                <div className={s.inputs}>
                    <div className={s['relative-card']}>
                        <form.AppField
                            name="currentAddress"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="currentAddress"
                                        label={<>Current address</>}
                                        placeholder="Type street, city, state"
                                        onBlur={field.handleBlur}
                                    />
                                );
                            }}
                        />

                        <div className={s['inputs-wrapper']}>
                            <form.AppField
                                name="from"
                                children={(field) => {
                                    const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                    return (
                                        <FormFieldWrapper name="from" label={<>From</>}>
                                            <DatePicker
                                                value={parseDate(field.state.value)}
                                                placeholder="MM / DD / YYYY"
                                                errorMessage={errorMessage}
                                                onChange={field.handleChange}
                                            />
                                        </FormFieldWrapper>
                                    );
                                }}
                            />
                            <form.AppField
                                name="to"
                                children={(field) => {
                                    const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                    return (
                                        <FormFieldWrapper name="to" label={<>To</>}>
                                            <DatePicker
                                                value={parseDate(field.state.value)}
                                                placeholder="MM / DD / YYYY"
                                                errorMessage={errorMessage}
                                                onChange={field.handleChange}
                                            />
                                        </FormFieldWrapper>
                                    );
                                }}
                            />
                        </div>

                        <form.AppField
                            name="withWhom"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="withWhom"
                                        label={<>With whom</>}
                                        placeholder="People living at this address"
                                        onBlur={field.handleBlur}
                                    />
                                );
                            }}
                        />

                        <form.Field
                            name="isSameAddressLast2Years"
                            children={(field) => {
                                const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                return (
                                    <FormFieldLabelErrorWrapper
                                        className={s['field-wrap']}
                                        name="isSameAddressLast2Years"
                                        label={<>Have you lived at this address for the last 2 years?</>}
                                        errorMessage={errorMessage}
                                    >
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
                                                            children={(prevAddress) => {
                                                                return (
                                                                    <div className={s['relative-card']} key={index}>
                                                                        <div className={s['relative-card-header']}>
                                                                            <Typography
                                                                                variant="heading-h4"
                                                                                render={<strong />}
                                                                            >
                                                                                Applicant previous address
                                                                            </Typography>

                                                                            {(field.state.value?.length as number) >
                                                                                1 && (
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
                                                                                return (
                                                                                    <field.InputField
                                                                                        name={`previousAddresses[${index}].address`}
                                                                                        label={<>Previous address</>}
                                                                                        placeholder="Type previous address"
                                                                                        onBlur={field.handleBlur}
                                                                                    />
                                                                                );
                                                                            }}
                                                                        />

                                                                        <div className={s['inputs-wrapper']}>
                                                                            <form.AppField
                                                                                name={`previousAddresses[${index}].from`}
                                                                                children={(field) => {
                                                                                    const errorMessage =
                                                                                        getFieldErrorMessage(
                                                                                            field.state.meta.errors
                                                                                        );

                                                                                    return (
                                                                                        <FormFieldWrapper
                                                                                            name={`previousAddresses[${index}].from`}
                                                                                            label={<>From</>}
                                                                                        >
                                                                                            <DatePicker
                                                                                                maxDate={parseDate(
                                                                                                    prevAddress.state
                                                                                                        .value?.to
                                                                                                )}
                                                                                                value={parseDate(
                                                                                                    field.state.value
                                                                                                )}
                                                                                                onChange={
                                                                                                    field.handleChange
                                                                                                }
                                                                                                placeholder="MM / DD / YYYY"
                                                                                                errorMessage={
                                                                                                    errorMessage
                                                                                                }
                                                                                            />
                                                                                        </FormFieldWrapper>
                                                                                    );
                                                                                }}
                                                                            />

                                                                            <form.AppField
                                                                                name={`previousAddresses[${index}].to`}
                                                                                children={(field) => {
                                                                                    const errorMessage =
                                                                                        getFieldErrorMessage(
                                                                                            field.state.meta.errors
                                                                                        );

                                                                                    return (
                                                                                        <FormFieldWrapper
                                                                                            name={`previousAddresses[${index}].to`}
                                                                                            label={<>To</>}
                                                                                        >
                                                                                            <DatePicker
                                                                                                minDate={parseDate(
                                                                                                    prevAddress.state
                                                                                                        .value?.from
                                                                                                )}
                                                                                                value={parseDate(
                                                                                                    field.state.value
                                                                                                )}
                                                                                                onChange={
                                                                                                    field.handleChange
                                                                                                }
                                                                                                placeholder="MM / DD / YYYY"
                                                                                                errorMessage={
                                                                                                    errorMessage
                                                                                                }
                                                                                            />
                                                                                        </FormFieldWrapper>
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
