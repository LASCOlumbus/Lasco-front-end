export const YEARS_FOR_DROPDOWN = Array.from({ length: new Date().getFullYear() - 1970 + 1 }, (_, idx) => {
    return 1970 + idx;
}).reverse();
