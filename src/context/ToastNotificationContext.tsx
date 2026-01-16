import type { WithChildren } from '@/lib/types';
import { Toast } from '@base-ui/react/toast';
import { toastManager } from '@/lib/@toastManager';
import { ToastNotificationsList } from '@/components/ToastNotificationsList';

export const ToastNotificationContext: React.FC<WithChildren> = ({ children }) => {
    return (
        <Toast.Provider toastManager={toastManager}>
            {children}
            <Toast.Portal>
                <Toast.Viewport className="toast-viewport">
                    <ToastNotificationsList />
                </Toast.Viewport>
            </Toast.Portal>
        </Toast.Provider>
    );
};
