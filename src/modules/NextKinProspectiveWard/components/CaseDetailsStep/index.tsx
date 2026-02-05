import React from 'react';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useNextKinProspectiveWardFormStepForm } from '../../context/NextKinProspectiveWardFormContext';
import s from './styles.module.css';

const CaseDetailsStep: React.FC = () => {
    const { form, isLoading } = useNextKinProspectiveWardFormStepForm('caseDetailsStep');

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
                        The following are the Prospective Ward&apos;s spouse, living children, other next-of-kin, and
                        current Guardian.
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
                            name="applicantName"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="contactName"
                                        label={<>Applicant full name</>}
                                        placeholder="Type contact person full name"
                                        onBlur={field.handleBlur}
                                    />
                                );
                            }}
                        />
                    </div>
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
