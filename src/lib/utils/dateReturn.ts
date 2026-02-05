export const dateReturn = (date: string | Date | null | undefined) => {
    if (date) {
        return new Date(date);
    }

    return null;
};
