import type { E164Number } from 'libphonenumber-js/core';
import type { PhoneInputFieldProps } from './types';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import PhoneInput from '@/components/ui/Input/components/PhoneInput';
import { useFieldContext } from '../../context/FormContext';
import FormFieldWrapper from '../FormFieldWrapper';

export const PhoneInputField: React.FC<PhoneInputFieldProps> = ({ name, className, label, ...rest }) => {
    const field = useFieldContext<string | null>();

    const fieldErrorMessage = getFieldErrorMessage(field.state.meta.errors);

    return (
        <FormFieldWrapper name={name} label={label} errorMessage={fieldErrorMessage}>
            <PhoneInput
                className={className}
                {...rest}
                value={field.state.value ?? ''}
                id={name || field.name}
                errorMessage={fieldErrorMessage}
                onChange={(value?: E164Number) => {
                    field.handleChange(value ?? '');
                }}
            />
        </FormFieldWrapper>
    );
};
