import React from 'react';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { useAdultJurisdictionAffidavitFormStepForm } from '../../context/AdultJurisdictionAffidavitFormContext';
import s from './styles.module.css';

const CaseDetailsStep: React.FC = () => {
    const { form, isLoading } = useAdultJurisdictionAffidavitFormStepForm('caseDetailsStep');

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
                        name="applicantName"
                        children={(field) => {
                            return (
                                <field.InputField
                                    name="applicantName"
                                    label={<>Full name of affiant/applicant</>}
                                    placeholder="Type full legal name"
                                    onBlur={field.handleBlur}
                                />
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
