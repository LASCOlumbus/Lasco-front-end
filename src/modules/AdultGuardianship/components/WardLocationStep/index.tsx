import type { SelectOption } from '@/components/ui/Select/types';
import type { AdultGuardianshipForm } from '@/lib/types';
import React from 'react';
import { E164Number } from 'libphonenumber-js/core';
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
} from '../../context/AdultGuardianshipFormContext';
import s from './styles.module.css';

export const US_STATES_SELECT_OPTIONS: SelectOption[] = [
    {
        label: 'Alabama',
        value: 'AL',
    },
    {
        label: 'Alaska',
        value: 'AK',
    },
    {
        label: 'American Samoa',
        value: 'AS',
    },
    {
        label: 'Arizona',
        value: 'AZ',
    },
    {
        label: 'Arkansas',
        value: 'AR',
    },
    {
        label: 'California',
        value: 'CA',
    },
    {
        label: 'Colorado',
        value: 'CO',
    },
    {
        label: 'Connecticut',
        value: 'CT',
    },
    {
        label: 'Delaware',
        value: 'DE',
    },
    {
        label: 'District Of Columbia',
        value: 'DC',
    },
    {
        label: 'Federated States Of Micronesia',
        value: 'FM',
    },
    {
        label: 'Florida',
        value: 'FL',
    },
    {
        label: 'Georgia',
        value: 'GA',
    },
    {
        label: 'Guam',
        value: 'GU',
    },
    {
        label: 'Hawaii',
        value: 'HI',
    },
    {
        label: 'Idaho',
        value: 'ID',
    },
    {
        label: 'Illinois',
        value: 'IL',
    },
    {
        label: 'Indiana',
        value: 'IN',
    },
    {
        label: 'Iowa',
        value: 'IA',
    },
    {
        label: 'Kansas',
        value: 'KS',
    },
    {
        label: 'Kentucky',
        value: 'KY',
    },
    {
        label: 'Louisiana',
        value: 'LA',
    },
    {
        label: 'Maine',
        value: 'ME',
    },
    {
        label: 'Marshall Islands',
        value: 'MH',
    },
    {
        label: 'Maryland',
        value: 'MD',
    },
    {
        label: 'Massachusetts',
        value: 'MA',
    },
    {
        label: 'Michigan',
        value: 'MI',
    },
    {
        label: 'Minnesota',
        value: 'MN',
    },
    {
        label: 'Mississippi',
        value: 'MS',
    },
    {
        label: 'Missouri',
        value: 'MO',
    },
    {
        label: 'Montana',
        value: 'MT',
    },
    {
        label: 'Nebraska',
        value: 'NE',
    },
    {
        label: 'Nevada',
        value: 'NV',
    },
    {
        label: 'New Hampshire',
        value: 'NH',
    },
    {
        label: 'New Jersey',
        value: 'NJ',
    },
    {
        label: 'New Mexico',
        value: 'NM',
    },
    {
        label: 'New York',
        value: 'NY',
    },
    {
        label: 'North Carolina',
        value: 'NC',
    },
    {
        label: 'North Dakota',
        value: 'ND',
    },
    {
        label: 'Northern Mariana Islands',
        value: 'MP',
    },
    {
        label: 'Ohio',
        value: 'OH',
    },
    {
        label: 'Oklahoma',
        value: 'OK',
    },
    {
        label: 'Oregon',
        value: 'OR',
    },
    {
        label: 'Palau',
        value: 'PW',
    },
    {
        label: 'Pennsylvania',
        value: 'PA',
    },
    {
        label: 'Puerto Rico',
        value: 'PR',
    },
    {
        label: 'Rhode Island',
        value: 'RI',
    },
    {
        label: 'South Carolina',
        value: 'SC',
    },
    {
        label: 'South Dakota',
        value: 'SD',
    },
    {
        label: 'Tennessee',
        value: 'TN',
    },
    {
        label: 'Texas',
        value: 'TX',
    },
    {
        label: 'Utah',
        value: 'UT',
    },
    {
        label: 'Vermont',
        value: 'VT',
    },
    {
        label: 'Virgin Islands',
        value: 'VI',
    },
    {
        label: 'Virginia',
        value: 'VA',
    },
    {
        label: 'Washington',
        value: 'WA',
    },
    {
        label: 'West Virginia',
        value: 'WV',
    },
    {
        label: 'Wisconsin',
        value: 'WI',
    },
    {
        label: 'Wyoming',
        value: 'WY',
    },
];

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
                                                Contact person name
                                            </Typography>
                                            <Select
                                                type="single"
                                                placeholder="Select state"
                                                options={[...US_STATES_SELECT_OPTIONS]}
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
                                                value={field.state.value}
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
                                    if (isInvalid) {
                                        return;
                                    }
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
