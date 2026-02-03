import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '../context/FormContext';

const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {},
    formComponents: {},
});

export { useAppForm, withForm };
