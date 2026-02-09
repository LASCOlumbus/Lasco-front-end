import { FORM_TYPES } from '@/lib/constants';

export type GeneratePdfRequest<TData = unknown> = {
    type: FORM_TYPES;
    data: TData;
    meta?: string;
};

export type GeneratePdfResponse = Blob;
