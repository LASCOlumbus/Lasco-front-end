import { useProspectiveWardsFinancialInfoFormContext } from '@/modules/ProspectiveWardsFinancialInfoForm/context/ProspectiveWardsFinancialInfoForm';
import FormStepper from '@/components/Forms/components/FormStepper';

const Sidebar = () => {
    const { steps, currentStepIndex, lastPassedStepIndex, isSubmitted, goToSelectStep } =
        useProspectiveWardsFinancialInfoFormContext();

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
