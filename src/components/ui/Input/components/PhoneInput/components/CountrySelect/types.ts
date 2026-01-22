import type { Country } from 'react-phone-number-input';

export type CountrySelectOption = {
    label: string;
    value?: Country;
};

export type CountrySelectProps = {
    disabled?: boolean;
    value: Country;
    onChange: (_value: Country) => void;
    options: CountrySelectOption[];
};
