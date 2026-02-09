import { createLazyFileRoute } from '@tanstack/react-router';
import AdultJurisdictionAffidavit from '@/modules/AdultJurisdictionAffidavit';

export const Route = createLazyFileRoute('/adult-jurisdiction-affidavit/')({
    component: AdultJurisdictionAffidavit,
});
