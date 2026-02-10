import { createLazyFileRoute } from '@tanstack/react-router';
import ApplicationForAppointment from '@/modules/ApplicationForAppointment';

export const Route = createLazyFileRoute('/application-for-appointment/')({
    component: ApplicationForAppointment,
});
