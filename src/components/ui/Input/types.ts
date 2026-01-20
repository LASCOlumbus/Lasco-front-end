import { Input as BaseInput } from '@base-ui/react/input';

export type InputSize = 'sm' | 'default';

export type InputProps = Omit<BaseInput.Props, 'size'> & {
    /**
     * Input size
     * @default 'default'
     * @see {@link InputSize}
     */
    size?: InputSize;
    /**
     * Left addon
     */
    leftAddon?: React.ReactNode;
    /**
     * Right addon
     */
    rightAddon?: React.ReactNode;
    /**
     * Error message
     */
    errorMessage?: string;
    /**
     * If true - right addon will be loading indicator
     */
    isLoading?: boolean;
};
