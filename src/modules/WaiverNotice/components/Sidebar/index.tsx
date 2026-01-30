import React, { useState } from 'react';
import { Component as CheckCircle20Icon } from '@/icons/check-circle_24.svg?svgUse';
import { Component as Progress20Icon } from '@/icons/progress_20.svg?svgUse';
import clsx from 'clsx';
import { useIsTablet } from '@/hooks/useIsTablet.ts';
import { useWaiverNoticeFormContext } from '@/modules/WaiverNotice/context/WaiverNoticeFormContext.tsx';
import { Drawer, DrawerContent, DrawerHeader, DrawerOverlay, DrawerTitle, DrawerTrigger } from '@/components/ui/Drawer';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

const Sidebar: React.FC = () => {
    const { steps, currentStepIndex, isSubmitted, lastPassedStepIndex, goToSelectStep } = useWaiverNoticeFormContext();
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const isTablet = useIsTablet();

    if (isSubmitted) return null;

    return (
        <div className={s.sidebar}>
            {isTablet ? (
                <Drawer open={isDrawerOpened} onOpenChange={setIsDrawerOpened}>
                    <DrawerTrigger asChild>
                        <div className={clsx(s['sidebar-item'])}>
                            <div className={s['sidebar-item-description']}>
                                <Typography variant="body-caption" render={<strong />}>
                                    Step {currentStepIndex + 1}/{steps.length}
                                </Typography>
                                <Typography variant="body-m" render={<strong />}>
                                    {steps[currentStepIndex].label}
                                </Typography>
                            </div>
                            {currentStepIndex < lastPassedStepIndex ? (
                                <CheckCircle20Icon width={22} height={22} color={'#39981F'} />
                            ) : (
                                <Progress20Icon width={22} height={22} color={'#184482'} />
                            )}
                        </div>
                    </DrawerTrigger>
                    <DrawerOverlay className={s['sidebar-overlay']} />
                    <DrawerContent>
                        <div style={{ padding: '16px' }}>
                            <DrawerHeader className={s['sidebar-tablet-header']}>
                                <DrawerTitle>Form steps</DrawerTitle>
                            </DrawerHeader>
                            <div className={s['sidebar-tablet-wrapper']}>
                                {steps.map((step, index) => {
                                    return (
                                        <div
                                            className={clsx(
                                                s['sidebar-item'],
                                                index === currentStepIndex && index === lastPassedStepIndex && s.active
                                            )}
                                            key={step.id}
                                            onClick={() => {
                                                return goToSelectStep(index);
                                            }}
                                        >
                                            <div className={s['sidebar-item-description']}>
                                                <Typography variant="body-caption" render={<strong />}>
                                                    Step {index + 1}/{steps.length}
                                                </Typography>
                                                <Typography variant="body-m" render={<strong />}>
                                                    {step.label}
                                                </Typography>
                                            </div>
                                            {/* eslint-disable-next-line no-nested-ternary */}
                                            {index < lastPassedStepIndex ? (
                                                <CheckCircle20Icon width={22} height={22} color={'#39981F'} />
                                            ) : index === currentStepIndex ? (
                                                <Progress20Icon width={22} height={22} color={'white'} />
                                            ) : null}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
            ) : (
                steps.map((step, index) => {
                    return (
                        <div
                            className={clsx(
                                s['sidebar-item'],
                                index === currentStepIndex && index === lastPassedStepIndex && s.active
                            )}
                            key={step.id}
                            onClick={() => {
                                return goToSelectStep(index);
                            }}
                        >
                            <Typography variant="body-m" render={<strong />}>
                                {step.label}
                            </Typography>
                            {/* eslint-disable-next-line no-nested-ternary */}
                            {index < lastPassedStepIndex ? (
                                <CheckCircle20Icon width={22} height={22} color={'#39981F'} />
                            ) : index === currentStepIndex ? (
                                <Progress20Icon width={22} height={22} color={'white'} />
                            ) : null}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Sidebar;
