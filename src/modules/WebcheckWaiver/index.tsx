import React from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { toastManager } from '@/lib/@toastManager.ts';
import { IWebcheckWaiverFormStep, WebcheckWaiverForm } from '@/lib/types.ts';
import {
    useWebcheckWaiverFormContext,
    useWebcheckWaiverFormStepForm,
    WebcheckWaiverFormProvider,
} from '@/context/WebcheckWaiverFormContext.tsx';
import FailureSection from '@/components/FailureSection';
import SuccessSection from '@/components/SuccessSection';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import s from './style.module.css';

type WebcheckWaiverFormStepWrapperProps = React.PropsWithChildren<{
    id: keyof IWebcheckWaiverFormStep;
}>;

const ResponsiveLoader: React.FC = () => {
    return (
        <div className={s['loader-container']}>
            <div className={s.loader} />
        </div>
    );
};

const WebcheckWaiverFormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { currentStepIndex, animationDirection, isLoading } = useWebcheckWaiverFormContext();

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

const WebcheckWaiverFormStep: React.FC<WebcheckWaiverFormStepWrapperProps> = ({ children, id }) => {
    const { currentStep, isSuccessful, isSubmitted } = useWebcheckWaiverFormContext();

    if (currentStep.id !== (id as keyof WebcheckWaiverForm)) {
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
    const { form, isLoading } = useWebcheckWaiverFormStepForm('stepOne');

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

const WebcheckWaiver: React.FC = () => {
    return (
        <main className={clsx(s.container, 'full-height')}>
            <WebcheckWaiverFormProvider>
                <div className={s.inner}>
                    <header className={s.header}>
                        <div className={s['header-information']}>
                            <Typography variant="body-m" render={<strong />}>
                                Webcheck waiver
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
                    <ScrollArea className={s.content}>
                        <WebcheckWaiverFormWrapper>
                            <WebcheckWaiverFormStep id={'stepOne' as keyof IWebcheckWaiverFormStep}>
                                <StepOneForm key="stepOne" />
                            </WebcheckWaiverFormStep>
                        </WebcheckWaiverFormWrapper>
                    </ScrollArea>
                </div>
            </WebcheckWaiverFormProvider>
        </main>
    );
};

export default WebcheckWaiver;
