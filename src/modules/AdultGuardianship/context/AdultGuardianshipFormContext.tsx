import {
    adultGuardianshipCaseDetailsStepSchema,
    adultGuardianshipSafetyServiceStepSchema,
    adultGuardianshipWardLocationStepSchema,
} from '@/schemas/formSchemas';
import { FORM_TYPES } from '@/lib/constants';
import { createMultiStepForm } from '@/lib/createMultiStepForm';
import { AdultGuardianshipForm, AdultGuardianshipFormStep } from '@/lib/types';

const ADULT_GUARDIANSHIP_FORM_INITIAL_STATE: AdultGuardianshipForm = {
    caseDetailsStep: {
        guardianName: '',
        caseNumber: '',
        contactName: '',
        contactPhone: '',
    },
    wardLocationStep: {
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        wardPhone: '',
    },
    safetyServiceStep: {
        isProspectiveWardLeaveDuringDay: {
            answer: null,
            explanation: '',
        },
        specialCircumstances: {
            answer: null,
            explanation: '',
        },
        isProspectiveWardHasCommunicationIssues: {
            answer: null,
            explanation: '',
        },
    },
};
export const ADULT_GUARDIANSHIP_FORM_STEPS = {
    caseDetailsStep: {
        id: 'caseDetailsStep',
        label: 'Case details',
        schema: adultGuardianshipCaseDetailsStepSchema,
        enabled: true,
    },
    wardLocationStep: {
        id: 'wardLocationStep',
        label: 'Ward location',
        schema: adultGuardianshipWardLocationStepSchema,
        enabled: true,
    },
    safetyServiceStep: {
        id: 'safetyServiceStep',
        label: 'Safety & service',
        schema: adultGuardianshipSafetyServiceStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof AdultGuardianshipForm, AdultGuardianshipFormStep>;

const {
    Provider: BaseProvider,
    useFormContext,
    useStepForm,
} = createMultiStepForm<AdultGuardianshipForm>(FORM_TYPES._ADULT_GUARDIANSHIP);

const ADULT_GUARDIANSHIP_FORM_CONFIG = {
    storageKey: 'ADULT_GUARDIANSHIP_multi-step-form',
    submittedKey: 'ADULT_GUARDIANSHIP_multi-step-form-step_submitted',
    successfulKey: 'ADULT_GUARDIANSHIP_multi-step-form-step_successful',
    initialState: ADULT_GUARDIANSHIP_FORM_INITIAL_STATE,
    steps: ADULT_GUARDIANSHIP_FORM_STEPS,
};

export const AdultGuardianshipFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <BaseProvider config={ADULT_GUARDIANSHIP_FORM_CONFIG}>{children}</BaseProvider>;
};

export const useAdultGuardianshipFormContext = useFormContext;
export const useAdultGuardianshipFormStepForm = useStepForm;
