import type { E164Number } from 'libphonenumber-js/core';
import type { InputProps } from '@/components/ui/Input/types';
import type { PhoneInputProps } from './types';
import React from 'react';
import clsx from 'clsx';
import RPNInput, { isValidPhoneNumber } from 'react-phone-number-input';
import Input from '@/components/ui/Input';
import CountrySelect, { FlagComponent } from './components/CountrySelect';
import s from './styles.module.css';

const PhoneInputComponent: React.FC<InputProps> = ({ className, ...rest }) => {
    return <Input className={clsx(s.input, className)} {...rest} />;
};

const PhoneInput: React.FC<PhoneInputProps> = ({ id, className, errorMessage, ...rest }) => {
    const generatedId = React.useId();
    const rawValue = rest?.value ?? '';
    const value = isValidPhoneNumber(rawValue) ? (rawValue as E164Number) : ('' as E164Number);

    return (
        <RPNInput
            className={clsx(s.wrap, className, {
                [s.error]: !!errorMessage,
            })}
            international
            defaultCountry="US"
            addInternationalOption={false}
            placeholder="Enter phone number"
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={PhoneInputComponent}
            withCountryCallingCode
            id={id ?? generatedId}
            {...rest}
            value={value}
            onChange={(next) => {
                rest?.onChange?.(next ?? ('' as E164Number));
            }}
        />
    );
};
PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
