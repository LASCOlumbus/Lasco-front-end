import { useRender } from '@base-ui/react/use-render';

export type TypographyVariant =
    | 'heading-h1'
    | 'heading-h2'
    | 'heading-h3'
    | 'heading-h4'
    | 'heading-h5'
    | 'body-m'
    | 'body-s'
    | 'body-caption'
    | 'button-big'
    | 'button-medium'
    | 'button-small';

export type TypographyProps = useRender.ComponentProps<'p'> & {
    /**
     * The variant of the typography
     * @see {@link TypographyVariant}
     * @default 'body-m'
     */
    variant?: TypographyVariant;
};
