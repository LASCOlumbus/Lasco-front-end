import React from 'react';
import s from './styles.module.css';

const ResponsiveLoader: React.FC = () => {
    return (
        <div className={s['loader-container']}>
            <div className={s.loader} />
        </div>
    );
};
export default ResponsiveLoader;
