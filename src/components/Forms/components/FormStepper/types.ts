export type FormStep = {
    id: string;
    label: string;
};

export type FormStepperProps = {
    steps: FormStep[];
    currentStepIndex: number;
    lastPassedStepIndex: number;
    onStepClick?: (_step: number) => void;
    isSubmitted?: boolean;
};
