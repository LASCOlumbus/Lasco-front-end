import type { CheckboxProps } from '@/components/ui/Checkbox/types';
import { WithClassName } from '@/lib/types';

export type CheckboxGroupItemProps = CheckboxProps &
    WithClassName<{
        /**
         * The label for the checkbox item
         * Can be a string or React node
         */
        label: React.ReactNode;
    }>;
