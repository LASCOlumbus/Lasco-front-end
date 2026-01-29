import React from 'react';
import { Component as CheckCircle20Icon } from '@/icons/check-circle_20.svg?svgUse';
import { Component as Progress20Icon } from '@/icons/progress_20.svg?svgUse';
import clsx from 'clsx';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { toastManager } from '@/lib/@toastManager.ts';
import { WaiverNoticeForm } from '@/lib/types.ts';
import {
    useWaiverNoticeFormContext,
    useWaiverNoticeFormStepForm,
    WaiverNoticeFormProvider,
} from '@/context/WaiverNoticeFormContext.tsx';
import { useIsTablet } from '@/hooks/useIsTablet.ts';
import FailureSection from '@/components/FailureSection';
import SuccessSection from '@/components/SuccessSection';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import s from './style.module.css';

type WaiverNoticeFormStepWrapperProps = React.PropsWithChildren<{
    id: keyof WaiverNoticeForm;
}>;

const ResponsiveLoader: React.FC = () => {
    return (
        <div className={s['loader-container']}>
            <div className={s.loader} />
        </div>
    );
};

const WaiverNoticeFormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { currentStepIndex, animationDirection, isLoading } = useWaiverNoticeFormContext();

    if (isLoading) {
        return <ResponsiveLoader />;
    }

    return (
        <MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0 }}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    className={s.motion}
                    key={currentStepIndex}
                    initial={{ x: animationDirection === 'next' ? '110%' : '-110%', scale: 0.9, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: animationDirection === 'next' ? '-110%' : '110%', scale: 0.9, opacity: 0 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </MotionConfig>
    );
};

const WaiverNoticeFormStep: React.FC<WaiverNoticeFormStepWrapperProps> = ({ children, id }) => {
    const { currentStep, isSuccessful, isSubmitted } = useWaiverNoticeFormContext();

    if (currentStep.id !== (id as keyof WaiverNoticeForm)) {
        return null;
    }

    if (isSubmitted && isSuccessful) {
        return (
            <SuccessSection
                title="Webcheck waiver form has been submitted"
                description="To finish your filing, please download the generated document, print it, and sign it. The court requires a physical signature. Unsigned documents cannot be processed."
            />
        );
    }

    if (isSubmitted && !isSuccessful) {
        return (
            <FailureSection
                title="Waiver of notice form has not been submitted"
                description="Something went wrong while submitting your form. Your answers are saved. Please try again."
            />
        );
    }

    return children;
};

