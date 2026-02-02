import React from 'react';
import { E164Number } from 'libphonenumber-js/core';
import { US_STATES_SELECT_OPTIONS } from '@/lib/constants.ts';
import { AdultGuardianshipForm } from '@/lib/types.ts';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PhoneInput from '@/components/ui/Input/components/PhoneInput';
import { ScrollArea } from '@/components/ui/ScrollArea';
import Select from '@/components/ui/Select';
import { Typography } from '@/components/ui/Typography';
import {
    useAdultGuardianshipFormContext,
    useAdultGuardianshipFormStepForm,
} from '../../context/AdultGuardianshipFormContext.tsx';
import s from './styles.module.css';

const WardLocationStep: React.FC = () => {
    const { form, isLoading } = useAdultGuardianshipFormStepForm('wardLocationStep');
    const { goToPreviousStep, canGoBack, goToNextStep, setFormStepData } = useAdultGuardianshipFormContext();

    if (isLoading) {
        return <ResponsiveLoader />;
    }

    return (
        <form className={s.form}>
            <div className={s['scroll-container-wrapper']}>
                <ScrollArea>
                    <div className={s['content-description']}>
                        <Typography variant="body-m">Enter the physical location of the prospective ward.</Typography>
                    </div>
                    <div className={s.inputs}>
                        <form.Field
                            name="streetAddress"
                            children={(field) => {
                                return (
                                    <div className={s.input}>
                                        <Typography variant="body-m" render={<strong />}>
                                            Street address of prospective ward
                                        </Typography>
                                        <Input
                                            errorMessage={
                                                !!field.state.meta.errors?.length && field.state.meta.isBlurred
                                            }
                                            placeholder="Type street address"
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
                                name="city"
                                children={(field) => {
                                    return (
                                        <div className={s.input}>
                                            <Typography variant="body-m" render={<strong />}>
                                                City
                                            </Typography>
                                            <Input
                                                errorMessage={
                                                    !!field.state.meta.errors?.length && field.state.meta.isBlurred
                                                }
                                                placeholder="Type city"
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
                                name="state"
                                children={(field) => {
                                    return (
                                        <div className={s.input}>
                                            <Typography variant="body-m" render={<strong />}>
                                                State
                                            </Typography>
                                            <Select
                                                type="single"
                                                placeholder="Select state"
                                                options={[
                                                    ...US_STATES_SELECT_OPTIONS.map((state) => {
                                                        return {
                                                            label: `${state.value} - ${state.label}`,
                                                            value: state.value,
                                                        };
                                                    }),
                                                ]}
                                                value={field.state.value}
                                                onChange={(value) => {
                                                    field.handleChange(value as string);
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

                        <div className={s['inputs-wrapper']}>
                            <form.Field
                                name="zip"
                                children={(field) => {
                                    return (
                                        <div className={s.input}>
                                            <Typography variant="body-m" render={<strong />}>
                                                ZIP code
                                            </Typography>
                                            <Input
                                                errorMessage={
                                                    !!field.state.meta.errors?.length && field.state.meta.isBlurred
                                                }
                                                placeholder="Ex. 43215"
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
                                name="wardPhone"
                                children={(field) => {
                                    return (
                                        <div className={s.input}>
                                            <Typography variant="body-m" render={<strong />}>
                                                Telephone number of prospective ward
                                            </Typography>
                                            <PhoneInput
                                                value={field.state.value ?? ''}
                                                onChange={(value: E164Number) => {
                                                    field.handleChange(value ?? '');
                                                }}
                                                onCountryChange={(value) => {
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
                    </div>
                </ScrollArea>
            </div>
            <div className={s.footer}>
                <Button variant="secondary" size="big" onClick={goToPreviousStep} disabled={!canGoBack} type="button">
                    Back
                </Button>
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
                                        'wardLocationStep',
                                        values as AdultGuardianshipForm['wardLocationStep']
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

export default WardLocationStep;
