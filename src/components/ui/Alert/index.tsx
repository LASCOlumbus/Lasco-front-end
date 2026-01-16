import type { AlertProps } from './types';
import { Component as InfoCircleIcon } from '@/icons/info-circle_20.svg?svgUse';
import clsx from 'clsx';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

export const Alert: React.FC<AlertProps> = ({ children, className, ...rest }) => {
    return (
        <div className={clsx(s.wrap, className)} {...rest}>
            <InfoCircleIcon className={s.icon} />
            <Typography variant="body-m" className={s.description}>
                {children}
            </Typography>
        </div>
    );
};
