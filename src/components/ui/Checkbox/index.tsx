import type { CheckboxProps } from './types';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import clsx from 'clsx';
import s from './styles.module.css';

export const Checkbox: React.FC<CheckboxProps> = ({ className, indeterminate = false, ...rest }) => {
    return (
        <BaseCheckbox.Root className={clsx(s.wrap, 'focus-primary', className)} indeterminate={indeterminate} {...rest}>
            <BaseCheckbox.Indicator className={s.indicator}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.6666 3.5L5.24998 9.91667L2.33331 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={indeterminate ? '0' : '1'}
                    />
                    <line
                        x1="4"
                        y1="7"
                        x2="10"
                        y2="7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity={indeterminate ? '1' : '0'}
                    />
                </svg>
            </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
    );
};