const StepOneForm: React.FC = () => {
    const { form, isLoading } = useWaiverNoticeFormStepForm('stepOne');
    const { goToNextStep, setFormStepData } = useWaiverNoticeFormContext();

    if (isLoading) {
        return <ResponsiveLoader />;
    }

    return (
        <form className={s.form}>
            <div className={s['content-description']}>
                <Typography variant="body-m">
                    You hereby waive the issuing and service of notice, voluntarily enter your appearance herein, and
                    consent to the appointment of the person named below as guardian of the above-named person.
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
                                    errorMessage={!!field.state.meta.errors?.length && field.state.meta.isBlurred}
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
                                    errorMessage={!!field.state.meta.errors?.length && field.state.meta.isBlurred}
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
                                    errorMessage={!!field.state.meta.errors?.length && field.state.meta.isBlurred}
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
            <div className={s.footer}>
                <form.Subscribe
                    selector={(state) => {
                        const isValid = state.isBlurred && state.isFieldsValid;
                        return [state.canSubmit, isValid, state.values];
                    }}
                    children={([canSubmit, isValid, values]) => {
                        return (
                            <Button
                                onClick={() => {
                                    goToNextStep();
                                    setFormStepData('stepOne', values as WaiverNoticeForm['stepOne']);
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

const StepTwoForm: React.FC = () => {
    const { form, isLoading } = useWaiverNoticeFormStepForm('stepTwo');

    if (isLoading) {
        return <ResponsiveLoader />;
    }

    return (
        <form className={s.form}>
            <div className={s['content-description']}>
                <Typography variant="body-m" render={<strong />}>
                    Add people who waive notice
                </Typography>
                <Typography variant="body-m">
                    These are the adults who agree they have been notified about the guardianship application and waive
                    the notice. Type their full names below.
                </Typography>
            </div>
            <div className={s.inputs}>
                <form.Field
                    name="persons"
                    children={(field) => {
                        return (
                            <>
                                {field.state.value.map((_, index) => {
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
                                                                errorMessage={
                                                                    !!person.state.meta.errors?.length &&
                                                                    person.state.meta.isBlurred
                                                                }
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
                                                        {person.state.meta.errors?.length &&
                                                        person.state.meta.isBlurred ? (
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
                                <Button
                                    variant="secondary"
                                    size="small"
                                    onClick={() => {
                                        field.handleChange([...field.state.value, '']);
                                    }}
                                >
                                    Add person
                                </Button>
                            </>
                        );
                    }}
                />
            </div>
            <div className={s.footer}>
                <Button variant="secondary" size="big">
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

const Sidebar: React.FC = () => {
    const { steps, currentStepIndex } = useWaiverNoticeFormContext();

    const isTablet = useIsTablet();

    return (
        <div className={s.sidebar}>
            {isTablet ? (
                <div className={clsx(s['sidebar-item'])}>
                    <div className={s['sidebar-item-description']}>
                        <Typography variant="body-caption" render={<strong />}>
                            Step {currentStepIndex + 1}/{steps.length}
                        </Typography>
                        <Typography variant="body-m" render={<strong />}>
                            {steps[currentStepIndex].label}
                        </Typography>
                    </div>
                    <Progress20Icon width={22} height={22} color={'#184482'} />
                </div>
            ) : (
                steps.map((step, index) => {
                    return (
                        <div className={clsx(s['sidebar-item'], index === currentStepIndex && s.active)} key={step.id}>
                            <Typography variant="body-m" render={<strong />}>
                                {step.label}
                            </Typography>
                            {index === currentStepIndex && <Progress20Icon width={22} height={22} color={'white'} />}
                            {index < currentStepIndex && <CheckCircle20Icon width={22} height={22} color={'#39981F'} />}
                        </div>
                    );
                })
            )}
        </div>
    );
};

const WaiverNotice: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <WaiverNoticeFormProvider>
                <div className={s.inner}>
                    <header className={s.header}>
                        <div className={s['header-information']}>
                            <Typography variant="body-m" render={<strong />}>
                                Waiver of notice
                            </Typography>
                            <Typography variant="body-s" className={s.description}>
                                Probate court of Franklin County, Ohio | Judge: Jeffrey D. Mackey
                            </Typography>
                        </div>
                        <div className={s['header-buttons']}>
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={() => {
                                    toastManager.add({
                                        type: 'error',
                                        title: 'Validation Error',
                                        description:
                                            'Please check your input and try again. Make sure all required fields are filled correctly.',
                                        timeout: 7000,
                                    });
                                }}
                            >
                                Print
                            </Button>
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={() => {
                                    toastManager.add({
                                        type: 'error',
                                        title: 'Validation Error',
                                        description:
                                            'Please check your input and try again. Make sure all required fields are filled correctly.',
                                        timeout: 7000,
                                    });
                                }}
                            >
                                Download
                            </Button>
                        </div>
                    </header>
                    <div className={s['sidebar-wrapper']}>
                        <Sidebar />
                        <ScrollArea className={s.content}>
                            <WaiverNoticeFormWrapper>
                                <WaiverNoticeFormStep id={'stepOne' as keyof WaiverNoticeForm}>
                                    <StepOneForm key="stepOne" />
                                </WaiverNoticeFormStep>
                                <WaiverNoticeFormStep id="stepTwo">
                                    <StepTwoForm key="stepTwo" />
                                </WaiverNoticeFormStep>
                            </WaiverNoticeFormWrapper>
                        </ScrollArea>
                    </div>
                </div>
            </WaiverNoticeFormProvider>
        </main>
    );
};

export default WaiverNotice;
