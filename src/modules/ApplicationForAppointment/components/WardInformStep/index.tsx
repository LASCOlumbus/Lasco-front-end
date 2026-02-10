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
import { Typography } from '@/components/ui/Typography';
import {
    useApplicationForAppointmentFormContext,
    useApplicationForAppointmentFormStepForm,
} from '../../context/ApplicationForAppointmentFormContext';
import s from './styles.module.css';

const WardInformStep: React.FC = () => {
    const { form, isLoading } = useApplicationForAppointmentFormStepForm('wardInformStep');
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
                <div className={s['content-description']}>
                    <Typography variant="body-m">
                        Applicant represents to the court that Prospective Ward resides or has a legal settlement in
                        Franklin County, Ohio and that the prospective ward is incompetent by reason of R.C. 2111.01
                        (D).
                    </Typography>
                </div>
                <div className={s.inputs}>
                    <div className={s['inputs-wrapper']}>
                        <form.AppField
                            name="wardName"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="wardName"
                                        label={<>Full name of prospective ward</>}
                                        placeholder="Type full legal name"
                                        onBlur={field.handleBlur}
                                    />
                                );
                            }}
                        />
                        <form.AppField
                            name="wardDob"
                            children={(f) => {
                                return (
                                    <FormFieldWrapper name="wardDob" label={<>Prospective ward date of birth</>}>
                                        <DatePicker
                                            value={parseDate(f.state.value)}
                                            onChange={f.handleChange}
                                            placeholder="MM / DD / YYYY"
                                        />
                                    </FormFieldWrapper>
                                );
                            }}
                        />
                    </div>

                    <form.AppField
                        name="wardAddress"
                        children={(field) => {
                            return (
                                <field.InputField
                                    name="wardAddress"
                                    label={<>Current address of prospective ward </>}
                                    placeholder="Type street, city, state"
                                    onBlur={field.handleBlur}
                                />
                            );
                        }}
                    />

                    <form.AppField
                        name="explanationNeedsOfGuardian"
                        children={(field) => {
                            return (
                                <FormFieldLabelErrorWrapper
                                    className={s['field-wrap']}
                                    name="explanationNeedsOfGuardian"
                                    label={<>Describe why the prospective ward needs a guardian</>}
                                >
                                    <field.TextAreaField
                                        name="explanation"
                                        placeholder="Please explain the prospective ward’s condition or circumstances"
                                    />
                                </FormFieldLabelErrorWrapper>
                            );
                        }}
                    />

                    <form.AppField
                        name="isWardNeedsInterpreterForEnglish"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper
                                    className={s['field-wrap']}
                                    name="isWardNeedsInterpreterForEnglish"
                                    label={<>Does the prospective ward require an interpreter to understand english?</>}
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
                        name="isWardNeedsInterpreterForEnglish"
                        children={(field) => {
                            if (!field.state.value) return null;
                            return (
                                <form.AppField
                                    name="wardSpeakLanguage"
                                    children={(field) => {
                                        return (
                                            <field.SelectField
                                                name="wardSpeakLanguage"
                                                type="single"
                                                label={<>What language does prospective ward speak ?</>}
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

                    <form.AppField
                        name="wardPrescriptions"
                        children={(field) => {
                            return (
                                <FormFieldLabelErrorWrapper
                                    className={s['field-wrap']}
                                    name="wardPrescriptions"
                                    label={
                                        <>List the prospective ward’s prescription and over-the-counter medications</>
                                    }
                                >
                                    <field.TextAreaField name="explanation" placeholder="List medications" />
                                </FormFieldLabelErrorWrapper>
                            );
                        }}
                    />

                    <form.AppField
                        name="isWardHasMilitaryService"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper
                                    className={s['field-wrap']}
                                    name="isWardHasMilitaryService"
                                    label={<>Has the prospective ward had military service?</>}
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
                        name="isWardHasMilitaryService"
                        children={(field) => {
                            if (!field.state.value) return null;
                            return (
                                <>
                                    <div className={s['inputs-wrapper']}>
                                        <form.AppField
                                            name="militaryService.militaryId"
                                            children={(field) => {
                                                return (
                                                    <field.InputField
                                                        name="militaryService.militaryId"
                                                        label={<>Military ID of prospective ward </>}
                                                        placeholder="Type military ID"
                                                        onBlur={field.handleBlur}
                                                    />
                                                );
                                            }}
                                        />
                                        <form.AppField
                                            name="militaryService.branchService"
                                            children={(field) => {
                                                return (
                                                    <field.InputField
                                                        name="militaryService.branchService"
                                                        label={<>Branch of service</>}
                                                        placeholder="Type branch of service"
                                                        onBlur={field.handleBlur}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className={s['inputs-wrapper']}>
                                        <form.AppField
                                            name="militaryService.startDateOfService"
                                            children={(f) => {
                                                return (
                                                    <FormFieldWrapper
                                                        name="militaryService.startDateOfService"
                                                        label={<>Start dates of service</>}
                                                    >
                                                        <DatePicker
                                                            value={parseDate(f.state.value)}
                                                            onChange={f.handleChange}
                                                            placeholder="MM / DD / YYYY"
                                                        />
                                                    </FormFieldWrapper>
                                                );
                                            }}
                                        />
                                        <form.AppField
                                            name="militaryService.endDateOfService"
                                            children={(f) => {
                                                return (
                                                    <FormFieldWrapper
                                                        name="militaryService.endDateOfService"
                                                        label={<>End dates of service</>}
                                                    >
                                                        <DatePicker
                                                            value={parseDate(f.state.value)}
                                                            onChange={f.handleChange}
                                                            placeholder="MM / DD / YYYY"
                                                        />
                                                    </FormFieldWrapper>
                                                );
                                            }}
                                        />
                                    </div>
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

export default WardInformStep;
