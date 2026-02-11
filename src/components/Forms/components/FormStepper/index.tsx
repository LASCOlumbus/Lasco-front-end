import type { FormStepperProps } from './types';
import React from 'react';
import { Component as CheckCircle20Icon } from '@/icons/check-circle_24.svg?svgUse';
import { Component as Progress20Icon } from '@/icons/progress_20.svg?svgUse';
import clsx from 'clsx';
import { useIsTablet } from '@/hooks/useIsTablet';
import StatusIcon from '@/components/Forms/components/FormStepper/components/StatusIcon';
import { Drawer, DrawerContent, DrawerHeader, DrawerOverlay, DrawerTitle, DrawerTrigger } from '@/components/ui/Drawer';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

const FormStepper: React.FC<FormStepperProps> = ({ steps, currentStepIndex, lastPassedStepIndex, onStepClick, isSubmitted }) => {
    const [isDrawerOpened, setIsDrawerOpened] = React.useState(false);
    const isTablet = useIsTablet();
    if (isSubmitted) return null;

    if (isTablet) {
        return (
            <div className={s.root}>
                <Drawer open={isDrawerOpened} onOpenChange={setIsDrawerOpened}>
                    <DrawerTrigger asChild>
                        <div className={clsx(s.item)}>
                            <div className={s['item-description']}>
                                <Typography variant="body-caption" render={<strong />}>
                                    Step {currentStepIndex + 1}/{steps.length}
                                </Typography>
                                <Typography variant="body-m" render={<strong />}>
                                    {steps[currentStepIndex].label}
                                </Typography>
                            </div>

                            {currentStepIndex < lastPassedStepIndex ? <CheckCircle20Icon width={22} height={22} /> : <Progress20Icon width={22} height={22} className={s['progress-icon']} />}
                        </div>
                    </DrawerTrigger>

                    <DrawerOverlay className={s.overlay} />

                    <DrawerContent className={s['drawer-content']}>
                        <DrawerHeader className={s['drawer-header']}>
                            <DrawerTitle>Form steps</DrawerTitle>
                        </DrawerHeader>

                        <div className={s['tabletWrapper']}>
                            {steps.map((step, index) => {
                                return (
                                    <div
                                        key={step.id}
                                        className={clsx(s.item, index === currentStepIndex && s.active, index > lastPassedStepIndex && s.inactive)}
                                        onClick={() => {
                                            if (index <= lastPassedStepIndex) {
                                                onStepClick?.(index);
                                                setIsDrawerOpened(false);
                                            }
                                        }}
                                    >
                                        <div className={s['item-description']}>
                                            <Typography variant="body-caption" render={<strong />}>
                                                Step {index + 1}/{steps.length}
                                            </Typography>
                                            <Typography variant="body-m" render={<strong />}>
                                                {step.label}
                                            </Typography>
                                        </div>

                                        <StatusIcon index={index} currentStepIndex={currentStepIndex} lastPassedStepIndex={lastPassedStepIndex} />
                                    </div>
                                );
                            })}
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        );
    }

    return (
        <div className={s.root}>
            {steps.map((step, index) => {
                return (
                    <div
                        key={step.id}
                        className={clsx(s.item, index === currentStepIndex && s.active, index > lastPassedStepIndex && s.inactive)}
                        onClick={() => {
                            if (index <= lastPassedStepIndex) {
                                onStepClick?.(index);
                            }
                        }}
                    >
                        <Typography variant="body-m" render={<strong />}>
                            {step.label}
                        </Typography>

                        <StatusIcon index={index} currentStepIndex={currentStepIndex} lastPassedStepIndex={lastPassedStepIndex} />
                    </div>
                );
            })}
        </div>
    );
};

export default FormStepper;
