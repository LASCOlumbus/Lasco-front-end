import { createLazyFileRoute } from '@tanstack/react-router';
import NextKinProspectiveWard from '@/modules/NextKinProspectiveWard';

export const Route = createLazyFileRoute('/next-kin-prospective-ward/')({
    component: NextKinProspectiveWard,
});
