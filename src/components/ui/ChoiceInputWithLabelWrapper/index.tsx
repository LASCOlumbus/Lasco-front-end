import type { ChoiceInputWithLabelWrapperProps } from './types';
import clsx from 'clsx';
import s from './styles.module.css';

export const ChoiceInputWithLabelWrapper: React.FC<ChoiceInputWithLabelWrapperProps> = ({ className, children, label, checked, disabled }) => {
    return (
        <label className={clsx(s.wrap, 'focus-primary', className)} data-checked={checked ? '' : undefined} data-disabled={disabled ? '' : undefined}>
            {children}
            <span className={s.label}>{label}</span>
        </label>
    );
};
