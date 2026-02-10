import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { LANGUAGES } from '@/lib/constants';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import { parseDate } from '@/lib/utils/parseDate';
import FormFieldWrapper from '@/components/Forms/components/FormFieldWrapper';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import DatePicker from '@/components/ui/DatePicker';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import {
    useApplicationForAppointmentFormContext,
    useApplicationForAppointmentFormStepForm,
} from '../../context/ApplicationForAppointmentFormContext';
import s from './styles.module.css';

const ApplicantInformStep: React.FC = () => {
    const { form, isLoading } = useApplicationForAppointmentFormStepForm('applicantInformStep');
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
                            name="applicantName"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="applicantName"
                                        label={<>Full name of applicant</>}
                                        placeholder="Type full legal name"
                                        onBlur={field.handleBlur}
                                    />
                                );
                            }}
                        />
                        <form.AppField
                            name="applicantDob"
                            children={(dobField) => {
                                const errorMessage = getFieldErrorMessage(dobField.state.meta.errors);

                                return (
                                    <FormFieldWrapper
                                        name="applicantDob"
                                        label={<>Applican date of birth</>}
                                        errorMessage={errorMessage}
                                    >
                                        <DatePicker
                                            value={parseDate(dobField.state.value)}
                                            placeholder="MM / DD / YYYY"
                                            errorMessage={errorMessage}
                                            onChange={dobField.handleChange}
                                        />
                                    </FormFieldWrapper>
                                );
                            }}
                        />
                    </div>

                    <div className={s['inputs-wrapper']}>
                        <form.AppField
                            name="applicantPhone"
                            children={(field) => {
                                return (
                                    <field.PhoneInputField name="applicantPhone" label={<>Applicant phone number</>} />
                                );
                            }}
                        />
                        <form.AppField
                            name="applicantEmail"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="applicantEmail"
                                        label={<>Applicant email address</>}
                                        placeholder="Type applicant email "
                                        onBlur={field.handleBlur}
                                    />
                                );
                            }}
                        />
                    </div>

                    <form.AppField
                        name="applicantAddress"
                        children={(field) => {
                            return (
                                <field.InputField
                                    name="applicantAddress"
                                    label={<>Applicant&apos;s current address</>}
                                    placeholder="Type street, city, state"
                                    onBlur={field.handleBlur}
                                />
                            );
                        }}
                    />

                    <form.AppField
                        name="applicantRelationshipToWard"
                        children={(field) => {
                            return (
                                <field.InputField
                                    name="applicantRelationshipToWard"
                                    label={<>Applicant’s relationship to the prospective ward</>}
                                    placeholder="Example: daughter, brother, niece"
                                    onBlur={field.handleBlur}
                                />
                            );
                        }}
                    />

                    <form.AppField
                        name="isApplicantRequiringInterpreter"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper
                                    className={s['field-wrap']}
                                    name="isApplicantRequiringInterpreter"
                                    label={<>Does the applicant require an interpreter to understand English?</>}
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
                        name="isApplicantRequiringInterpreter"
                        children={(field) => {
                            if (!field.state.value) return null;
                            return (
                                <form.AppField
                                    name="applicantSpeakLanguage"
                                    children={(field) => {
                                        return (
                                            <field.SelectField
                                                name="applicantSpeakLanguage"
                                                type="single"
                                                label={<>What language does applicant speak ?</>}
                                                placeholder="Select language"
                                                isSearchable
                                                options={[
                                                    ...LANGUAGES.map((state) => {
                                                        return {
                                                            label: state.label,
                                                            value: state.value,
                                                        };
                                                    }),
                                                ]}
                                            />
                                        );
                                    }}
                                />
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

export default ApplicantInformStep;
