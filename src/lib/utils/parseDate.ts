import { isValid } from 'date-fns';

export const parseDate = (date?: string | Date | null) => {
    if (date && isValid(new Date(date))) {
        return new Date(date);
    }
    return null;
};
