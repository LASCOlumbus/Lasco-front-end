export type ObjValues<TObj> = TObj[keyof TObj];

export type WithClassName<TProps = unknown> = TProps & {
    /**
        Extendable classnames of component
    */
    className?: string;
};

export type WithChildren<TProps = unknown> = TProps & {
    /**
     * Extendable children of component
     */
    children?: React.ReactNode;
};

export type SetStateValue<TValue> = React.Dispatch<React.SetStateAction<TValue>>;
