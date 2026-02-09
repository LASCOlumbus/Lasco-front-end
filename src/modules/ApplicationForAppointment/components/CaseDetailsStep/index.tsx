import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { useApplicationForAppointmentFormStepForm } from '../../context/ApplicationForAppointmentFormContext';
import s from './styles.module.css';

const CaseDetailsStep: React.FC = () => {
    const { form, isLoading } = useApplicationForAppointmentFormStepForm('caseDetailsStep');

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
                        name="guardianName"
                        children={(field) => {
                            return (
                                <field.InputField
                                    name="guardianName"
                                    label={<>In the matter of the guardianship of</>}
                                    placeholder="Type your guardianship full name"
                                    onBlur={field.handleBlur}
                                />
                            );
                        }}
                    />
                    <form.AppField
                        name="caseNumber"
                        children={(field) => {
                            return (
                                <field.InputField
                                    name="caseNumber"
                                    label={<>Case number</>}
                                    placeholder="Type case number"
                                    onBlur={field.handleBlur}
                                />
                            );
                        }}
                    />

                    <form.AppField
                        name="relationshipToWard"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper
                                    className={s['field-wrap']}
                                    name="relationshipToWard"
                                    label={<>Relationship to the ward</>}
                                    errorMessage={errorMessage}
                                >
                                    <RadioGroup
                                        className={s['checkbox-group']}
                                        value={field.state.value}
                                        onValueChange={(value) => {
                                            field.handleChange(value as string);
                                        }}
                                    >
                                        <RadioGroupItem label="Initial appointment" value={'Initial appointment'} />
                                        <RadioGroupItem label="Successor appointment" value={'Successor appointment'} />
                                    </RadioGroup>
                                </FormFieldLabelErrorWrapper>
                            );
                        }}
                    />
                </div>
            </div>
            <div className={s.footer}>
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

export default CaseDetailsStep;
