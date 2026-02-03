import type { FormFieldProps } from '../../types';
import { SelectProps } from '@/components/ui/Select/types';

export type SelectFieldProps = FormFieldProps<Omit<SelectProps, 'value' | 'onChange' | 'search' | 'onSearchChange'>>;
