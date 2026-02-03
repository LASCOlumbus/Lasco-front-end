import type { WithClassName } from '@/lib/types';
import React from 'react';

export type FormFieldLabelErrorWrapperProps = WithClassName<
    React.PropsWithChildren<{
        /**
         * The name of the field
         */
        name: string;
        /**
         * The label of the field
         */
        label: React.ReactNode;
        /**
         * The error message of the field
         */
        errorMessage?: React.ReactNode;
        /**
         * Always show error wrapper with min height
         */
        keepErrorWrapVisible?: boolean;
    }>
>;
