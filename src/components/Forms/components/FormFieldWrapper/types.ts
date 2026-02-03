import type { FormFieldProps } from '../../types';
import React from 'react';

export type FormFieldWrapperProps = FormFieldProps<React.PropsWithChildren> & {
    /**
     * Custom error message to display
     */
    errorMessage?: string;
};
