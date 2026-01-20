'use client';

import React from 'react';
import clsx from 'clsx';
import type { TextAreaProps } from './types';
import s from './styles.module.css';

const TextArea: React.FC<TextAreaProps> = ({ className, errorMessage, ...rest }) => {
    return (
        <textarea
            className={clsx(s.wrap, 'focus-primary', className, {
                [s.error]: !!errorMessage,
            })}
            rows={4}
            {...rest}
        />
    );
};

export default React.memo(TextArea);
