import type { WithClassName } from '@/lib/types';

export type FormFieldProps<TProps = unknown> = WithClassName<{
    /**
     * The name of the field. Used to identify the field in the form state and to focus the field on label click
     */
    name: string;
    /**
     * The label of the field
     */
    label?: React.ReactNode;
}> &
    TProps;
