import { useMediaQuery } from '@react-hookz/web';

export const useIsTablet = () => {
    const isTablet = useMediaQuery('(max-width: 900px)', {
        initializeWithValue: false,
    });

    return !!isTablet;
};
