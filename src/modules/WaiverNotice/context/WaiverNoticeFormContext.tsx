'use client';

import { waiverNoticeCaseDetailsStepSchema, waiverNoticeWaiversListStepSchema } from '@/schemas/formSchemas';
import { FORM_TYPES } from '@/lib/constants';
import { createMultiStepForm } from '@/lib/createMultiStepForm';
import { IWaiverNoticeFormStep, WaiverNoticeForm } from '@/lib/types';

const {
    Provider: BaseProvider,
    useFormContext,
    useStepForm,
} = createMultiStepForm<WaiverNoticeForm>(FORM_TYPES._WAIVER_OF_NOTICE);
const WAIVER_NOTICE_FORM_INITIAL_STATE: WaiverNoticeForm = {
    caseDetailsStep: {
        guardianName: '',
        caseNumber: '',
        applicantName: '',
    },
    waiversListStep: {
        persons: [''],
    },
};

const WAIVER_NOTICE_FORM_STEPS = {
    caseDetailsStep: {
        id: 'caseDetailsStep',
        label: 'Case details',
        schema: waiverNoticeCaseDetailsStepSchema,
        enabled: true,
    },
    waiversListStep: {
        id: 'waiversListStep',
        label: 'Waivers list',
        schema: waiverNoticeWaiversListStepSchema,
        enabled: true,
    },
} as const satisfies Record<keyof WaiverNoticeForm, IWaiverNoticeFormStep>;
const WAIVER_NOTICE_FORM_CONFIG = {
    storageKey: 'WAIVER_NOTICE_multi-step-form',
    submittedKey: 'WAIVER_NOTICE_multi-step-form-step_submitted',
    successfulKey: 'WAIVER_NOTICE_multi-step-form-step_successful',
    initialState: WAIVER_NOTICE_FORM_INITIAL_STATE,
    steps: WAIVER_NOTICE_FORM_STEPS,
};

export const WaiverNoticeFormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <BaseProvider config={WAIVER_NOTICE_FORM_CONFIG}>{children}</BaseProvider>;
};

export const useWaiverNoticeFormContext = useFormContext;
export const useWaiverNoticeFormStepForm = useStepForm;
