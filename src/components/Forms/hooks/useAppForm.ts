import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '../context/FormContext';
import { InputField } from '../components/InputField';

const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        InputField,
    },
    formComponents: {},
});

export { useAppForm, withForm };
