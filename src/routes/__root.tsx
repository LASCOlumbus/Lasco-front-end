import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ToastNotificationContext } from '@/context/ToastNotificationContext';

export const Route = createRootRoute({
    head() {
        return {
            meta: [
                {
                    name: 'title',
                    content: 'Lasco',
                },
                {
                    name: 'description',
                    content: 'Lasco',
                },
            ],
        };
    },
    component() {
        return (
            <ToastNotificationContext>
                <Outlet />
            </ToastNotificationContext>
        );
    },
});
