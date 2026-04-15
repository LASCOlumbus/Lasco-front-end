import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import clsx from 'clsx';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { Typography } from '@/components/ui/Typography';
import { useAdultGuardianshipFormContext, useAdultGuardianshipFormStepForm } from '../../context/AdultGuardianshipFormContext';
import s from './styles.module.css';

const SafetyServiceStep: React.FC = () => {
    const { form, isLoading } = useAdultGuardianshipFormStepForm('safetyServiceStep');
    const { goToPreviousStep, toggleIsSuccessful } = useAdultGuardianshipFormContext();

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
                <div className={s['content-description']}>
                    <Typography variant="body-m">Answer the required questions to help the court investigator prepare for the visit.</Typography>
                </div>
                <div className={s.inputs}>
                    <form.Field
                        name="isProspectiveWardLeaveDuringDay.answer"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper className={s['field-wrap']} name="isProspectiveWardLeaveDuringDay.answer" label={<>Does the prospective ward leave the above location on a regular basis (school, work, vacation, etc.) during the day?</>} errorMessage={errorMessage}>
                                    <RadioGroup
                                        className={s['checkbox-group']}
                                        value={field.state.value}
                                        onValueChange={(value) => {
                                            field.handleChange(value as boolean);
                                            form.setFieldValue('isProspectiveWardLeaveDuringDay.explanation', '');
                                            form.validateAllFields('change');
                                        }}
                                    >
                                        <RadioGroupItem label="Yes" value={true} />
                                        <RadioGroupItem label="No" value={false} />
                                    </RadioGroup>
                                    {field.state.value && (
                                        <form.AppField
                                            name="isProspectiveWardLeaveDuringDay.explanation"
                                            children={(field) => {
                                                return <field.TextAreaField name="isProspectiveWardLeaveDuringDay.explanation" placeholder="Describe when and where the ward leaves during the day." />;
                                            }}
                                        />
                                    )}
                                </FormFieldLabelErrorWrapper>
                            );
                        }}
                    />
                    <form.Field
                        name="specialCircumstances.answer"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper
                                    name="specialCircumstances.answer"
                                    label={<>Is there a situation or special circumstance of which the investigator should be aware such as weapons in the home, dangerous situations, contagious diseases, etc.?</>}
                                    errorMessage={errorMessage}
                                >
                                    <RadioGroup
                                        className={s['checkbox-group']}
                                        value={field.state.value}
                                        onValueChange={(value) => {
                                            field.handleChange(value as boolean);
                                            form.setFieldValue('specialCircumstances.explanation', '');
                                            form.validateAllFields('change');
                                        }}
                                    >
                                        <RadioGroupItem label="Yes" value={true} />
                                        <RadioGroupItem label="No" value={false} />
                                    </RadioGroup>
                                    {field.state.value && (
                                        <form.AppField
                                            name="specialCircumstances.explanation"
                                            children={(field) => {
                                                return <field.TextAreaField name="specialCircumstances.explanation" placeholder="Describe any safety concerns or special circumstances" />;
                                            }}
                                        />
                                    )}
                                </FormFieldLabelErrorWrapper>
                            );
                        }}
                    />
                    <form.Field
                        name="isProspectiveWardHasCommunicationIssues.answer"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper
                                    name="isProspectiveWardHasCommunicationIssues.answer"
                                    label={<>Does the Prospective Ward speak a foreign language or have any medical issues or other communication issues which would prevent them from communicating with the investigator?</>}
                                    errorMessage={errorMessage}
                                >
                                    <RadioGroup
                                        className={s['checkbox-group']}
                                        value={field.state.value}
                                        onValueChange={(value) => {
                                            field.handleChange(value as boolean);
                                            form.validateAllFields('change');
                                        }}
                                    >
                                        <RadioGroupItem label="Yes" value={true} />
                                        <RadioGroupItem label="No" value={false} />
                                    </RadioGroup>
                                    {field.state.value && (
                                        <form.AppField
                                            name="isProspectiveWardHasCommunicationIssues.explanation"
                                            children={(field) => {
                                                return <field.TextAreaField name="isProspectiveWardHasCommunicationIssues.explanation" placeholder="Provide details about language or medical communication needs." />;
                                            }}
                                        />
                                    )}
                                </FormFieldLabelErrorWrapper>
                            );
                        }}
                    />
                    <Alert className={s.alert}>
                        The hearing will not occur unless the visit is completed at least seven days prior to the scheduled hearing date, unless otherwise approved by the court. If there is a change in the location of the Prospective Ward between the time the application is filed and the hearing
                        date, it is the Applicant&apos;s responsibility to notify the court investigator at{' '}
                        <a className={clsx(s.link, 'focus-primary')} href="tel:+16145256109">
                            (614) 525-6109
                        </a>{' '}
                        or{' '}
                        <a className={clsx(s.link, 'focus-primary')} href="tel:+16145256296">
                            (614) 525-6296
                        </a>
                        .
                    </Alert>
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

export default SafetyServiceStep;
