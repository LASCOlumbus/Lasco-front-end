import type { ToastNotificationProps } from './types';
import { Component as CheckCircleIcon } from '@/icons/check-circle_20.svg?svgUse';
import { Component as DangerIcon } from '@/icons/danger_20.svg?svgUse';
import { Toast } from '@base-ui/react/toast';
import s from './styles.module.css';

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toast }) => {
    const variant = (toast.type as 'success' | 'error' | undefined) || 'success';

    const Icon = variant === 'success' ? CheckCircleIcon : DangerIcon;

    return (
        <Toast.Root toast={toast} className={s.wrap} data-variant={variant}>
            <Toast.Content className={s.content}>
                <div className={s.header}>
                    <Icon className={s.icon} />
                    {toast.title && <Toast.Title className={s.title}>{toast.title}</Toast.Title>}
                </div>
                {toast.description && <Toast.Description className={s.description}>{toast.description}</Toast.Description>}
                <Toast.Close className={s.close} aria-label="Close">
                    ✕
                </Toast.Close>
            </Toast.Content>
        </Toast.Root>
    );
};
