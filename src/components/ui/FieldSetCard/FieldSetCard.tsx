import React, { forwardRef } from 'react';
import clsx from 'clsx';
import s from './styles.module.css';

export const FieldSetCard = forwardRef<HTMLFieldSetElement, React.ComponentProps<'fieldset'>>(
    ({ className, children, ...props }, ref) => {
        return (
            <fieldset ref={ref} className={clsx(s.root, className)} {...props}>
                {children}
            </fieldset>
        );
    }
);

FieldSetCard.displayName = 'FieldSetCard';
