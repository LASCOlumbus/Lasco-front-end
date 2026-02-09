import React from 'react';
import clsx from 'clsx';
import s from './styles.module.css';

export const FieldSetCard: React.FC<React.ComponentProps<'fieldset'>> = ({ ref, className, children, ...props }) => {
    return (
        <fieldset ref={ref} className={clsx(s.root, className)} {...props}>
            {children}
        </fieldset>
    );
};

FieldSetCard.displayName = 'FieldSetCard';
