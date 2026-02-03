import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '../context/FormContext';
import { InputField } from '../components/InputField';
import { PhoneInputField } from '../components/PhoneInputField';
import { SelectField } from '../components/SelectField';

const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        InputField,
        PhoneInputField,
        SelectField,
    },
    formComponents: {},
});

export { useAppForm, withForm };
