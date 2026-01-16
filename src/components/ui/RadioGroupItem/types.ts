import type { RadioProps } from '@/components/ui/Radio/types';
import type { WithClassName } from '@/lib/types';

export type RadioGroupItemProps = RadioProps &
    WithClassName<{
        /**
         * The label for the radio item
         * Can be a string or React node
         */
        label: React.ReactNode;
    }>;
