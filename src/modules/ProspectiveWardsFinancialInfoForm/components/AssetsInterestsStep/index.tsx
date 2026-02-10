import React from 'react';
import { CheckboxGroup } from '@base-ui/react/checkbox-group';
import {
    useProspectiveWardsFinancialInfoForm,
    useProspectiveWardsFinancialInfoFormContext,
} from '@/modules/ProspectiveWardsFinancialInfoForm/context/ProspectiveWardsFinancialInfoForm';
import {
    BENEFICIARY_KEYS,
    BENEFICIARY_LABELS,
    BeneficiaryKey,
} from '@/modules/ProspectiveWardsFinancialInfoForm/schemas/prospectiveWardsFinancialInfo';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { CheckboxGroupItem } from '@/components/ui/CheckboxGroupItem';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

const AssetsInterestsStep: React.FC = () => {
    const { form, isLoading } = useProspectiveWardsFinancialInfoForm('assetsInterests');
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
                form.handleSubmit().then();
            }}
        >
            <div className={s['scroll-container-wrapper']}>
                <div className={s.inputs}>
                    <div className={s['content-description']}>
                        <Typography variant="body-m">
                            Is the prospective ward a beneficiary of any of the following (check all that apply)?
                        </Typography>
                    </div>
                    <form.AppField
                        name="prospectiveWardBeneficiaryOf"
                        children={(field) => {
                            return (
                                <>
                                    <CheckboxGroup
                                        className={s['checkbox-group']}
                                        value={field.state.value}
                                        onValueChange={(value) => {
                                            field.handleChange(value as BeneficiaryKey[]);
                                        }}
                                    >
                                        {BENEFICIARY_KEYS.map((key) => {
                                            return (
                                                <CheckboxGroupItem
                                                    key={key}
                                                    label={BENEFICIARY_LABELS[key]}
                                                    value={key}
                                                />
                                            );
                                        })}
                                    </CheckboxGroup>
                                    {field.state.value.length > 0 && (
                                        <form.AppField
                                            name="identifyingInformation"
                                            children={(field) => {
                                                return (
                                                    <field.TextAreaField
                                                        name="identifyingInformation"
                                                        label="Identifying information"
                                                        placeholder="Enter trust or estate details"
                                                        onBlur={field.handleBlur}
                                                    />
                                                );
                                            }}
                                        />
                                    )}
                                </>
                            );
                        }}
                    />
                    <div className={s['checkbox-wrapper']}>
                        <form.AppField
                            name="sourceOfIncomeOrAsset"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="sourceOfIncomeOrAsset"
                                        label="Source of income or asset (optional) "
                                        placeholder="Cash on hand"
                                        onBlur={field.handleBlur}
                                    />
                                );
                            }}
                        />
                        <form.AppField
                            name="amountOfIncomeOrAsset"
                            children={(field) => {
                                return (
                                    <field.InputField
                                        name="amountOfIncomeOrAsset"
                                        label="Amount of income or asset (optional)"
                                        type="number"
                                        numericFormatProps={{
                                            prefix: '$',
                                            thousandSeparator: true,
                                            allowLeadingZeros: false,
                                            valueIsNumericString: true,
                                        }}
                                        placeholder="$0.00"
                                        onBlur={field.handleBlur}
                                    />
                                );
                            }}
                        />
                    </div>

                    <Typography variant="body-m">
                        Application to Determine Indigent Status. (Request to Avoid Court Costs for Prospective Ward)
                    </Typography>
                    <Typography variant="body-s">
                        Based on the financial information above, I believe that the prospective ward:
                    </Typography>
                    <form.AppField
                        name="hasSufficientFundsToPayCourtCosts"
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
                                        Has enough funds available in their own name to pay court costs.
                                    </Typography>
                                </label>
                            );
                        }}
                    />
                    <form.AppField
                        name="doesNotHaveSufficientFundsToPayCourtCosts"
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
                                        Does not have enough funds in their own name to pay court costs. The court
                                        should consider whether the proposed ward can be considered indigent.
                                    </Typography>
                                </label>
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
                        return [state.canSubmit, state.isSubmitting];
                    }}
                    children={([canSubmit, isSubmitting]) => {
                        return (
                            <Button
                                onClick={form.handleSubmit}
                                type="button"
                                variant="primary"
                                size="big"
                                disabled={!canSubmit}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        );
                    }}
                />
            </div>
        </form>
    );
};

export default AssetsInterestsStep;
