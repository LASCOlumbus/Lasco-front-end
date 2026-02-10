import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import {
    useApplicationForAppointmentFormContext,
    useApplicationForAppointmentFormStepForm,
} from '../../context/ApplicationForAppointmentFormContext';
import s from './styles.module.css';

const AssetsAndIncomeStep: React.FC = () => {
    const { form, isLoading } = useApplicationForAppointmentFormStepForm('assetsAndIncomeStep');
    const { goToPreviousStep } = useApplicationForAppointmentFormContext();

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
                    <div className={s['inputs-wrapper']}>
                        <form.AppField
                            name="estimatedValuePersonalProperty"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="estimatedValuePersonalProperty"
                                        label={<>Estimated value of personal property</>}
                                        placeholder="$0.0"
                                        onBlur={field.handleBlur}
                                        type="number"
                                        prefix="$"
                                    />
                                );
                            }}
                        />
                        <form.AppField
                            name="estimatedValueRealEstate"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="estimatedValueRealEstate"
                                        label={<>Estimated value of real estate</>}
                                        placeholder="$0.0"
                                        onBlur={field.handleBlur}
                                        type="number"
                                        prefix="$"
                                    />
                                );
                            }}
                        />
                    </div>

                    <div className={s['inputs-wrapper']}>
                        <form.AppField
                            name="annualRentsReceived"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="annualRentsReceived"
                                        label={<>Annual rents received</>}
                                        placeholder="$0.0"
                                        onBlur={field.handleBlur}
                                        type="number"
                                        prefix="$"
                                    />
                                );
                            }}
                        />
                        <form.AppField
                            name="otherAnnualIncome"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="otherAnnualIncome"
                                        label={<>Other annual income</>}
                                        placeholder="$0.0"
                                        onBlur={field.handleBlur}
                                        type="number"
                                        prefix="$"
                                    />
                                );
                            }}
                        />
                    </div>

                    <form.AppField
                        name="bondAmount"
                        children={(field) => {
                            return (
                                <field.InputField
                                    name="bondAmount"
                                    label={<>Bond amount offered by the applicant</>}
                                    placeholder="$0.0"
                                    onBlur={field.handleBlur}
                                    type="number"
                                    prefix="$"
                                />
                            );
                        }}
                    />

                    <form.AppField
                        name="publicPrivateAssistance"
                        children={(field) => {
                            return (
                                <field.InputField
                                    name="publicPrivateAssistance"
                                    label={<>Which public or private assistance does prospective ward receive?</>}
                                    placeholder="List any assistance you received"
                                    onBlur={field.handleBlur}
                                />
                            );
                        }}
                    />

                    <form.AppField
                        name="isWardHasRepresentativePayee"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper
                                    className={s['field-wrap']}
                                    name="isWardHasRepresentativePayee"
                                    label={<>Does the prospective ward have a representative payee?</>}
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

                    <form.AppField
                        name="isWardHasRepresentativePayee"
                        children={(field) => {
                            if (!field.state.value) return null;
                            return (
                                <div className={s['inputs-wrapper']}>
                                    <form.AppField
                                        name="payeeName"
                                        children={(field) => {
                                            return (
                                                <field.InputField
                                                    name="payeeName"
                                                    label={<>Representative payee name</>}
                                                    placeholder="Enter the representative payee’s name"
                                                    onBlur={field.handleBlur}
                                                />
                                            );
                                        }}
                                    />
                                    <form.AppField
                                        name="payeeAddress"
                                        children={(field) => {
                                            return (
                                                <field.InputField
                                                    name="payeeAddress"
                                                    label={<>Representative payee address</>}
                                                    placeholder="Enter the representative payee’s address"
                                                    onBlur={field.handleBlur}
                                                />
                                            );
                                        }}
                                    />
                                </div>
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

export default AssetsAndIncomeStep;
