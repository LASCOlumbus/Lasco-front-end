import type { CheckboxRootChangeEventDetails } from '@base-ui/react/checkbox';
import type { CheckboxGroupItemProps } from './types';
import { useToggle } from '@react-hookz/web';
import { Checkbox } from '@/components/ui/Checkbox';
import { ChoiceInputWithLabelWrapper } from '@/components/ui/ChoiceInputWithLabelWrapper';

export const CheckboxGroupItem: React.FC<CheckboxGroupItemProps> = ({
    className,
    label,
    checked: controlledChecked,
    defaultChecked,
    onCheckedChange,
    ...checkboxProps
}) => {
    const [isInternalChecked, toggleIsInternalChecked] = useToggle(defaultChecked ?? false);
    const checked = controlledChecked ?? isInternalChecked;

    const handleCheckedChange = (newChecked: boolean, eventDetails: CheckboxRootChangeEventDetails) => {
        if (controlledChecked === undefined) {
            toggleIsInternalChecked(newChecked);
        }
        onCheckedChange?.(newChecked, eventDetails);
    };

    return (
        <ChoiceInputWithLabelWrapper
            className={className}
            checked={checked}
            disabled={checkboxProps.disabled}
            label={label}
        >
            <Checkbox {...checkboxProps} checked={checked} onCheckedChange={handleCheckedChange} />
        </ChoiceInputWithLabelWrapper>
    );
};
