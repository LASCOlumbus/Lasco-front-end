import type { Toast as BaseToast } from '@base-ui/react/toast';

export type ToastVariant = 'success' | 'error';

export type ToastNotificationProps = {
    toast: BaseToast.Root.Props['toast'];
};
