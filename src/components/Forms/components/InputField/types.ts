import type { InputProps } from '@base-ui/react/input';
import type { NumericFormatProps } from 'react-number-format';
import type { FormFieldProps } from '../../types';

export type InputFieldProps = FormFieldProps<{
    /**
     * The type of the input.
     */
    type?: string;
    /**
     * The props for the numeric format.
     */
    numericFormatProps?: Omit<NumericFormatProps, 'size'>;
}> &
    Omit<InputProps, 'value' | 'onChange' | 'defaultValue' | 'type' | 'size'>;
