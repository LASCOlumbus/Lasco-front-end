import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import { parseDate } from '@/lib/utils/parseDate';
import FormFieldWrapper from '@/components/Forms/components/FormFieldWrapper';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import DatePicker from '@/components/ui/DatePicker';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { Typography } from '@/components/ui/Typography';
import { useApplicationForAppointmentFormContext, useApplicationForAppointmentFormStepForm } from '../../context/ApplicationForAppointmentFormContext';
import s from './styles.module.css';

const LegalDeclarationsStep: React.FC = () => {
    const { form, isLoading } = useApplicationForAppointmentFormStepForm('legalDeclarationsStep');
    const { goToPreviousStep, toggleIsSuccessful } = useApplicationForAppointmentFormContext();

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
                    <form.AppField
                        name="isApplicantHasBeenChargedWithViolence"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper
                                    className={s['field-wrap']}
                                    name="isApplicantHasBeenChargedWithViolence"
                                    label={<>Has the applicant been charged with or convicted of a crime involving theft, physical violence, sexual abuse, alcohol abuse, or substance abuse?</>}
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
                        name="isApplicantHasBeenChargedWithViolence"
                        children={(field) => {
                            if (!field.state.value) return null;
                            return (
                                <>
                                    <div className={s['inputs-wrapper']}>
                                        <form.AppField
                                            name="conviction.convictionName"
                                            children={(field) => {
                                                return <field.InputField name="conviction.convictionName" label={<>Charge or conviction</>} placeholder="Type full legal name" onBlur={field.handleBlur} />;
                                            }}
                                        />
                                        <form.AppField
                                            name="conviction.convictionDate"
                                            children={(convictionDateField) => {
                                                const errorMessage = getFieldErrorMessage(convictionDateField.state.meta.errors);

                                                return (
                                                    <FormFieldWrapper name="conviction.convictionDate" label={<>Date of conviction</>}>
                                                        <DatePicker value={parseDate(convictionDateField.state.value)} placeholder="MM / DD / YYYY" errorMessage={errorMessage} onChange={convictionDateField.handleChange} />
                                                    </FormFieldWrapper>
                                                );
                                            }}
                                        />
                                    </div>

                                    <form.AppField
                                        name="conviction.convictionPlace"
                                        children={(field) => {
                                            return <field.InputField name="conviction.convictionPlace" label={<>Place of conviction</>} placeholder="Type conviction place name" onBlur={field.handleBlur} />;
                                        }}
                                    />
                                </>
                            );
                        }}
                    />

                    <form.AppField
                        name="isGuardianHasBeenNominatedInWriting"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper className={s['field-wrap']} name="isGuardianHasBeenNominatedInWriting" label={<>Has a guardian been nominated in writing, in a will or power of attorney?</>} errorMessage={errorMessage}>
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
                        name="isGuardianHasBeenNominatedInWriting"
                        children={(field) => {
                            if (!field.state.value) return null;
                            return (
                                <form.AppField
                                    name="nominatedPersonName"
                                    children={(field) => {
                                        return <field.InputField name="nominatedPersonName" label={<>Name of nominated person</>} placeholder="Type name of nominated person" onBlur={field.handleBlur} />;
                                    }}
                                />
                            );
                        }}
                    />
                </div>
                <div className={s.inputs}>
                    <form.AppField
                        name="isNominatedPersonContactInfoListedOnForm15"
                        children={(field) => {
                            return (
                                <FormFieldWrapper name="isNominatedPersonContactInfoListedOnForm15">
                                    <label className={s['checkbox-input']}>
                                        <Checkbox checked={!!field.state.value} onCheckedChange={field.handleChange} />
                                        <Typography variant="body-s">The nominated person&apos;s contact information is listed on Form 15.0 - Next of Kin.</Typography>
                                    </label>
                                </FormFieldWrapper>
                            );
                        }}
                    />

                    <form.AppField
                        name="isGuardianNominatedDocumentAttached"
                        children={(field) => {
                            return (
                                <FormFieldWrapper name="isGuardianNominatedDocumentAttached">
                                    <label className={s['checkbox-input']}>
                                        <Checkbox checked={!!field.state.value} onCheckedChange={field.handleChange} />
                                        <Typography variant="body-s">A copy of the document which nominates the guardian is attached.</Typography>
                                    </label>
                                </FormFieldWrapper>
                            );
                        }}
                    />

                    <form.AppField
                        name="isNotAdmin"
                        children={(field) => {
                            return (
                                <FormFieldWrapper name="isNotAdmin">
                                    <label className={s['checkbox-input']}>
                                        <Checkbox checked={!!field.state.value} onCheckedChange={field.handleChange} />
                                        <Typography variant="body-s">I am not an administrator, executor, or fiduciary of an estate in which the Prospective Ward is interested.</Typography>
                                    </label>
                                </FormFieldWrapper>
                            );
                        }}
                    />

                    <form.AppField
                        name="isApplicantAgreed"
                        children={(field) => {
                            return (
                                <FormFieldWrapper name="isApplicantAgreed">
                                    <label className={s['checkbox-input']}>
                                        <Checkbox checked={!!field.state.value} onCheckedChange={field.handleChange} />
                                        <Typography variant="body-s">
                                            I (applicant) represents that the address provided below is the Applicant's permanent address and acknowledges the requirement that the Court be notified of any change of address. Removal may result from failure to comply with this requirement.
                                        </Typography>
                                    </label>
                                </FormFieldWrapper>
                            );
                        }}
                    />
                    <Alert>Confirmation of the applicant&apos;s permanent address is required for the court to accept the application.</Alert>
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

export default LegalDeclarationsStep;
