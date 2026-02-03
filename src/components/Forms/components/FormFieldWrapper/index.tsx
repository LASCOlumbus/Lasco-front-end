import type { FormFieldWrapperProps } from './types';
import React from 'react';
import clsx from 'clsx';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import { useFieldContext } from '../../context/FormContext';
import FormFieldLabelErrorWrapper from './components/FormFieldLabelErrorWrapper';
import s from './styles.module.css';

const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({ className, children, name, label, errorMessage }) => {
    const field = useFieldContext();
    const stateError = getFieldErrorMessage(field.state.meta.errors);

    const fieldErrorMessage = errorMessage || stateError;

    return (
        <FormFieldLabelErrorWrapper
            className={clsx(s.wrap, className, { [s.error]: !!fieldErrorMessage })}
            name={name}
            label={label}
            errorMessage={fieldErrorMessage}
        >
            {children}
        </FormFieldLabelErrorWrapper>
    );
};

export default React.memo(FormFieldWrapper);
