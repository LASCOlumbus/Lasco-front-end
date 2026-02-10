import React from 'react';
import { CheckboxGroup } from '@base-ui/react/checkbox-group';
import {
    useProspectiveWardsFinancialInfoForm,
    useProspectiveWardsFinancialInfoFormContext,
} from '@/modules/ProspectiveWardsFinancialInfoForm/context/ProspectiveWardsFinancialInfoForm';
import {
    BENEFIT_KEYS,
    BenefitKey,
    BENEFITS_LABELS,
} from '@/modules/ProspectiveWardsFinancialInfoForm/schemas/prospectiveWardsFinancialInfo';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { CheckboxGroupItem } from '@/components/ui/CheckboxGroupItem';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

const BenefitsStep: React.FC = () => {
    const { form, isLoading } = useProspectiveWardsFinancialInfoForm('benefitsStep');
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
            <div className={s['scroll-container-wrapper']}>
                <div className={s.inputs}>
                    <div className={s['content-description']}>
                        <Typography variant="body-m">Which benefits does the prospective ward receive?</Typography>
                    </div>
                    <form.AppField
                        name="benefit"
                        children={(field) => {
                            return (
                                <>
                                    <CheckboxGroup
                                        className={s['checkbox-group']}
                                        value={field.state.value}
                                        onValueChange={(value) => {
                                            field.handleChange(value as BenefitKey[]);
                                        }}
                                    >
                                        {BENEFIT_KEYS.map((key) => {
                                            return (
                                                <CheckboxGroupItem key={key} label={BENEFITS_LABELS[key]} value={key} />
                                            );
                                        })}
                                    </CheckboxGroup>
                                    {field.state.value.includes('socialSecurity') && (
                                        <div className={s['inputs-wrapper']}>
                                            <form.AppField
                                                name="socialSecurity.socialSecuritySize"
                                                children={(field) => {
                                                    return (
                                                        <field.InputField
                                                            name="socialSecurity.socialSecuritySize"
                                                            label={<>How much is your social security (per month)?</>}
                                                            type="number"
                                                            numericFormatProps={{
                                                                prefix: '$',
                                                                thousandSeparator: true,
                                                                allowLeadingZeros: false,
                                                            }}
                                                            placeholder="$0.00"
                                                            onBlur={field.handleBlur}
                                                        />
                                                    );
                                                }}
                                            />
                                            <form.AppField
                                                name="socialSecurity.representativePayeeName"
                                                children={(field) => {
                                                    return (
                                                        <field.InputField
                                                            name="socialSecurity.representativePayeeName"
                                                            label={<>Representative payee name (optional)</>}
                                                            placeholder="Enter full name"
                                                            onBlur={field.handleBlur}
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>
                                    )}
                                    {field.state.value.includes('PERS') && (
                                        <form.AppField
                                            name="PERS.size"
                                            children={(field) => {
                                                return (
                                                    <field.InputField
                                                        name="PERS.size"
                                                        label={<>How much is your P.E.R.S. (per month)?</>}
                                                        type="number"
                                                        numericFormatProps={{
                                                            prefix: '$',
                                                            thousandSeparator: true,
                                                            allowLeadingZeros: false,
                                                        }}
                                                        placeholder="$0.00"
                                                        onBlur={field.handleBlur}
                                                    />
                                                );
                                            }}
                                        />
                                    )}
                                    {field.state.value.includes('VABenefits') && (
                                        <form.AppField
                                            name="VABenefits.size"
                                            children={(field) => {
                                                return (
                                                    <field.InputField
                                                        name="VABenefits.size"
                                                        label={<>How much are your V.A. Benefits(per month)?</>}
                                                        type="number"
                                                        numericFormatProps={{
                                                            prefix: '$',
                                                            thousandSeparator: true,
                                                            allowLeadingZeros: false,
                                                        }}
                                                        placeholder="$0.00"
                                                        onBlur={field.handleBlur}
                                                    />
                                                );
                                            }}
                                        />
                                    )}
                                    {field.state.value.includes('railroadRetirement') && (
                                        <form.AppField
                                            name="railroadRetirement.size"
                                            children={(field) => {
                                                return (
                                                    <field.InputField
                                                        name="railroadRetirement.size"
                                                        label={<>How much is your railroad retirement (per month)?</>}
                                                        type="number"
                                                        numericFormatProps={{
                                                            prefix: '$',
                                                            thousandSeparator: true,
                                                            allowLeadingZeros: false,
                                                        }}
                                                        placeholder="$0.00"
                                                        onBlur={field.handleBlur}
                                                    />
                                                );
                                            }}
                                        />
                                    )}
                                    {field.state.value.includes('otherInsuranceBenefits') && (
                                        <form.AppField
                                            name="otherInsuranceBenefits.description"
                                            children={(field) => {
                                                return (
                                                    <field.InputField
                                                        name="otherInsuranceBenefits.description"
                                                        label={<>Describe other insurance benefits</>}
                                                        placeholder="Enter details"
                                                        onBlur={field.handleBlur}
                                                    />
                                                );
                                            }}
                                        />
                                    )}
                                    {field.state.value.includes('otherPension') && (
                                        <form.AppField
                                            name="otherPension.description"
                                            children={(field) => {
                                                return (
                                                    <field.InputField
                                                        name="otherPension.description"
                                                        label={<>Describe other benefits</>}
                                                        placeholder="Enter details"
                                                        onBlur={field.handleBlur}
                                                    />
                                                );
                                            }}
                                        />
                                    )}
                                    {field.state.value.includes('medicaid') && (
                                        <form.AppField
                                            name="medicaid.isWardMedicaidFacilityResident"
                                            children={(field) => {
                                                return (
                                                    <label className={s['checkbox-wrapper']}>
                                                        <Checkbox
                                                            checked={field.state.value}
                                                            onCheckedChange={(checked) => {
                                                                field.handleChange(checked);
                                                            }}
                                                            onBlur={field.handleBlur}
                                                        />
                                                        <Typography variant="body-s">
                                                            The prospective ward is eligible for Medicaid and lives in a
                                                            nursing home or other facility which receives all of the
                                                            prospective ward's income.
                                                        </Typography>
                                                    </label>
                                                );
                                            }}
                                        />
                                    )}
                                </>
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

export default BenefitsStep;
