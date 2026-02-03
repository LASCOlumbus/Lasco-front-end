import React from 'react';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useAdultGuardianshipFormStepForm } from '../../context/AdultGuardianshipFormContext';
import s from './styles.module.css';

const CaseDetailsStep: React.FC = () => {
    const { form, isLoading } = useAdultGuardianshipFormStepForm('caseDetailsStep');

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
                        Ohio law requires the person for whom guardianship is being sought to be visited and personally
                        served notice of the guardianship application by a probate court investigator.
                    </Typography>
                    <Typography variant="body-m">
                        The information you provide below helps the Court safely notify the Prospective Ward and meet
                        the requirements of Ohio law.
                    </Typography>
                </div>
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
                    <div className={s['inputs-wrapper']}>
                        <form.AppField
                            name="contactName"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="contactName"
                                        label={<>Contact person name</>}
                                        placeholder="Type contact person full name"
                                        onBlur={field.handleBlur}
                                    />
                                );
                            }}
                        />
                        <form.AppField
                            name="contactPhone"
                            children={(field) => {
                                return (
                                    <field.PhoneInputField
                                        name="contactPhone"
                                        label={<>Contact person telephone number</>}
                                    />
                                );
                            }}
                        />
                    </div>
                    <Alert>
                        Please, provide the contact person information, who may be contacted by the court investigator
                        during regular business hours (8:00 a.m. - 5:00 p.m.) if assistance is required to complete
                        service.
                    </Alert>
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
