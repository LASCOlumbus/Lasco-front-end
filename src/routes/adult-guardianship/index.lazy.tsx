import { createLazyFileRoute } from '@tanstack/react-router';
import AdultGuardianshipServiceInformation from '@/modules/AdultGuardianship';

export const Route = createLazyFileRoute('/adult-guardianship/')({
    component: AdultGuardianshipServiceInformation,
});
