import { Drawer as DrawerPrimitive } from 'vaul';

export type DrawerRootProps = React.ComponentProps<typeof DrawerPrimitive.Root>;
export type DrawerOverlayProps = React.ComponentProps<typeof DrawerPrimitive.Overlay>;
export type DrawerContentProps = React.ComponentProps<typeof DrawerPrimitive.Content>;
export type DrawerHeaderProps = React.ComponentProps<'div'>;
export type DrawerFooterProps = React.ComponentProps<'div'>;
export type DrawerTitleProps = React.ComponentProps<typeof DrawerPrimitive.Title>;
export type DrawerDescriptionProps = React.ComponentProps<typeof DrawerPrimitive.Description>;
