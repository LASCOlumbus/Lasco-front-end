import { createLazyFileRoute } from '@tanstack/react-router';
import ApplicantCredibilityApplication from '@/modules/ApplicantCredibilityApplication';

export const Route = createLazyFileRoute('/applicant-credibility-application/')({
    component: ApplicantCredibilityApplication,
});
