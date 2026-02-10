import { FORM_TYPES } from '@/lib/constants';

export type GeneratePdfRequest<TData = unknown> = {
    type: (typeof FORM_TYPES)[keyof typeof FORM_TYPES];
    data: TData;
    meta?: string;
};

export type GeneratePdfResponse = Blob;
