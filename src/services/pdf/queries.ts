import type { GeneratePdfRequest, GeneratePdfResponse } from './types';
import { mutationOptions } from '@tanstack/react-query';
import { generatePdf } from './api';
import { pdfKeys } from './queryKeys';

export const generatePdfMutationOptions = <TData>() => {
    return mutationOptions<GeneratePdfResponse, Error, GeneratePdfRequest<TData>>({
        mutationKey: pdfKeys.generate(),
        mutationFn: (variables) => {
            return generatePdf<TData>({
                json: variables,
            });
        },
    });
};
