import type { ScrollAreaProps, ScrollAreaScrollBarProps } from './types';
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import clsx from 'clsx';
import s from './styles.module.css';

const ScrollArea: React.FC<ScrollAreaProps> = ({ viewportRef, className, children, ...rest }) => {
    return (
        <BaseScrollArea.Root className={clsx(s.root, className)} {...rest}>
            <style>
                {`
                    .scroll-area-scrollbar[data-orientation="horizontal"] .scroll-area-scrollbar-thumb {
                        max-width: var(--radix-scroll-area-thumb-width) !important;
                    }
                `}
            </style>
            <BaseScrollArea.Viewport ref={viewportRef} className={clsx(s.viewport, 'scroll-area-viewport')}>
                {children}
            </BaseScrollArea.Viewport>
            <ScrollBar />
            <BaseScrollArea.Corner />
        </BaseScrollArea.Root>
    );
};
ScrollArea.displayName = BaseScrollArea.Root.displayName;

const ScrollBar: React.FC<ScrollAreaScrollBarProps> = ({ className, orientation = 'vertical', ...rest }) => {
    return (
        <BaseScrollArea.Scrollbar
            orientation={orientation}
            className={clsx(s.scrollbar, 'scroll-area-scrollbar', className)}
            {...rest}
        >
            <BaseScrollArea.Thumb className={clsx(s.thumb, 'scroll-area-scrollbar-thumb')} />
        </BaseScrollArea.Scrollbar>
    );
};
ScrollBar.displayName = BaseScrollArea.Scrollbar.displayName;

export { ScrollArea, ScrollBar };
