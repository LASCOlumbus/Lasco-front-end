import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '../context/FormContext';
import { InputField } from '../components/InputField';
import { PhoneInputField } from '../components/PhoneInputField';
import { SelectField } from '../components/SelectField';
import { TextAreaField } from '../components/TextAreaField';

const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        InputField,
        PhoneInputField,
        SelectField,
        TextAreaField,
    },
    formComponents: {},
});

export { useAppForm, withForm };
