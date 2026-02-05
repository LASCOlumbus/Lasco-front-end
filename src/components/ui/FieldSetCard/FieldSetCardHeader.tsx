import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

export interface FieldSetCardHeaderProps {
    children: ReactNode;
    className?: string;
}

export const FieldSetCardHeader = ({ children, className }: FieldSetCardHeaderProps) => {
    return (
        <div className={clsx(s.header, className)}>
            <Typography variant="heading-h4" render={<strong />}>
                {children}
            </Typography>
        </div>
    );
};
