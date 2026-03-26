import type { Config } from '@svg-use/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEventListener } from '@react-hookz/web';
import { configContext as SvgUseConfigContext } from '@svg-use/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { queryClient } from '@/lib/@queryClient';
import { envSchema } from '@/lib/schemas';
import { checkEnv } from '@/lib/utils/checkEnv';
import { routeTree } from './routeTree.gen';

import '@/styles/index.css';

const router = createRouter({
    routeTree,
    context: {
        queryClient,
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
    defaultPendingMs: 100,
    defaultPendingMinMs: 500,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const svgUseConfig: Config = {
    rewritePath: (pathOrHref) => {
        return pathOrHref;
    },
    runtimeChecksEnabled: import.meta.env.DEV,
};

const App = () => {
    const setVh = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    useEventListener(window, 'resize', setVh);
    useEventListener(window, 'orientationchange', setVh);

    return (
        <SvgUseConfigContext.Provider value={svgUseConfig}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </SvgUseConfigContext.Provider>
    );
};

checkEnv(envSchema);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
