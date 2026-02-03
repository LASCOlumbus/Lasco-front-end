import type { FormFieldLabelErrorWrapperProps } from './types';
import React from 'react';
import clsx from 'clsx';
import { Typography } from '@/components/ui/Typography';
import s from '../../styles.module.css';

const FormFieldLabelErrorWrapper: React.FC<FormFieldLabelErrorWrapperProps> = ({
    className,
    name,
    label,
    errorMessage,
    children,
}) => {
    return (
        <label className={clsx(s.wrap, className)} htmlFor={name}>
            {label ? (
                <Typography className={clsx(s.label, 'form-field-label')} variant="body-m" render={<strong />}>
                    {label}
                </Typography>
            ) : null}
            {children}
            {errorMessage && (
                <Typography variant="body-m" className={clsx(s['error-wrap'], 'form-field-label-error')}>
                    {errorMessage}
                </Typography>
            )}
        </label>
    );
};

export default React.memo(FormFieldLabelErrorWrapper);
