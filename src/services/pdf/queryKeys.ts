// services/pdf/queryKeys.ts

export const pdfKeys = {
    root: () => {
        return ['pdf'] as const;
    },

    generate: () => {
        return [...pdfKeys.root(), 'generate'] as const;
    },
};
