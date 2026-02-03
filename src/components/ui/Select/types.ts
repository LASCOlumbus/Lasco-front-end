import type { PopoverContentProps } from '@/components/ui/Popover/types';
import type { WithClassName } from '@/lib/types';

export type SelectSize = 'default' | 'sm';

export type SelectOption = {
    /**
     * Label of the option
     */
    label: string;
    /**
     * Value of the option
     */
    value: string | number;
};

export type SingleOptionSelectProps = {
    type: 'single';
    /**
     * Value of the select
     */
    value?: string | number;
    /**
     * Callback function when the select value changes
     */
    onChange?: (_value: string | number) => void;
    /**
     * Singular prefix for the select value
     */
    singularPrefix?: string;
    /**
     * Plural prefix for the select value
     */
    pluralPrefix?: string;
};

export type MultipleOptionSelectProps = {
    type: 'multiple';
    /**
     * Value of the select
     */
    value?: (string | number)[];
    /**
     * Callback function when the select value changes
     */
    onChange?: (_value: (string | number)[]) => void;
    /**
     * Singular prefix for the select value
     */
    singularPrefix: string;
    /**
     * Plural prefix for the select value
     */
    pluralPrefix: string;
};

export type SelectProps = WithClassName<{
    contentClassName?: string;
    /**
     * Placeholder of the select
     */
    placeholder?: string;
    /**
     * Size of the select
     * @default 'default'
     * @see {@link SelectSize}
     */
    size?: SelectSize;
    /**
     * Left addon of the select
     */
    leftAddon?: React.ReactNode;
    /**
     * Whether the select is loading
     */
    isLoading?: boolean;
    /**
     * Whether the select is searchable
     */
    isSearchable?: boolean;
    /**
     * Search of the select
     */
    search?: string;
    /**
     * Whether the select is creatable
     */
    isCreatable?: boolean;
    /**
     * Label of the select
     */
    drawerLabel?: React.ReactNode;
    /**
     * Options of the select
     */
    options: SelectOption[];
    /**
     * Whether the select is disabled
     */
    disabled?: boolean;
    /**
     * Error message of the select
     */
    errorMessage?: string | boolean;
    /**
     * Additional props of the popover content
     */
    contentProps?: PopoverContentProps;
    /**
     * Callback function when the option is created
     */
    onOptionCreate?: (_value: string) => void;
    /**
     * Callback function when the search changes
     */
    onSearchChange?: (_value: string) => void;
}> &
    (SingleOptionSelectProps | MultipleOptionSelectProps);
