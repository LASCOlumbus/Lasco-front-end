'use client';

import { webcheckWaiverStepSchema } from '@/schemas/formSchemas';
import { FORM_TYPES } from '@/lib/constants';
import { createMultiStepForm } from '@/lib/createMultiStepForm';
import { WebcheckWaiverForm, WebcheckWaiverFormStep } from '@/lib/types';

const WEBCHECK_WAIVER_FORM_STEPS = {
    webcheckWaiverStep: {
        id: 'webcheckWaiverStep',
        label: 'Webcheck Waiver',
        schema: webcheckWaiverStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof WebcheckWaiverForm, WebcheckWaiverFormStep>;
const WEBCHECK_WAIVER_FORM_INITIAL_STATE: WebcheckWaiverForm = {
    webcheckWaiverStep: {
        guardianName: '',
        caseNumber: '',
        applicantName: '',
    },
};

const {
    Provider: BaseProvider,
    useFormContext,
    useStepForm,
} = createMultiStepForm<WebcheckWaiverForm>(FORM_TYPES._WEBCHECK_WAIVER);

const WEBCHECK_WAIVER_FORM_CONFIG = {
    storageKey: 'WEBCHECK_WAIVER_multi-step-form',
    submittedKey: 'WEBCHECK_WAIVER_multi-step-form-step_submitted',
    successfulKey: 'WEBCHECK_WAIVER_multi-step-form-step_successful',
    initialState: WEBCHECK_WAIVER_FORM_INITIAL_STATE,
    steps: WEBCHECK_WAIVER_FORM_STEPS,
};

export const WebcheckWaiverFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <BaseProvider config={WEBCHECK_WAIVER_FORM_CONFIG}>{children}</BaseProvider>;
};

export const useWebcheckWaiverFormContext = useFormContext;
export const useWebcheckWaiverFormStepForm = useStepForm;
