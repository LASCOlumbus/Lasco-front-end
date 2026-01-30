import React from 'react';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Typography } from '@/components/ui/Typography';
import { useWebcheckWaiverFormStepForm } from '../../context/WebcheckWaiverFormContext.tsx';
import s from './styles.module.css';

const WebcheckWaiverStep: React.FC = () => {
    const { form, isLoading } = useWebcheckWaiverFormStepForm('webcheckWaiverStep');

    if (isLoading) {
        return <ResponsiveLoader />;
    }

    return (
        <form className={s.form}>
            <div className={s['content-description']}>
                <Typography variant="body-m">
                    You hereby certify that you have given the Franklin County Probate Court permission to obtain all
                    criminal history information pertaining to me in the files of the Ohio Bureau of Criminal
                    Identification and Investigation (BCI&I).
                </Typography>
                <Typography variant="body-m">
                    Further, you understand that your criminal history information received from BCI&I will be filed as
                    a confidential record in the. Court’s record keeping system and you will not receive a copy.
                </Typography>
            </div>
            <div className={s.inputs}>
                <form.Field
                    name="guardianName"
                    children={(field) => {
                        return (
                            <div className={s.input}>
                                <Typography variant="body-m" render={<strong />}>
                                    In the matter of the guardianship of
                                </Typography>
                                <Input
                                    errorMessage={!!field.state.meta.errors?.length}
                                    placeholder="Type your guardianship full name"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        field.handleChange(e.target.value);
                                    }}
                                />
                                {field.state.meta.errors?.length > 0 ? (
                                    <Typography className={s.error} variant="body-m">
                                        {/*eslint-disable-next-line*/}
                                        {/*@ts-ignore*/}
                                        {field.state.meta.errors?.[0].message}
                                    </Typography>
                                ) : null}
                            </div>
                        );
                    }}
                />
                <form.Field
                    name="caseNumber"
                    children={(field) => {
                        return (
                            <div className={s.input}>
                                <Typography variant="body-m" render={<strong />}>
                                    Case number
                                </Typography>
                                <Input
                                    errorMessage={!!field.state.meta.errors?.length}
                                    placeholder="Type case number"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        field.handleChange(e.target.value);
                                    }}
                                />
                                {field.state.meta.errors?.length ? (
                                    <Typography className={s.error} variant="body-m">
                                        {/*eslint-disable-next-line*/}
                                        {/*@ts-ignore*/}
                                        {field.state.meta.errors[0].message}
                                    </Typography>
                                ) : null}
                            </div>
                        );
                    }}
                />
                <form.Field
                    name="applicantName"
                    children={(field) => {
                        return (
                            <div className={s.input}>
                                <Typography variant="body-m" render={<strong />}>
                                    Name of person asking to be the guardian
                                </Typography>
                                <Input
                                    errorMessage={!!field.state.meta.errors?.length}
                                    placeholder="Type full name"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        field.handleChange(e.target.value);
                                    }}
                                />
                                {field.state.meta.errors?.length ? (
                                    <Typography className={s.error} variant="body-m">
                                        {/*eslint-disable-next-line*/}
                                        {/*@ts-ignore*/}
                                        {field.state.meta.errors[0].message}
                                    </Typography>
                                ) : null}
                            </div>
                        );
                    }}
                />
            </div>
            <div className={s.footer}>
                <form.Subscribe
                    selector={(state) => {
                        return [state.canSubmit, state.isSubmitting];
                    }}
                    children={([canSubmit, isSubmitting]) => {
                        return (
                            <Button
                                onClick={form.handleSubmit}
                                type="button"
                                variant="primary"
                                size="big"
                                disabled={!canSubmit}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        );
                    }}
                />
            </div>
        </form>
    );
};

export default WebcheckWaiverStep;
