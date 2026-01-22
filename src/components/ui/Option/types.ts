import type React from 'react';

export type OptionProps = React.ComponentProps<'button'> & {
    /**
     * Whether the option is selected.
     * Controls the visibility of the checkmark on the right side.
     */
    isSelected?: boolean;
    /**
     * Left part of the option row.
     * Typically text or any custom React node.
     */
    children: React.ReactNode;
};
