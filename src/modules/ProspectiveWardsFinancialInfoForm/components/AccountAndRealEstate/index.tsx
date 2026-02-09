import React from 'react';
import { ACCOUNT_TYPE_SELECT_OPTIONS } from '@/lib/constants';
import {
    useProspectiveWardsFinancialInfoForm,
    useProspectiveWardsFinancialInfoFormContext,
} from '@/modules/ProspectiveWardsFinancialInfoForm/context/ProspectiveWardsFinancialInfoForm';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { FieldSetCard, FieldSetCardHeader } from '@/components/ui/FieldSetCard';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

const AccountAndRealEstateStep: React.FC = () => {
    const { form, isLoading } = useProspectiveWardsFinancialInfoForm('financialAccountStep');
    const { goToPreviousStep } = useProspectiveWardsFinancialInfoFormContext();

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
            }}
        >
            <div className={s.inputs}>
                <form.Field
                    name="accounts"
                    children={(field) => {
                        return (
                            <>
                                {field.state?.value?.map((_, index) => {
                                    return (
                                        <form.Field
                                            mode="array"
                                            name={`accounts[${index}]`}
                                            children={(_accountField) => {
                                                return (
                                                    <FieldSetCard key={index}>
                                                        <FieldSetCardHeader>
                                                            <Typography variant="body-m" render={<strong />}>
                                                                Financial account {index + 1}
                                                            </Typography>

                                                            {field.state.value?.length > 1 && (
                                                                <Button
                                                                    variant="secondary"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        field.removeValue(index);
                                                                    }}
                                                                >
                                                                    Remove
                                                                </Button>
                                                            )}
                                                        </FieldSetCardHeader>

                                                        <form.AppField
                                                            name={`accounts[${index}].institution`}
                                                            children={(field) => {
                                                                return (
                                                                    <field.InputField
                                                                        name={`accounts[${index}].institution`}
                                                                        label={<>Institution</>}
                                                                        placeholder=" Type institution name: examples (png, fidelity)"
                                                                        onBlur={field.handleBlur}
                                                                    />
                                                                );
                                                            }}
                                                        />
                                                        <div className={s['inputs-wrapper']}>
                                                            <form.AppField
                                                                name={`accounts[${index}].type`}
                                                                children={(field) => {
                                                                    return (
                                                                        <field.SelectField
                                                                            name={`accounts[${index}].type`}
                                                                            label={<>Type</>}
                                                                            type="single"
                                                                            placeholder=" Select account type"
                                                                            isSearchable
                                                                            options={ACCOUNT_TYPE_SELECT_OPTIONS}
                                                                        />
                                                                    );
                                                                }}
                                                            />
                                                            <form.AppField
                                                                name={`accounts[${index}].estimatedBalance`}
                                                                children={(field) => {
                                                                    return (
                                                                        <field.InputField
                                                                            name={`accounts[${index}].estimatedBalance`}
                                                                            label={<> Estimated balance</>}
                                                                            placeholder="$0.00"
                                                                            onBlur={field.handleBlur}
                                                                        />
                                                                    );
                                                                }}
                                                            />
                                                        </div>

                                                        <div className={s['inputs-wrapper']} />
                                                    </FieldSetCard>
                                                );
                                            }}
                                        />
                                    );
                                })}
                                <Button
                                    variant="secondary"
                                    size="medium"
                                    onClick={() => {
                                        field.pushValue({ institution: '', type: '', estimatedBalance: '' });
                                    }}
                                >
                                    Add another relative
                                </Button>
                            </>
                        );
                    }}
                />
            </div>

            <div className={s.footer}>
                <Button variant="secondary" size="big" onClick={goToPreviousStep} type="button">
                    Back
                </Button>
                <form.Subscribe
                    selector={(state) => {
                        const isValid = state.isFieldsValid && state.isFormValid;
                        const canSubmit = state.isValid && !state.isPristine;

                        return [canSubmit, isValid];
                    }}
                    children={([canSubmit, isValid]) => {
                        return (
                            <Button type="submit" variant="primary" size="big" disabled={!canSubmit || !isValid}>
                                Next step
                            </Button>
                        );
                    }}
                />
            </div>
        </form>
    );
};

export default AccountAndRealEstateStep;
