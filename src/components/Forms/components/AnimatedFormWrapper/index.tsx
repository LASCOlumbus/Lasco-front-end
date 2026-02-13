import type { AnimatedFormWrapperProps } from '@/lib/types';
import React from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import s from './styles.module.css';

const AnimatedFormWrapper: React.FC<React.PropsWithChildren<AnimatedFormWrapperProps>> = ({ children, isLoading, animationDirection, currentStepIndex }) => {
    if (isLoading) {
        return <ResponsiveLoader />;
    }

    return (
        <MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0 }}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div className={s.motion} key={currentStepIndex} initial={{ x: animationDirection === 'next' ? '110%' : '-110%', scale: 0.9, opacity: 0 }} animate={{ x: 0, opacity: 1, scale: 1 }} exit={{ x: animationDirection === 'next' ? '-110%' : '110%', scale: 0.9, opacity: 0 }}>
                    {children}
                </motion.div>
            </AnimatePresence>
        </MotionConfig>
    );
};

export default AnimatedFormWrapper;
