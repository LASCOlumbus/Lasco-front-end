import { Toast as BaseToast } from '@base-ui/react/toast';
import { ToastNotification } from '@/components/ui/ToastNotification';

export const ToastNotificationsList: React.FC = () => {
    const { toasts } = BaseToast.useToastManager();
    return (
        <>
            {toasts.map((toast) => {
                return <ToastNotification key={toast.id} toast={toast} />;
            })}
        </>
    );
};
