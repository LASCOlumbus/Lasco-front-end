import { useRender } from '@base-ui/react/use-render';

export type ButtonVariant = 'primary' | 'secondary' | 'link';
export type ButtonSize = 'big' | 'medium' | 'small';

export type ButtonProps = useRender.ComponentProps<'button'> & {
    /**
     * The variant of the button
     * @see {@link ButtonVariant}
     * @default 'primary'
     */
    variant?: ButtonVariant;
    /**
     * The size of the button
     * @see {@link ButtonSize}
     * @default 'big'
     */
    size?: ButtonSize;
    /**
     * Whether the button is an icon button
     * @default false
     */
    isIcon?: boolean;
};
