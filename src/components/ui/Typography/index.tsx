import type { TypographyProps } from './types';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import clsx from 'clsx';
import s from './styles.module.css';

export const Typography: React.FC<TypographyProps> = ({ className, variant = 'body-m', render, ...rest }) => {
    const element = useRender({
        defaultTagName: 'p',
        render,
        props: mergeProps<'p'>(
            { className: clsx(s.wrap, className) },
            {
                'data-typography-variant': variant,
            } as Record<string, unknown>,
            rest
        ),
    });

    return element;
};
