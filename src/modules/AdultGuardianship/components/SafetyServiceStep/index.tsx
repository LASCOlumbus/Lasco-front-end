import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import clsx from 'clsx';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import TextArea from '@/components/ui/TextArea';
import { Typography } from '@/components/ui/Typography';
import {
    useAdultGuardianshipFormContext,
    useAdultGuardianshipFormStepForm,
} from '../../context/AdultGuardianshipFormContext';
import s from './styles.module.css';

const SafetyServiceStep: React.FC = () => {
    const { form, isLoading } = useAdultGuardianshipFormStepForm('safetyServiceStep');
    const { goToPreviousStep, toggleIsSuccessful } = useAdultGuardianshipFormContext();

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

                toggleIsSuccessful(true);
            }}
        >
            <div className={s['scroll-container-wrapper']}>
                <div className={s['content-description']}>
                    <Typography variant="body-m">
                        Answer the required questions to help the court investigator prepare for the visit.
                    </Typography>
                </div>
                <div className={s.inputs}>
                    <form.Field
                        name="isProspectiveWardLeaveDuringDay.answer"
                        children={(field) => {
                            return (
                                <div className={s.input}>
                                    <Typography variant="heading-h4" render={<strong />}>
                                        Does the prospective ward leave the above location on a regular basis (school,
                                        work, vacation, etc.) during the day?
                                    </Typography>
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
                                    {field.state.value && (
                                        <form.Field
                                            name="isProspectiveWardLeaveDuringDay.explanation"
                                            children={(field) => {
                                                return (
                                                    <div className={s.input}>
                                                        <TextArea
                                                            value={field.state.value as string}
                                                            onChange={(e) => {
                                                                field.handleChange(e.target.value);
                                                            }}
                                                            placeholder="Describe when and where the ward leaves during the day."
                                                            errorMessage={!!field.state.meta.errors?.length}
                                                        />
                                                        {field.state.meta.errors?.length ? (
                                                            <Typography className={s.error} variant="body-m">
                                                                {/*eslint-disable-next-line*/}
                                                                {/*@ts-ignore*/}
                                                                {field.state.meta.errorMap?.onChange?.[0]?.message}
                                                            </Typography>
                                                        ) : null}
                                                    </div>
                                                );
                                            }}
                                        />
                                    )}
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
                        name="specialCircumstances.answer"
                        children={(field) => {
                            return (
                                <div className={s.input}>
                                    <Typography variant="heading-h4" render={<strong />}>
                                        Is there a situation or special circumstance of which the investigator should be
                                        aware such as weapons in the home, dangerous situations, contagious diseases,
                                        etc.?
                                    </Typography>
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
                                    {field.state.value && (
                                        <form.Field
                                            name="specialCircumstances.explanation"
                                            children={(field) => {
                                                return (
                                                    <div className={s.input}>
                                                        <TextArea
                                                            value={field.state.value as string}
                                                            onChange={(e) => {
                                                                field.handleChange(e.target.value);
                                                            }}
                                                            placeholder="Describe any safety concerns or special circumstances"
                                                            errorMessage={!!field.state.meta.errors?.length}
                                                        />
                                                        {field.state.meta.errors?.length ? (
                                                            <Typography className={s.error} variant="body-m">
                                                                {/*eslint-disable-next-line*/}
                                                                {/*@ts-ignore*/}
                                                                {field.state.meta.errorMap?.onChange?.[0]?.message}
                                                            </Typography>
                                                        ) : null}
                                                    </div>
                                                );
                                            }}
                                        />
                                    )}
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
                        name="isProspectiveWardHasCommunicationIssues.answer"
                        children={(field) => {
                            return (
                                <div className={s.input}>
                                    <Typography variant="heading-h4" render={<strong />}>
                                        Does the Prospective Ward speak a foreign language or have any medical issues or
                                        other communication issues which would prevent them from communicating with the
                                        investigator?
                                    </Typography>
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
                                    {field.state.value && (
                                        <form.Field
                                            name="isProspectiveWardHasCommunicationIssues.explanation"
                                            children={(field) => {
                                                return (
                                                    <div className={s.input}>
                                                        <TextArea
                                                            value={field.state.value as string}
                                                            onChange={(e) => {
                                                                field.handleChange(e.target.value);
                                                            }}
                                                            placeholder="Provide details about language or medical communication needs."
                                                            errorMessage={!!field.state.meta.errors?.length}
                                                        />
                                                        {field.state.meta.errors?.length ? (
                                                            <Typography className={s.error} variant="body-m">
                                                                {/*eslint-disable-next-line*/}
                                                                {/*@ts-ignore*/}
                                                                {field.state.meta.errorMap?.onChange?.[0]?.message}
                                                            </Typography>
                                                        ) : null}
                                                    </div>
                                                );
                                            }}
                                        />
                                    )}
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
                    <Alert className={s.alert}>
                        The hearing will not occur unless the visit is completed at least seven days prior to the
                        scheduled hearing date, unless otherwise approved by the court. If there is a change in the
                        location of the Prospective Ward between the time the application is filed and the hearing date,
                        it is the Applicant&apos;s responsibility to notify the court investigator at{' '}
                        <a className={clsx(s.link, 'focus-primary')} href="tel:+16145256109">
                            (614) 525-6109
                        </a>{' '}
                        or{' '}
                        <a className={clsx(s.link, 'focus-primary')} href="tel:+16145256296">
                            (614) 525-6296
                        </a>
                        .
                    </Alert>
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

                        return [canSubmit, isValid, state.isSubmitting];
                    }}
                    children={([canSubmit, isValid, isSubmitting]) => {
                        return (
                            <Button variant="primary" type="submit" size="big" disabled={!canSubmit || !isValid}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        );
                    }}
                />
            </div>
        </form>
    );
};

export default SafetyServiceStep;
