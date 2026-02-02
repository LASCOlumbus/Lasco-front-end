import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { ScrollArea } from '@/components/ui/ScrollArea';
import TextArea from '@/components/ui/TextArea';
import { Typography } from '@/components/ui/Typography';
import {
    useAdultGuardianshipFormContext,
    useAdultGuardianshipFormStepForm,
} from '../../context/AdultGuardianshipFormContext.tsx';
import s from './styles.module.css';

const SafetyServiceStep: React.FC = () => {
    const { form, isLoading } = useAdultGuardianshipFormStepForm('safetyServiceStep');
    const { goToPreviousStep, canGoBack } = useAdultGuardianshipFormContext();

    if (isLoading) {
        return <ResponsiveLoader />;
    }

    return (
        <form className={s.form}>
            <div className={s['scroll-container-wrapper']}>
                <ScrollArea>
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
                                            Does the prospective ward leave the above location on a regular basis
                                            (school, work, vacation, etc.) during the day?
                                        </Typography>
                                        <RadioGroup
                                            className={s['checkbox-group']}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
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
                                                                onBlur={field.handleBlur}
                                                                onChange={(e) => {
                                                                    field.handleChange(e.target.value);
                                                                }}
                                                                placeholder="Describe when and where the ward leaves during the day."
                                                            />
                                                            {field.state.meta.errors?.length &&
                                                            field.state.meta.isBlurred ? (
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
                                        )}
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
                            name="specialCircumstances.answer"
                            children={(field) => {
                                return (
                                    <div className={s.input}>
                                        <Typography variant="heading-h4" render={<strong />}>
                                            Is there a situation or special circumstance of which the investigator
                                            should be aware such as weapons in the home, dangerous situations,
                                            contagious diseases, etc.?
                                        </Typography>
                                        <RadioGroup
                                            className={s['checkbox-group']}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
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
                                                                onBlur={field.handleBlur}
                                                                onChange={(e) => {
                                                                    field.handleChange(e.target.value);
                                                                }}
                                                                placeholder="Describe any safety concerns or special circumstances"
                                                            />
                                                            {field.state.meta.errors?.length &&
                                                            field.state.meta.isBlurred ? (
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
                                        )}
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
                            name="isProspectiveWardHasCommunicationIssues.answer"
                            children={(field) => {
                                return (
                                    <div className={s.input}>
                                        <Typography variant="heading-h4" render={<strong />}>
                                            Does the Prospective Ward speak a foreign language or have any medical
                                            issues or other communication issues which would prevent them from
                                            communicating with the investigator?
                                        </Typography>
                                        <RadioGroup
                                            className={s['checkbox-group']}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
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
                                                                onBlur={field.handleBlur}
                                                                onChange={(e) => {
                                                                    field.handleChange(e.target.value);
                                                                }}
                                                                placeholder="Provide details about language or medical communication needs."
                                                            />
                                                            {field.state.meta.errors?.length &&
                                                            field.state.meta.isBlurred ? (
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
                                        )}
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

                        <Alert>
                            The hearing will not occur unless the visit is completed at least seven days prior to the
                            scheduled hearing date, unless otherwise approved by the court. If there is a change in the
                            location of the Prospective Ward between the time the application is filed and the hearing
                            date, it is the Applicant’s responsibility to notify the court investigator at (614)
                            525-6109 or (614) 525-6296.
                        </Alert>
                    </div>
                </ScrollArea>
            </div>
            <div className={s.footer}>
                <Button variant="secondary" size="big" onClick={goToPreviousStep} disabled={!canGoBack} type="button">
                    Back
                </Button>
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

export default SafetyServiceStep;
