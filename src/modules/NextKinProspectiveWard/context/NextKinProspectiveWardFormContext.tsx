import { FORM_TYPES } from '@/lib/constants';
import { createMultiStepForm } from '@/lib/createMultiStepForm';
import { NextKinProspectiveWardForm, NextKinProspectiveWardFormStep } from '@/lib/types';
import {
    nextKinProspectiveWardCaseDetailsStepSchema,
    nextKinProspectiveWardWaiversListStepSchema,
} from '@/modules/NextKinProspectiveWard/schemas/nextKinProspectiveWard';

const NEXT_KIN_PROSPECTIVE_WARD_FORM_INITIAL_STATE: NextKinProspectiveWardForm = {
    caseDetailsStep: {
        guardianName: '',
        caseNumber: '',
        applicantName: '',
    },
    waiversListStep: {
        relatives: [
            {
                fullName: '',
                isRelativeUnder18: false,
                relationship: '',
                address: '',
                zip: '',
            },
        ],
    },
};

export const NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS = {
    caseDetailsStep: {
        id: 'caseDetailsStep',
        label: 'Case details',
        schema: nextKinProspectiveWardCaseDetailsStepSchema,
        enabled: true,
    },
    waiversListStep: {
        id: 'waiversListStep',
        label: 'Waivers list',
        schema: nextKinProspectiveWardWaiversListStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof NextKinProspectiveWardForm, NextKinProspectiveWardFormStep>;

const {
    Provider: BaseProvider,
    useFormContext,
    useStepForm,
} = createMultiStepForm<NextKinProspectiveWardForm>(FORM_TYPES.nextOfKinOfProspectiveWard);

const NEXT_KIN_PROSPECTIVE_WARD_FORM_CONFIG = {
    storageKey: 'NEXT_KIN_PROSPECTIVE_WARD_multi-step-form',
    submittedKey: 'NEXT_KIN_PROSPECTIVE_WARD_multi-step-form-step_submitted',
    successfulKey: 'NEXT_KIN_PROSPECTIVE_WARD_multi-step-form-step_successful',
    initialState: NEXT_KIN_PROSPECTIVE_WARD_FORM_INITIAL_STATE,
    steps: NEXT_KIN_PROSPECTIVE_WARD_FORM_STEPS,
};

export const NextKinProspectiveWardFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <BaseProvider config={NEXT_KIN_PROSPECTIVE_WARD_FORM_CONFIG}>{children}</BaseProvider>;
};

export const useNextKinProspectiveWardFormContext = useFormContext;
export const useNextKinProspectiveWardFormStepForm = useStepForm;
