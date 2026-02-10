import clsx from 'clsx';
import { FieldSetCardHeaderProps } from '@/components/ui/FieldSetCard/types';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

export const FieldSetCardHeader: React.FC<FieldSetCardHeaderProps> = ({ children, className }) => {
    return (
        <div className={clsx(s.header, className)}>
            <Typography className={s.header} variant="heading-h4" render={<strong />}>
                {children}
            </Typography>
        </div>
    );
};
