import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';

export type ScrollAreaProps = BaseScrollArea.Root.Props & {
    viewportRef?: React.RefObject<HTMLDivElement | null>;
};
export type ScrollAreaScrollBarProps = BaseScrollArea.Scrollbar.Props;
