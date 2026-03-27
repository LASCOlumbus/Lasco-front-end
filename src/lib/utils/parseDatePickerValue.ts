import { subDays } from 'date-fns';

export const parseDatePickerValue = (value: Date | string | null) => {
    return value ? `${new Date(value).getMonth() + 1}/${new Date(value).getDate()}/${new Date(value).getFullYear()}` : '';
};

export const getMaxDate = (to: Date | null, prevFrom: Date | null) => {
    if (to) {
        return subDays(new Date(to), 1);
    } else if (prevFrom) {
        return prevFrom;
    } else {
        return to;
    }
};
