import type { E164Number } from 'libphonenumber-js/core';
import React from 'react';
import { US_STATES_SELECT_OPTIONS } from '@/lib/constants';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PhoneInput from '@/components/ui/Input/components/PhoneInput';
import Select from '@/components/ui/Select';
import { Typography } from '@/components/ui/Typography';
import {
    useAdultGuardianshipFormContext,
    useAdultGuardianshipFormStepForm,
} from '../../context/AdultGuardianshipFormContext';
import s from './styles.module.css';

const WardLocationStep: React.FC = () => {
    const { form, isLoading } = useAdultGuardianshipFormStepForm('wardLocationStep');
    const { goToPreviousStep } = useAdultGuardianshipFormContext();

    const [stateSearch, setStateSearch] = React.useState('');

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
                                        errorMessage={!!field.state.meta.errors?.length}
                                        placeholder="Type street address"
                                        value={field.state.value}
                                        onBlur={() => {
                                            field.handleBlur();
                                        }}
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
                                            errorMessage={!!field.state.meta.errors?.length}
                                            placeholder="Type city"
                                            value={field.state.value}
                                            onBlur={() => {
                                                field.handleBlur();
                                            }}
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
                                            isSearchable
                                            search={stateSearch}
                                            onSearchChange={(value) => {
                                                setStateSearch(value);
                                            }}
                                            errorMessage={!!field.state.meta.errors?.length}
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
                                                setStateSearch('');
                                                field.handleChange(value as string);
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
                                            errorMessage={!!field.state.meta.errors?.length}
                                            placeholder="Ex. 43215"
                                            value={field.state.value}
                                            onBlur={() => {
                                                field.handleBlur();
                                            }}
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
                            name="wardPhone"
                            children={(field) => {
                                return (
                                    <div className={s.input}>
                                        <Typography variant="body-m" render={<strong />}>
                                            Telephone number of prospective ward
                                        </Typography>
                                        <PhoneInput
                                            value={field.state.value ?? ''}
                                            errorMessage={!!field.state.meta.errors?.length}
                                            onChange={(value: E164Number) => {
                                                field.handleChange(value ?? '');
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
                </div>
            </div>
            <div className={s.footer}>
                <Button variant="secondary" size="big" onClick={goToPreviousStep} type="button">
                    Back
                </Button>
                <form.Subscribe
                    selector={(state) => {
                        const isValid = state.isFieldsValid && state.isFormValid;
                        const canSubmit = state.isTouched && state.isValid && !state.isPristine && state.canSubmit;

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

export default WardLocationStep;
