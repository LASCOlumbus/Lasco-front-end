import type { E164Number } from 'libphonenumber-js/core';
import type { InputProps } from '@/components/ui/Input/types';
import type { PhoneInputProps } from './types';
import React from 'react';
import clsx from 'clsx';
import RPNInput from 'react-phone-number-input';
import Input from '@/components/ui/Input';
import CountrySelect, { FlagComponent } from './components/CountrySelect';
import s from './styles.module.css';

const PhoneInputComponent: React.FC<InputProps> = ({ className, ...rest }) => {
    return <Input className={clsx(s.input, 'focus-primary', className)} {...rest} />;
};

const PhoneInput: React.FC<PhoneInputProps> = ({ id, className, errorMessage, ...rest }) => {
    const generatedId = React.useId();

    return (
        <RPNInput
            className={clsx(s.wrap, 'focus-within-primary', className, {
                [s.error]: !!errorMessage,
            })}
            international
            defaultCountry="US"
            addInternationalOption={false}
            placeholder="Enter phone number"
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={PhoneInputComponent}
            id={id ?? generatedId}
            {...rest}
            value={rest?.value ?? ''}
            onChange={(value) => {
                rest?.onChange?.(value ?? ('' as E164Number));
            }}
        />
    );
};

PhoneInput.displayName = 'PhoneInput';

export default React.memo(PhoneInput);
