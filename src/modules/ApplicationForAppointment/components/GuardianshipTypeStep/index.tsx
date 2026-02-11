import React from 'react';
import { CheckboxGroup } from '@base-ui/react/checkbox-group';
import { RadioGroup } from '@base-ui/react/radio-group';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import { parseDate } from '@/lib/utils/parseDate';
import FormFieldWrapper from '@/components/Forms/components/FormFieldWrapper';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { CheckboxGroupItem } from '@/components/ui/CheckboxGroupItem';
import DatePicker from '@/components/ui/DatePicker';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { useApplicationForAppointmentFormContext, useApplicationForAppointmentFormStepForm } from '../../context/ApplicationForAppointmentFormContext';
import s from './styles.module.css';

const GuardianshipTypeStep: React.FC = () => {
    const { form, isLoading } = useApplicationForAppointmentFormStepForm('guardianshipTypeStep');
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
                    <form.AppField
                        name="guardianResponsibility"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper className={s['field-wrap']} name="guardianResponsibility" label={<>What should the guardian be responsible for?</>} errorMessage={errorMessage}>
                                    <RadioGroup
                                        className={s['checkbox-column-group']}
                                        value={field.state.value}
                                        onValueChange={(value) => {
                                            field.handleChange(value as string);
                                        }}
                                    >
                                        <RadioGroupItem label="Personal and medical needs" value="Personal and medical needs" />
                                        <RadioGroupItem label="Financial decisions and managing money and property" value="Financial decisions and managing money and property" />
                                    </RadioGroup>
                                </FormFieldLabelErrorWrapper>
                            );
                        }}
                    />

                    <form.Field
                        name="typeGuardianship"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper className={s['field-wrap']} name="typeGuardianship" label={<>Type of guardianship applied for</>} errorMessage={errorMessage}>
                                    <CheckboxGroup className={s['checkbox-wrap-group']} value={field.state.value} onValueChange={field.handleChange}>
                                        <CheckboxGroupItem label="Person and estate" value="Person and estate" />
                                        <CheckboxGroupItem label="Person only" value="Person only" />
                                        <CheckboxGroupItem label="Estate only" value="Estate only" />
                                        <CheckboxGroupItem label="Emergency" value="Emergency" />
                                        <CheckboxGroupItem label="Non-limited" value="Non-limited" />
                                        <CheckboxGroupItem label="Limited" value="Limited" />
                                        <CheckboxGroupItem label="Interim" value="Interim" />
                                    </CheckboxGroup>
                                </FormFieldLabelErrorWrapper>
                            );
                        }}
                    />

                    <form.AppField
                        name="typeGuardianship"
                        children={(field) => {
                            if (!field.state.value.includes('Limited')) {
                                return null;
                            }
                            return (
                                <form.AppField
                                    name="limitedPowersRequested"
                                    children={(field) => {
                                        return (
                                            <FormFieldLabelErrorWrapper className={s['field-wrap']} name="limitedPowersRequested" label={<>Limited powers requested</>}>
                                                <field.TextAreaField name="explanation" placeholder="Describe the limited powers requested" />
                                            </FormFieldLabelErrorWrapper>
                                        );
                                    }}
                                />
                            );
                        }}
                    />

                    <form.AppField
                        name="timePeriodRequested"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper className={s['field-wrap']} name="timePeriodRequested" label={<>Time period requested</>} errorMessage={errorMessage}>
                                    <RadioGroup
                                        className={s['checkbox-group']}
                                        value={field.state.value}
                                        onValueChange={(value) => {
                                            field.handleChange(value as string);
                                        }}
                                    >
                                        <RadioGroupItem label="Indefinite" value="Indefinite" />
                                        <RadioGroupItem label="Limited to a specific time period" value="Limited to a specific time period" />
                                    </RadioGroup>
                                </FormFieldLabelErrorWrapper>
                            );
                        }}
                    />

                    <form.AppField
                        name="timePeriodRequested"
                        children={(f) => {
                            if (!f.state.value.includes('Limited to a specific time period')) return null;
                            return (
                                <form.AppField
                                    name="specifyTimePeriod"
                                    children={(specifyTimePeriodField) => {
                                        const errorMessage = getFieldErrorMessage(specifyTimePeriodField.state.meta.errors);
                                        return (
                                            <FormFieldWrapper name="Specify the time period" label={<>Start dates of service</>}>
                                                <DatePicker
                                                    selectsRange
                                                    startDate={parseDate(specifyTimePeriodField.state.value.start)}
                                                    endDate={parseDate(specifyTimePeriodField.state.value.end)}
                                                    placeholder="MM/DD/YYYY - MM/DD/YYYY"
                                                    errorMessage={errorMessage}
                                                    onRangeChange={(dates) => {
                                                        const [start, end] = dates;
                                                        specifyTimePeriodField.handleChange({
                                                            start,
                                                            end,
                                                        });
                                                    }}
                                                />
                                            </FormFieldWrapper>
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

export default GuardianshipTypeStep;
