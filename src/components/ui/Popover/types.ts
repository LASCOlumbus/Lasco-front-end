import type { PopoverPopupProps, PopoverPortalProps, PopoverPositionerProps } from '@base-ui/react/popover';
import type { WithClassName } from '@/lib/types';

export type PopoverContentProps = WithClassName<{
    portalProps?: PopoverPortalProps;
    positionerProps?: PopoverPositionerProps;
}> &
    PopoverPopupProps;
