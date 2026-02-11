import type { LoaderProps } from './types';
import React from 'react';
import clsx from 'clsx';
import s from './styles.module.css';

const Loader: React.FC<LoaderProps> = ({ className }) => {
    return (
        <svg className={clsx(s.wrap, className)} viewBox="0 0 100 100">
            <defs>
                <linearGradient id="gradient">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="gradient-2">
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.5" />
                </linearGradient>
                <mask id="loader-mask">
                    <rect x="0" y="50" width="100" height="100" fill="url(#gradient)" />
                </mask>
                <mask id="loader-mask-2">
                    <rect x="0" y="0" width="100" height="50" fill="url(#gradient-2)" />
                </mask>
            </defs>
            <circle cx="50" cy="50" r="40" stroke="var(--loader-color)" strokeWidth="10" fill="none" mask="url(#loader-mask)" />
            <circle cx="50" cy="50" r="40" stroke="var(--loader-color)" strokeWidth="10" fill="none" mask="url(#loader-mask-2)" />
        </svg>
    );
};

export default React.memo(Loader);
