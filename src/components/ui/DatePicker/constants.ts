export const YEARS_FOR_DROPDOWN = Array.from({ length: new Date().getFullYear() - 1920 + 1 }, (_, idx) => {
    return 1920 + idx;
}).reverse();
