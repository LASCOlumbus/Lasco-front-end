export type FormStep = {
    id: string;
    label: string;
};

export type FormStepperProps = {
    steps: FormStep[];
    currentStepIndex: number;
    lastPassedStepIndex: number;
    onStepClick?: (index: number) => void;
    isSubmitted?: boolean;
};
