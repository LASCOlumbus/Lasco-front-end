import type { InputProps } from './types';
import React from 'react';
import { Input as BaseInput } from '@base-ui/react/input';
import clsx from 'clsx';
import Loader from '@/components/ui/Loader';
import s from './styles.module.css';

const Input: React.FC<InputProps> = ({ className, size = 'default', leftAddon, rightAddon, errorMessage, isLoading, ...rest }) => {
    return (
        <div className={clsx(s.wrap, s[size], 'focus-within-primary', className, { [s.error]: !!errorMessage })}>
            {leftAddon ? (
                <div className={clsx(s.addon, s.left)} aria-hidden>
                    {leftAddon}
                </div>
            ) : null}
            <BaseInput
                className={clsx(s.input, 'input-inner', {
                    [s['with-left-addon']]: !!leftAddon,
                    [s['with-right-addon']]: !!rightAddon,
                })}
                {...rest}
            />
            {isLoading || rightAddon ? (
                <div className={clsx(s.addon, s.right)} aria-hidden>
                    {isLoading ? <Loader /> : rightAddon}
                </div>
            ) : null}
        </div>
    );
};

export default Input;
