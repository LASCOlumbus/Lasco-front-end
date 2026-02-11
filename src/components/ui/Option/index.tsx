import type { OptionProps } from './types';
import React from 'react';
import { Component as Check16Icon } from '@/icons/check_16.svg?svgUse';
import clsx from 'clsx';
import s from './styles.module.css';

export const Option: React.FC<OptionProps> = ({ className, isSelected = false, children, ...rest }) => {
    return (
        <button className={clsx(s.wrap, 'truncate', className)} type="button" role="option" aria-selected={isSelected} {...rest}>
            <span className={s.left}>{children}</span>
            <span className={s.right}>
                <Check16Icon className={clsx(s.icon, s.check)} data-selected={isSelected} aria-hidden />
            </span>
        </button>
    );
};

export default Option;
