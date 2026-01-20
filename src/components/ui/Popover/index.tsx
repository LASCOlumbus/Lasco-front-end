import type { PopoverContentProps } from './types';
import React from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import clsx from 'clsx';
import s from './styles.module.css';

const PopoverContent: React.FC<PopoverContentProps> = ({ className, portalProps, positionerProps, ...props }) => {
    return (
        <BasePopover.Portal {...portalProps}>
            <BasePopover.Positioner {...positionerProps}>
                <BasePopover.Popup className={clsx(s.content, className)} {...props} />
            </BasePopover.Positioner>
        </BasePopover.Portal>
    );
};

const Popover = BasePopover.Root;
const PopoverTrigger = BasePopover.Trigger;

export { Popover, PopoverContent, PopoverTrigger };
