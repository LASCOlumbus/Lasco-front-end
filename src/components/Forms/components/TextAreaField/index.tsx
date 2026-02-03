import type { TextAreaFieldProps } from './types';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import TextArea from '@/components/ui/TextArea';
import { useFieldContext } from '../../context/FormContext';
import FormFieldWrapper from '../FormFieldWrapper';

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ name, className, label, ...rest }) => {
    const field = useFieldContext<string | undefined>();

    const fieldErrorMessage = getFieldErrorMessage(field.state.meta.errors);

    return (
        <FormFieldWrapper name={name} label={label} errorMessage={fieldErrorMessage}>
            <TextArea
                className={className}
                {...rest}
                value={field.state.value ?? ''}
                id={name || field.name}
                errorMessage={fieldErrorMessage}
                onChange={(event) => {
                    field.handleChange(event.target.value);
                }}
            />
        </FormFieldWrapper>
    );
};
