import type { SelectFieldProps } from './types';
import React from 'react';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import Select from '@/components/ui/Select';
import { useFieldContext } from '../../context/FormContext';
import FormFieldWrapper from '../FormFieldWrapper';

export const SelectField: React.FC<SelectFieldProps> = ({ name, className, type, label, ...rest }) => {
    const field = useFieldContext<string>();

    const [search, setSearch] = React.useState('');

    const fieldErrorMessage = getFieldErrorMessage(field.state.meta.errors);

    return (
        <FormFieldWrapper name={name} label={label} errorMessage={fieldErrorMessage}>
            <Select
                {...rest}
                className={className}
                value={field.state.value}
                type={type as 'single'}
                search={search}
                errorMessage={fieldErrorMessage}
                onChange={(value: string | number) => {
                    field.handleChange(value as string);
                }}
                onSearchChange={(value) => {
                    setSearch(value);
                }}
            />
        </FormFieldWrapper>
    );
};
