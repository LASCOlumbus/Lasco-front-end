import { useMediaQuery } from '@react-hookz/web';

export const useIsMobile = () => {
    const isMobile = useMediaQuery('(max-width: 767px)', {
        initializeWithValue: false,
    });

    return !!isMobile;
};
