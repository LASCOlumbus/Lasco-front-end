import type { ComponentSectionProps } from './types';
import clsx from 'clsx';
import s from './styles.module.css';

export const ComponentSection: React.FC<ComponentSectionProps> = ({ title, children, className }) => {
    return (
        <div className={clsx(s.wrap, className)}>
            <h2 className={s.title}>{title}</h2>
            <div className={s.content}>{children}</div>
        </div>
    );
};
