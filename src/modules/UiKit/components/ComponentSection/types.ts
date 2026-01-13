export type ComponentSectionProps = {
    /**
     * The title/name of the component being showcased
     */
    title: string;
    /**
     * The content to render (component variations)
     */
    children: React.ReactNode;
    /**
     * Optional additional className
     */
    className?: string;
};
