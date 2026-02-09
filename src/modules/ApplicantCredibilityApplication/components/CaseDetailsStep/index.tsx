import React from 'react';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useApplicantCredibilityApplicationFormStepForm } from '../../context/ApplicantCredibilityApplicationFormContext';
import s from './styles.module.css';

const CaseDetailsStep: React.FC = () => {
    const { form, isLoading } = useApplicantCredibilityApplicationFormStepForm('caseDetailsStep');

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
                        This statement is made in support of my application to be appointed Guardian in the above styled
                        matter and the undersigned says that the facts stated in the foregoing applications are true.
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
