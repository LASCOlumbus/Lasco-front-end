import { useAdultGuardianshipFormContext } from '@/modules/AdultGuardianship/context/AdultGuardianshipFormContext';
import { FormStepper } from '@/components/Forms/components/FormStepper';

const Sidebar: React.FC = () => {
    const { steps, currentStepIndex, lastPassedStepIndex, isSubmitted, goToSelectStep } =
        useAdultGuardianshipFormContext();
    return (
        <FormStepper
            steps={steps}
            currentStepIndex={currentStepIndex}
            lastPassedStepIndex={lastPassedStepIndex}
            isSubmitted={isSubmitted}
            onStepClick={goToSelectStep}
        />
    );
};

export default Sidebar;
