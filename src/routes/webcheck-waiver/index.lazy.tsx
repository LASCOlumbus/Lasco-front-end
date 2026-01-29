import { createLazyFileRoute } from '@tanstack/react-router';
import WebcheckWaiver from '@/modules/WebcheckWaiver';

export const Route = createLazyFileRoute('/webcheck-waiver/')({
    component: WebcheckWaiver,
});
