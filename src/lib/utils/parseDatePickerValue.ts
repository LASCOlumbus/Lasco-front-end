export const parseDatePickerValue = (value: Date | string | null) => {
    return value ? `${new Date(value).getMonth() + 1}/${new Date(value).getDate()}/${new Date(value).getFullYear()}` : '';
};
