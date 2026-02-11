import React from 'react';
import { CheckboxGroup } from '@base-ui/react/checkbox-group';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { CheckboxGroupItem } from '@/components/ui/CheckboxGroupItem';
import { useApplicantCredibilityApplicationFormContext, useApplicantCredibilityApplicationFormStepForm } from '../../context/ApplicantCredibilityApplicationFormContext';
import s from './styles.module.css';

const BankingInformStep: React.FC = () => {
    const { form, isLoading } = useApplicantCredibilityApplicationFormStepForm('bankingInformStep');
    const { goToPreviousStep } = useApplicantCredibilityApplicationFormContext();

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
                    <form.AppField
                        name="bankName"
                        children={(field) => {
                            return <field.InputField name="bankName" label={<>Applicant&apos;s bank name</>} placeholder="Type bank name" onBlur={field.handleBlur} />;
                        }}
                    />

                    <form.Field
                        name="accountType"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper className={s['field-wrap']} name="accountType" label={<>Account type</>} errorMessage={errorMessage}>
                                    <CheckboxGroup className={s['checkbox-group']} value={field.state.value} onValueChange={field.handleChange}>
                                        <CheckboxGroupItem label="Checking" value="checking" />
                                        <CheckboxGroupItem label="Savings" value="savings" />
                                        <CheckboxGroupItem label="Safe deposit box" value="safe_deposit_box" />
                                    </CheckboxGroup>
                                </FormFieldLabelErrorWrapper>
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

export default BankingInformStep;
