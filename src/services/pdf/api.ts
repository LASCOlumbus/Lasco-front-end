import type { OptionsWithTypedJson } from '@/lib/@http';
import type { GeneratePdfRequest, GeneratePdfResponse } from './types';
import { http } from '@/lib/@http';

export const generatePdf = async <TData>(
    options: OptionsWithTypedJson<GeneratePdfRequest<TData>>
): Promise<GeneratePdfResponse> => {
    const res = await http.post('pdf/generate', {
        ...options,
        headers: {
            ...options.headers,
            Accept: 'application/pdf',
        },
    });
    return res.blob();
};
