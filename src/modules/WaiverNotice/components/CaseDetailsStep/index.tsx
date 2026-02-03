import type { WaiverNoticeForm } from '@/lib/types';
import React from 'react';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import { useWaiverNoticeFormContext, useWaiverNoticeFormStepForm } from '../../context/WaiverNoticeFormContext';
import s from './styles.module.css';

const CaseDetailsStep: React.FC = () => {
    const { form, isLoading } = useWaiverNoticeFormStepForm('caseDetailsStep');
    const { goToNextStep, setFormStepData } = useWaiverNoticeFormContext();

    React.useEffect(() => {
        form.validate('submit');
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <ResponsiveLoader />;
    }

    return (
        <form className={s.form}>
            <div className={s['scroll-container-wrapper']}>
                <ScrollArea>
                    <div className={s['content-description']}>
                        <Typography variant="body-m">
                            You hereby waive the issuing and service of notice, voluntarily enter your appearance
                            herein, and consent to the appointment of the person named below as guardian of the
                            above-named person.
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
                                            errorMessage={
                                                !!field.state.meta.errors?.length && field.state.meta.isBlurred
                                            }
                                            placeholder="Type your guardianship full name"
                                            value={field.state.value}
                                            onBlur={() => {
                                                field.handleBlur();
                                                field.handleChange(field.state.value);
                                            }}
                                            onChange={(e) => {
                                                field.handleChange(e.target.value);
                                            }}
                                        />
                                        {field.state.meta.errors?.length && field.state.meta.isBlurred ? (
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
                            name="caseNumber"
                            children={(field) => {
                                return (
                                    <div className={s.input}>
                                        <Typography variant="body-m" render={<strong />}>
                                            Case number
                                        </Typography>
                                        <Input
                                            errorMessage={
                                                !!field.state.meta.errors?.length && field.state.meta.isBlurred
                                            }
                                            placeholder="Type case number"
                                            value={field.state.value}
                                            onBlur={() => {
                                                field.handleBlur();
                                                field.handleChange(field.state.value);
                                            }}
                                            onChange={(e) => {
                                                field.handleChange(e.target.value);
                                            }}
                                        />
                                        {field.state.meta.errors?.length && field.state.meta.isBlurred ? (
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
                                            errorMessage={
                                                !!field.state.meta.errors?.length && field.state.meta.isBlurred
                                            }
                                            placeholder="Type full name"
                                            value={field.state.value}
                                            onBlur={() => {
                                                field.handleBlur();
                                                field.handleChange(field.state.value);
                                            }}
                                            onChange={(e) => {
                                                field.handleChange(e.target.value);
                                            }}
                                        />
                                        {field.state.meta.errors?.length && field.state.meta.isBlurred ? (
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
                </ScrollArea>
            </div>
            <div className={s.footer}>
                <form.Subscribe
                    selector={(state) => {
                        const isValid = state.isFieldsValid;
                        return [state.canSubmit, isValid, state.values];
                    }}
                    children={([canSubmit, isValid, values]) => {
                        return (
                            <Button
                                onClick={async () => {
                                    const result = await form.validate('submit');
                                    const isInvalid = Object.values(result).some(({ onSubmit: field }) => {
                                        return Array.isArray(field) && field?.length > 0;
                                    });
                                    if (isInvalid) {
                                        return;
                                    }
                                    goToNextStep();
                                    setFormStepData('caseDetailsStep', values as WaiverNoticeForm['caseDetailsStep']);
                                }}
                                type="button"
                                variant="primary"
                                size="big"
                                disabled={!canSubmit || !isValid}
                            >
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
