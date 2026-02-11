import React from 'react';
import { US_STATES_SELECT_OPTIONS } from '@/lib/constants';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useAdultGuardianshipFormContext, useAdultGuardianshipFormStepForm } from '../../context/AdultGuardianshipFormContext';
import s from './styles.module.css';

const WardLocationStep: React.FC = () => {
    const { form, isLoading } = useAdultGuardianshipFormStepForm('wardLocationStep');
    const { goToPreviousStep } = useAdultGuardianshipFormContext();

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
                    <Typography variant="body-m">Enter the physical location of the prospective ward.</Typography>
                </div>
                <div className={s.inputs}>
                    <form.AppField
                        name="streetAddress"
                        children={(field) => {
                            return <field.InputField name="streetAddress" label={<>Street address of prospective ward</>} placeholder="Type street address" onBlur={field.handleBlur} />;
                        }}
                    />
                    <div className={s['inputs-wrapper']}>
                        <form.AppField
                            name="city"
                            children={(field) => {
                                return <field.InputField name="city" label={<>City</>} placeholder="Type city" onBlur={field.handleBlur} />;
                            }}
                        />
                        <form.AppField
                            name="state"
                            children={(field) => {
                                return (
                                    <field.SelectField
                                        name="state"
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
                    </div>
                    <div className={s['inputs-wrapper']}>
                        <form.AppField
                            name="zip"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="zip"
                                        type="number"
                                        label={<>ZIP code</>}
                                        placeholder="Ex. 43215"
                                        numericFormatProps={{
                                            thousandSeparator: false,
                                            allowLeadingZeros: true,
                                            valueIsNumericString: true,
                                        }}
                                        onBlur={field.handleBlur}
                                    />
                                );
                            }}
                        />
                        <form.AppField
                            name="wardPhone"
                            children={(field) => {
                                return <field.PhoneInputField name="wardPhone" label={<>Telephone number of prospective ward</>} />;
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={s.footer}>
                <Button variant="secondary" size="big" onClick={goToPreviousStep} type="button">
                    Back
                </Button>
                <form.Subscribe
                    selector={(state) => {
                        const isValid = state.isFieldsValid && state.isFormValid;
                        const canSubmit = state.isTouched && state.isValid && !state.isPristine && state.canSubmit;

                        return [canSubmit, isValid];
                    }}
                    children={([canSubmit, isValid]) => {
                        return (
                            <Button type="submit" variant="primary" size="big" disabled={!canSubmit || !isValid}>
                                Next step
                            </Button>
                        );
                    }}
                />
            </div>
        </form>
    );
};

export default WardLocationStep;
