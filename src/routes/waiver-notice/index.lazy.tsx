import { createLazyFileRoute } from '@tanstack/react-router';
import WaiverNotice from '@/modules/WaiverNotice';

export const Route = createLazyFileRoute('/waiver-notice/')({
    component: WaiverNotice,
});
