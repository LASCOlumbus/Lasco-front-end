import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import {
    useAdultJurisdictionAffidavitFormContext,
    useAdultJurisdictionAffidavitFormStepForm,
} from '../../context/AdultJurisdictionAffidavitFormContext';
import s from './styles.module.css';

const LegalQuestionsStep: React.FC = () => {
    const { form, isLoading } = useAdultJurisdictionAffidavitFormStepForm('legalQuestionsStep');
    const { goToPreviousStep, toggleIsSuccessful } = useAdultJurisdictionAffidavitFormContext();

    if (isLoading) {
        return <ResponsiveLoader />;
    }

    return (
        <form
            className={s.form}
            onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                form.handleSubmit();

                toggleIsSuccessful(true);
            }}
        >
            <div className={s['scroll-container-wrapper']}>
                <div className={s.inputs}>
                    <div className={s['content-description']}>
                        <form.Field
                            name="isAffiantHaveInfoAboutAnyGuardianship"
                            children={(field) => {
                                const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                return (
                                    <FormFieldLabelErrorWrapper
                                        className={s['field-wrap']}
                                        name="isAffiantHaveInfoAboutAnyGuardianship"
                                        label={
                                            <>
                                                Does the affiant have information about any guardianship,
                                                conservatorship, or similar proceeding involving the alleged incompetent
                                                in any court?
                                            </>
                                        }
                                        errorMessage={errorMessage}
                                    >
                                        <RadioGroup
                                            className={s['checkbox-group']}
                                            value={field.state.value}
                                            onValueChange={(value) => {
                                                field.handleChange(value as boolean);
                                            }}
                                        >
                                            <RadioGroupItem label="Yes" value={true} />
                                            <RadioGroupItem label="No" value={false} />
                                        </RadioGroup>
                                    </FormFieldLabelErrorWrapper>
                                );
                            }}
                        />

                        <form.AppField
                            name="infoAboutCourtProceeding"
                            children={(field) => {
                                return (
                                    <FormFieldLabelErrorWrapper
                                        className={s['field-wrap']}
                                        name="infoAboutCourtProceeding"
                                        label={<>Describe the information you have about this court proceeding</>}
                                    >
                                        <field.TextAreaField
                                            name="infoAboutCourtProceeding"
                                            placeholder="Provide details about any guardianship, conservatorship, or similar proceeding you are aware of."
                                        />
                                    </FormFieldLabelErrorWrapper>
                                );
                            }}
                        />
                    </div>

                    <Alert>
                        The affiant has a continuing duty to inform the court of any proceeding concerning the alleged
                        incompetent that becomes known during this matter.
                    </Alert>

                    <form.Field
                        name="isAllegedIncompetentDivorced"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper
                                    className={s['field-wrap']}
                                    name="isAllegedIncompetentDivorced"
                                    label={<>Is the alleged incompetent divorced?</>}
                                    errorMessage={errorMessage}
                                >
                                    <RadioGroup
                                        className={s['checkbox-group']}
                                        value={field.state.value}
                                        onValueChange={(value) => {
                                            field.handleChange(value as boolean);
                                        }}
                                    >
                                        <RadioGroupItem label="Yes" value={true} />
                                        <RadioGroupItem label="No" value={false} />
                                    </RadioGroup>
                                </FormFieldLabelErrorWrapper>
                            );
                        }}
                    />

                    <form.Field
                        name="isDivorcePending"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);
                            return (
                                <FormFieldLabelErrorWrapper
                                    className={s['field-wrap']}
                                    name="isDivorcePending"
                                    label={<>Are there any divorce proceedings currently pending?</>}
                                    errorMessage={errorMessage}
                                >
                                    <RadioGroup
                                        className={s['checkbox-group']}
                                        value={field.state.value}
                                        onValueChange={(value) => {
                                            field.handleChange(value as boolean);
                                        }}
                                    >
                                        <RadioGroupItem label="Yes" value={true} />
                                        <RadioGroupItem label="No" value={false} />
                                    </RadioGroup>
                                </FormFieldLabelErrorWrapper>
                            );
                        }}
                    />

                    <form.AppField
                        name="isDivorcePending"
                        children={(field) => {
                            return (
                                field.state.value && (
                                    <form.AppField
                                        name="courtName"
                                        children={(field) => {
                                            return (
                                                <field.InputField
                                                    name={field.name}
                                                    label={<>Court where the divorce case is pending</>}
                                                    placeholder="Please type information about court"
                                                />
                                            );
                                        }}
                                    />
                                )
                            );
                        }}
                    />

                    <form.Field
                        name="isAllegedIncompetentCurrently"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <FormFieldLabelErrorWrapper
                                    className={s['field-wrap']}
                                    name="isAllegedIncompetentCurrently"
                                    label={
                                        <>
                                            Is the alleged incompetent currently subject to a continuing custody order
                                            issued in their parents’ divorce?
                                        </>
                                    }
                                    errorMessage={errorMessage}
                                >
                                    <RadioGroup
                                        className={s['checkbox-group']}
                                        value={field.state.value}
                                        onValueChange={(value) => {
                                            field.handleChange(value as boolean);
                                        }}
                                    >
                                        <RadioGroupItem label="Yes" value={true} />
                                        <RadioGroupItem label="No" value={false} />
                                    </RadioGroup>
                                </FormFieldLabelErrorWrapper>
                            );
                        }}
                    />

                    <form.AppField
                        name="additionalInfo"
                        children={(field) => {
                            return (
                                <field.TextAreaField
                                    name="additionalInfo"
                                    placeholder="Please type any additional information"
                                />
                            );
                        }}
                    />
                </div>
            </div>
            <div className={s.footer}>
                <Button variant="secondary" size="big" onClick={goToPreviousStep} type="button">
                    Back
                </Button>
                <form.Subscribe
                    selector={(state) => {
                        const isValid = state.isFieldsValid && state.isFormValid;
                        const canSubmit = state.isValid && !state.isPristine;

                        return [canSubmit, isValid, state.isSubmitting];
                    }}
                    children={([canSubmit, isValid, isSubmitting]) => {
                        return (
                            <Button variant="primary" type="submit" size="big" disabled={!canSubmit || !isValid}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        );
                    }}
                />
            </div>
        </form>
    );
};

export default LegalQuestionsStep;
