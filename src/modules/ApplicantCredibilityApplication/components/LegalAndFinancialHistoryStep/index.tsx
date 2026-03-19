import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { useStore } from '@tanstack/react-form';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { useApplicantCredibilityApplicationFormContext, useApplicantCredibilityApplicationFormStepForm } from '../../context/ApplicantCredibilityApplicationFormContext';
import s from './styles.module.css';

const YES_FIELDS = ['isApplicantEverFiledBankruptcy', 'isApplicantEverBeenGarnished', 'isApplicantEverBeenInReceivership', 'isApplicantEverBeenConvictedFelony', 'isApplicantHadExperienceHandlingInvestments'] as const;

const LegalAndFinancialHistoryStep: React.FC = () => {
    const { form, isLoading } = useApplicantCredibilityApplicationFormStepForm('legalAndFinancialHistoryStep');
    const { goToPreviousStep, toggleIsSuccessful } = useApplicantCredibilityApplicationFormContext();

    const isSomeValuesChecked = useStore(form.store, (state) => {
        return YES_FIELDS.some((field) => {
            return state.values[field] === true;
        });
    });

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

                toggleIsSuccessful(true);
            }}
        >
            <div className={s['scroll-container-wrapper']}>
                <div className={s.inputs}>
                    <form.Field
                        name="isApplicantEverFiledBankruptcy"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper className={s['field-wrap']} name="isApplicantEverFiledBankruptcy" label={<>Has applicant ever filed bankruptcy?</>} errorMessage={errorMessage}>
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

                    <form.Field
                        name="isApplicantEverBeenGarnished"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper className={s['field-wrap']} name="isApplicantEverBeenGarnished" label={<>Has applicant ever been garnished?</>} errorMessage={errorMessage}>
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

                    <form.Field
                        name="isApplicantEverBeenInReceivership"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper className={s['field-wrap']} name="isApplicantEverBeenInReceivership" label={<>Has applicant ever been in receivership?</>} errorMessage={errorMessage}>
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

                    <form.Field
                        name="isApplicantEverBeenConvictedFelony"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper className={s['field-wrap']} name="isApplicantEverBeenConvictedFelony" label={<>Has applicant ever been convicted of a felony?</>} errorMessage={errorMessage}>
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

                    <form.Field
                        name="isApplicantHadExperienceHandlingInvestments"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper className={s['field-wrap']} name="isApplicantHadExperienceHandlingInvestments" label={<>Has applicant had experience handling investments in marketable securities?</>} errorMessage={errorMessage}>
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
                        name="explanation"
                        children={(field) => {
                            if (!isSomeValuesChecked) return null;

                            return (
                                <FormFieldLabelErrorWrapper className={s['field-wrap']} name="explanation" label={<>Explanation of any item checked "Yes" above</>}>
                                    <field.TextAreaField name="explanation" placeholder="Please explain in detail" />
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

                        return [canSubmit, isValid, state.isSubmitting];
                    }}
                    children={([canSubmit, isValid, isSubmitting]) => {
                        return (
                            <Button variant="primary" type="submit" size="big" disabled={!canSubmit || !isValid}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        );
                    }}
                />
            </div>
        </form>
    );
};

export default LegalAndFinancialHistoryStep;
