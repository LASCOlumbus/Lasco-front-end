import type { WithChildren, WithClassName } from '@/lib/types';

export type ChoiceInputWithLabelWrapperProps = WithClassName<
    WithChildren<{
        /**
         * The label for the choice input
         */
        label: React.ReactNode;
        /**
         * Whether the choice input is checked
         */
        checked?: boolean;
        /**
         * Whether the choice input is disabled
         */
        disabled?: boolean;
    }>
>;
