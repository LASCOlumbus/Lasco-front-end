import type { PopoverContentProps } from './types';
import React from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import clsx from 'clsx';
import s from './styles.module.css';

const PopoverContent: React.FC<PopoverContentProps> = ({
    className,
    children,
    portalProps,
    positionerProps,
    ...props
}) => {
    return (
        <BasePopover.Portal {...portalProps}>
            <BasePopover.Positioner className={s.positioner} {...positionerProps}>
                <BasePopover.Popup className={clsx(s.content, className)} {...props}>
                    <BasePopover.Viewport className={s.viewport}>{children}</BasePopover.Viewport>
                </BasePopover.Popup>
            </BasePopover.Positioner>
        </BasePopover.Portal>
    );
};

const Popover = BasePopover.Root;
const PopoverTrigger = BasePopover.Trigger;

export { Popover, PopoverContent, PopoverTrigger };
