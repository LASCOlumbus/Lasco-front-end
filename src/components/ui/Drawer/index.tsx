'use client';

import type {
    DrawerContentProps,
    DrawerDescriptionProps,
    DrawerFooterProps,
    DrawerHeaderProps,
    DrawerOverlayProps,
    DrawerRootProps,
    DrawerTitleProps,
} from './types';
import React from 'react';
import { Component as Close16Icon } from '@/icons/close_16.svg?svgUse';
import clsx from 'clsx';
import { Drawer as DrawerPrimitive } from 'vaul';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

const Drawer: React.FC<DrawerRootProps> = ({ shouldScaleBackground = true, ...rest }) => {
    return <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...rest} />;
};
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay: React.FC<DrawerOverlayProps> = ({ className, ...rest }) => {
    return <DrawerPrimitive.Overlay className={clsx(s.overlay, className)} {...rest} />;
};
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent: React.FC<DrawerContentProps> = ({ className, children, ...rest }) => {
    return (
        <DrawerPortal>
            <DrawerOverlay />
            <DrawerPrimitive.Content className={clsx(s.content, className)} {...rest}>
                {children}
            </DrawerPrimitive.Content>
        </DrawerPortal>
    );
};
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ className, children, ...rest }) => {
    return (
        <div className={clsx(s.header, className)} {...rest}>
            {children}
            <DrawerClose asChild>
                <Button variant="link" size="small" isIcon>
                    <Close16Icon />
                </Button>
            </DrawerClose>
        </div>
    );
};
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter: React.FC<DrawerFooterProps> = ({ className, ...rest }) => {
    return <div className={clsx(s.footer, className)} {...rest} />;
};
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle: React.FC<DrawerTitleProps> = ({ className, ...rest }) => {
    return (
        <Typography
            className={clsx(s.title, className)}
            variant="body-m"
            render={<DrawerPrimitive.Title {...rest} />}
        />
    );
};
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription: React.FC<DrawerDescriptionProps> = ({ className, ...rest }) => {
    return (
        <Typography
            className={clsx(s.description, className)}
            variant="body-s"
            render={<DrawerPrimitive.Description {...rest} />}
        />
    );
};
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
};
