import React from 'react';
import { E164Number } from 'libphonenumber-js/core';
import { AdultGuardianshipForm } from '@/lib/types.ts';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PhoneInput from '@/components/ui/Input/components/PhoneInput';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import {
    useAdultGuardianshipFormContext,
    useAdultGuardianshipFormStepForm,
} from '../../context/AdultGuardianshipFormContext.tsx';
import s from './styles.module.css';

const CaseDetailsStep: React.FC = () => {
    const { form, isLoading } = useAdultGuardianshipFormStepForm('caseDetailsStep');
    const { goToNextStep, setFormStepData } = useAdultGuardianshipFormContext();

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
                            Ohio law requires the person for whom guardianship is being sought to be visited and
                            personally served notice of the guardianship application by a probate court investigator.
                        </Typography>
                        <Typography variant="body-m">
                            The information you provide below helps the Court safely notify the Prospective Ward and
                            meet the requirements of Ohio law.
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
                        <div className={s['inputs-wrapper']}>
                            <form.Field
                                name="contactName"
                                children={(field) => {
                                    return (
                                        <div className={s.input}>
                                            <Typography variant="body-m" render={<strong />}>
                                                Contact person name
                                            </Typography>
                                            <Input
                                                errorMessage={
                                                    !!field.state.meta.errors?.length && field.state.meta.isBlurred
                                                }
                                                placeholder="Type contact person full name"
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
                                name="contactPhone"
                                children={(field) => {
                                    return (
                                        <div className={s.input}>
                                            <Typography variant="body-m" render={<strong />}>
                                                Contact person telephone number
                                            </Typography>
                                            <PhoneInput
                                                value={field.state.value ?? ''}
                                                onChange={(value?: E164Number) => {
                                                    field.handleChange(value ?? '');
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

                        <Alert>
                            Please, provide the contact person information, who may be contacted by the court
                            investigator during regular business hours (8:00 a.m. – 5:00 p.m.) if assistance is required
                            to complete service.
                        </Alert>
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
                                    if (isInvalid) return;
                                    goToNextStep();
                                    setFormStepData(
                                        'caseDetailsStep',
                                        values as AdultGuardianshipForm['caseDetailsStep']
                                    );
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
