import type { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';

export type CheckboxProps = BaseCheckbox.Root.Props & {
    /**
     * Whether the checkbox is in an indeterminate state
     * @default false
     */
    indeterminate?: boolean;
};
