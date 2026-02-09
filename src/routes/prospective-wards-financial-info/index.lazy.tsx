import { createLazyFileRoute } from '@tanstack/react-router';
import ProspectiveWardsFinancialInfo from '@/modules/ProspectiveWardsFinancialInfoForm';

export const Route = createLazyFileRoute('/prospective-wards-financial-info/')({
    component: ProspectiveWardsFinancialInfo,
});
