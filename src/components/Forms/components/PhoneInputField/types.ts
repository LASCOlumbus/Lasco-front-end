import type { FormFieldProps } from '../../types';
import { PhoneInputProps } from '@/components/ui/Input/components/PhoneInput/types';

export type PhoneInputFieldProps = FormFieldProps<
    Omit<PhoneInputProps, 'value' | 'onChange' | 'defaultValue' | 'size' | 'onCountryChange'>
>;
