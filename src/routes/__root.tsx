import React from 'react';
import { TanStackDevtoolsReactInit } from '@tanstack/react-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ToastNotificationContext } from '@/context/ToastNotificationContext';

let TanStackDevtools: React.ComponentType<TanStackDevtoolsReactInit> = () => {
    return null;
};

let TanStackRouterDevtoolsPanel: React.ComponentType<Record<string, never>> = () => {
    return null;
};

let ReactQueryDevtoolsPanel: React.ComponentType<Record<string, never>> = () => {
    return null;
};

if (process.env.NODE_ENV === 'development') {
    TanStackDevtools = React.lazy(async () => {
        const res = await import('@tanstack/react-devtools');
        return { default: res.TanStackDevtools };
    });

    TanStackRouterDevtoolsPanel = React.lazy(async () => {
        const res = await import('@tanstack/router-devtools');
        return { default: res.TanStackRouterDevtoolsPanel };
    });

    ReactQueryDevtoolsPanel = React.lazy(async () => {
        const res = await import('@tanstack/react-query-devtools');
        return { default: res.ReactQueryDevtoolsPanel };
    });
}
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

                {process.env.NODE_ENV === 'development' && (
                    <React.Suspense>
                        <TanStackDevtools
                            config={{
                                position: 'bottom-right',
                            }}
                            plugins={[
                                {
                                    name: 'TanStack Query',
                                    render: <ReactQueryDevtoolsPanel />,
                                    defaultOpen: true,
                                },
                                {
                                    name: 'TanStack Router',
                                    render: <TanStackRouterDevtoolsPanel />,
                                    defaultOpen: false,
                                },
                            ]}
                        />
                    </React.Suspense>
                )}
            </ToastNotificationContext>
        );
    },
});
