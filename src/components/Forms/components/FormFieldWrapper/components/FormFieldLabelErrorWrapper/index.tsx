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
        <div className={clsx(s.wrap, className)}>
            {label ? (
                <Typography
                    className={clsx(s.label, 'form-field-label')}
                    variant="body-m"
                    render={<label htmlFor={name} />}
                >
                    {label}
                </Typography>
            ) : null}
            {children}
            {errorMessage && (
                <Typography variant="body-m" className={clsx(s['error-wrap'], 'form-field-label-error')}>
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
};

export default React.memo(FormFieldLabelErrorWrapper);
