import type { RadioGroupItemProps } from './types';
import clsx from 'clsx';
import { ChoiceInputWithLabelWrapper } from '@/components/ui/ChoiceInputWithLabelWrapper';
import { Radio } from '@/components/ui/Radio';
import s from './styles.module.css';

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ className, label, value, ...radioProps }) => {
    // Note: Radio buttons are controlled by RadioGroup via context.
    // The checked state is managed by RadioGroup, and we use CSS :has() selector
    // to style the wrapper based on the radio's data-checked attribute.
    return (
        <ChoiceInputWithLabelWrapper
            className={clsx(s.wrap, className)}
            checked={false}
            disabled={radioProps.disabled}
            label={label}
        >
            <Radio {...radioProps} value={value} />
        </ChoiceInputWithLabelWrapper>
    );
};
