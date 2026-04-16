import type { TanStackDevtoolsReactInit } from '@tanstack/react-devtools';
import React from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ToastNotificationContext } from '@/context/ToastNotificationContext';

type DevtoolsComponent = React.ComponentType<TanStackDevtoolsReactInit>;
type PanelComponent = React.ComponentType<Record<string, never>>;

let TanStackDevtools: DevtoolsComponent = () => {
    return null;
};
let TanStackRouterPanel: PanelComponent = () => {
    return null;
};
let ReactQueryPanel: PanelComponent = () => {
    return null;
};

if (import.meta.env.DEV) {
    TanStackDevtools = React.lazy(async () => {
        const res = await import('@tanstack/react-devtools');
        return { default: res.TanStackDevtools };
    });

    TanStackRouterPanel = React.lazy(async () => {
        const res = await import('@tanstack/router-devtools');
        return { default: res.TanStackRouterDevtoolsPanel };
    });

    ReactQueryPanel = React.lazy(async () => {
        const res = await import('@tanstack/react-query-devtools');
        return { default: res.ReactQueryDevtoolsPanel };
    });
}

export const Route = createRootRoute({
    head() {
        return {
            meta: [
                { name: 'title', content: 'Lasco' },
                { name: 'description', content: 'Lasco' },
            ],
        };
    },
    component() {
        return (
            <ToastNotificationContext>
                <Outlet />

                {import.meta.env.DEV && (
                    <React.Suspense fallback={null}>
                        <TanStackDevtools
                            config={{ position: 'bottom-right' }}
                            plugins={[
                                {
                                    name: 'TanStack Query',
                                    render: <ReactQueryPanel />,
                                    defaultOpen: true,
                                },
                                {
                                    name: 'TanStack Router',
                                    render: <TanStackRouterPanel />,
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
