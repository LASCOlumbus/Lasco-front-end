import type { RadioProps } from './types';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import clsx from 'clsx';
import s from './styles.module.css';

export const Radio: React.FC<RadioProps> = ({ className, ...rest }) => {
    return (
        <BaseRadio.Root className={clsx(s.wrap, 'focus-primary', className)} {...rest}>
            <BaseRadio.Indicator className={s.indicator}>
                <span className={s['indicator-dot']} />
            </BaseRadio.Indicator>
        </BaseRadio.Root>
    );
};
