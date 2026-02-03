import type { InputFieldProps } from './types';
import { NumericFormat } from 'react-number-format';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import Input from '@/components/ui/Input';
import { useFieldContext } from '../../context/FormContext';
import FormFieldWrapper from '../FormFieldWrapper';

export const InputField: React.FC<InputFieldProps> = ({
    name,
    className,
    type,
    label,
    numericFormatProps,
    ...rest
}) => {
    const field = useFieldContext<string | number | undefined>();

    const fieldErrorMessage = getFieldErrorMessage(field.state.meta.errors);

    if (type === 'number') {
        return (
            <FormFieldWrapper name={name} label={label} errorMessage={fieldErrorMessage}>
                <NumericFormat
                    className={className}
                    {...rest}
                    {...numericFormatProps}
                    value={field.state.value}
                    allowNegative={false}
                    thousandSeparator
                    id={name || field.name}
                    name={name || field.name}
                    errorMessage={fieldErrorMessage}
                    customInput={Input}
                    onValueChange={({ floatValue }) => {
                        field.handleChange(floatValue);
                    }}
                />
            </FormFieldWrapper>
        );
    }

    return (
        <FormFieldWrapper name={name} label={label} errorMessage={fieldErrorMessage}>
            <Input
                className={className}
                {...rest}
                type={type}
                value={field.state.value}
                id={name || field.name}
                name={name || field.name}
                errorMessage={fieldErrorMessage}
                onChange={(e) => {
                    field.handleChange(e.target.value);
                }}
            />
        </FormFieldWrapper>
    );
};
