import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import {
    useProspectiveWardsFinancialInfoForm,
    useProspectiveWardsFinancialInfoFormContext,
} from '@/modules/ProspectiveWardsFinancialInfoForm/context/ProspectiveWardsFinancialInfoForm';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import s from './styles.module.css';

const PropertyStep: React.FC = () => {
    const { form, isLoading } = useProspectiveWardsFinancialInfoForm('propertyStep');
    const { goToPreviousStep } = useProspectiveWardsFinancialInfoFormContext();

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
                <div className={s.inputs}>
                    <form.Field
                        name="isProspectiveWardRealEstateOwner"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <>
                                    <FormFieldLabelErrorWrapper
                                        className={s['field-wrap']}
                                        name="isProspectiveWardLeaveDuringDay.answer"
                                        label={<>Does the prospective ward own real estate?</>}
                                        errorMessage={errorMessage}
                                    >
                                        <RadioGroup
                                            className={s['checkbox-group']}
                                            value={field.state.value}
                                            onValueChange={(value) => {
                                                field.handleChange(value as boolean);
                                            }}
                                        >
                                            <RadioGroupItem className={s.radio} label="Yes" value={true} />
                                            <RadioGroupItem className={s.radio} label="No" value={false} />
                                        </RadioGroup>
                                    </FormFieldLabelErrorWrapper>
                                    {field.state.value && (
                                        <form.AppField
                                            name="realEstateAddress"
                                            children={(field) => {
                                                return (
                                                    <field.InputField
                                                        name="realEstateAddress"
                                                        label="Real estate address"
                                                        placeholder="Enter full address"
                                                        onBlur={field.handleBlur}
                                                    />
                                                );
                                            }}
                                        />
                                    )}
                                </>
                            );
                        }}
                    />
                    <form.Field
                        name="prospectiveWardReceivesRentalIncome"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <>
                                    <FormFieldLabelErrorWrapper
                                        className={s['field-wrap']}
                                        name="prospectiveWardReceivesRentalIncome"
                                        label={<>Does the prospective ward receive rental income?</>}
                                        errorMessage={errorMessage}
                                    >
                                        <RadioGroup
                                            className={s['checkbox-group']}
                                            value={field.state.value}
                                            onValueChange={(value) => {
                                                field.handleChange(value as boolean);
                                            }}
                                        >
                                            <RadioGroupItem className={s.radio} label="Yes" value={true} />
                                            <RadioGroupItem className={s.radio} label="No" value={false} />
                                        </RadioGroup>
                                    </FormFieldLabelErrorWrapper>
                                    {field.state.value && (
                                        <form.AppField
                                            name="rentalIncomeAmount"
                                            children={(field) => {
                                                return (
                                                    <field.InputField
                                                        name="rentalIncomeAmount"
                                                        label="Rental income amount (per month)"
                                                        type="number"
                                                        numericFormatProps={{
                                                            prefix: '$',
                                                            thousandSeparator: true,
                                                            allowLeadingZeros: false,
                                                        }}
                                                        placeholder="$0.00"
                                                        onBlur={field.handleBlur}
                                                    />
                                                );
                                            }}
                                        />
                                    )}
                                </>
                            );
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

export default PropertyStep;
