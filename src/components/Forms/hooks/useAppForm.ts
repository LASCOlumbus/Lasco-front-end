import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '../context/FormContext';
import { InputField } from '../components/InputField';
import { PhoneInputField } from '../components/PhoneInputField';

const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        InputField,
        PhoneInputField,
    },
    formComponents: {},
});

export { useAppForm, withForm };
