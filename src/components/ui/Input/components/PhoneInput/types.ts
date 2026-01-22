import type { Props as RPNInputProps } from 'react-phone-number-input';
import type { InputProps } from '@/components/ui/Input/types';
import type { WithClassName } from '@/lib/types';

export type PhoneInputProps = WithClassName<
    Pick<RPNInputProps<InputProps>, 'value' | 'onChange' | 'onCountryChange'>
> & {
    id?: string;
    /**
     * Error message
     */
    errorMessage?: string;
};
