import type { TextAreaProps } from '@/components/ui/TextArea/types';
import type { FormFieldProps } from '../../types';

export type TextAreaFieldProps = FormFieldProps<Omit<TextAreaProps, 'value' | 'onChange' | 'defaultValue' | 'size'>>;
