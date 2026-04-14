import React from 'react';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import { useWaiverNoticeFormContext, useWaiverNoticeFormStepForm } from '../../context/WaiverNoticeFormContext';
import s from './styles.module.css';

const WaiversListStep: React.FC = () => {
    const { form, isLoading } = useWaiverNoticeFormStepForm('waiversListStep');
    const { goToPreviousStep, canGoBack } = useWaiverNoticeFormContext();

    if (isLoading) {
        return <ResponsiveLoader />;
    }

    return (
        <form className={s.form}>
            <div className={s['scroll-container-wrapper']}>
                <ScrollArea>
                    <div className={s['content-description']}>
                        <Typography variant="heading-h4" render={<strong />}>
                            Add people who waive notice
                        </Typography>
                        <Typography variant="body-m">These are the adults who agree they have been notified about the guardianship application and waive the notice. Type their full names below.</Typography>
                    </div>
                    <div className={s.inputs}>
                        <form.Field
                            name="persons"
                            children={(field) => {
                                return (
                                    <>
                                        {field?.state?.value?.map((_, index) => {
                                            return (
                                                <form.Field key={index} name={`persons[${index}]`}>
                                                    {(person) => {
                                                        return (
                                                            <div className={s.input}>
                                                                <Typography variant="body-m" render={<strong />}>
                                                                    Full name of person waiving notice
                                                                </Typography>
                                                                <div className={s['input-wrapper']}>
                                                                    <Input
                                                                        errorMessage={!!person.state.meta.errors?.length && person.state.meta.isBlurred}
                                                                        placeholder="Type full name"
                                                                        value={person.state.value}
                                                                        onBlur={() => {
                                                                            person.handleBlur();
                                                                            person.handleChange(person.state.value);
                                                                        }}
                                                                        onChange={(e) => {
                                                                            person.handleChange(e.target.value);
                                                                        }}
                                                                    />
                                                                    {field.state.value.length > 1 && (
                                                                        <Button
                                                                            variant="secondary"
                                                                            size="big"
                                                                            onClick={() => {
                                                                                field.handleChange(
                                                                                    field.state.value.filter((_, i) => {
                                                                                        return i !== index;
                                                                                    })
                                                                                );
                                                                            }}
                                                                        >
                                                                            Remove
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                                {person.state.meta.errors?.length && person.state.meta.isBlurred ? (
                                                                    <Typography className={s.error} variant="body-m">
                                                                        {/*eslint-disable-next-line*/}
                                                                        {/*@ts-ignore*/}
                                                                        {person.state.meta.errors[0].message}
                                                                    </Typography>
                                                                ) : null}
                                                            </div>
                                                        );
                                                    }}
                                                </form.Field>
                                            );
                                        })}
                                        {field?.state?.value.length < 8 && (
                                            <Button
                                                variant="secondary"
                                                size="small"
                                                onClick={() => {
                                                    field.handleChange([...field.state.value, '']);
                                                }}
                                            >
                                                Add person
                                            </Button>
                                        )}
                                    </>
                                );
                            }}
                        />
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
                            <Button onClick={form.handleSubmit} type="button" variant="primary" size="big" disabled={!canSubmit}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        );
                    }}
                />
            </div>
        </form>
    );
};

export default WaiversListStep;
