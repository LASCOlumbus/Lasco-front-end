import { createLazyFileRoute } from '@tanstack/react-router';
import { noopReturnNull } from '@/lib/utils/noopReturnNull';

export const Route = createLazyFileRoute('/')({
    component: noopReturnNull,
});
