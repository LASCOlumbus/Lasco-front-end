import type { BaseErrorData } from '@/lib/@http';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { toastManager } from '@/lib/@toastManager';
import { COMMON_ERROR_MESSAGE } from '@/lib/constants';

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: HTTPError<BaseErrorData>;
    }
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            throwOnError: true,
        },
        mutations: {
            retry: false,
        },
    },
    queryCache: new QueryCache({
        async onError(error, query) {
            const hasQueryData = query.state.data !== undefined;

            if (hasQueryData && error instanceof HTTPError) {
                const parsedErrorData = await error.response.json();
                // TODO: The API error messages should be aligned with BE engineers
                toastManager.add({
                    type: 'error',
                    title: 'Error',
                    description: parsedErrorData.message || error.message,
                    timeout: 5000,
                });
            } else if (hasQueryData && error instanceof Error) {
                toastManager.add({
                    type: 'error',
                    title: 'Error',
                    description: error?.message || COMMON_ERROR_MESSAGE,
                    timeout: 5000,
                });
            }
        },
    }),
});
