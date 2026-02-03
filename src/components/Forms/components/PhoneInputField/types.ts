import type { FormFieldProps } from '../../types';
import { PhoneInputProps } from '@/components/ui/Input/components/PhoneInput/types';

export type PhoneInputFieldProps = FormFieldProps<{
    /**
     * The type of the input.
     */
    type?: string;
}> &
    Omit<PhoneInputProps, 'value' | 'onChange' | 'defaultValue' | 'size'>;
