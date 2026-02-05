import React from 'react';
import { Component as Calendar20Icon } from '@/icons/calendar_20.svg?svgUse';
import { RadioGroup } from '@base-ui/react/radio-group';
import { dateReturn } from '@/lib/utils/dateReturn';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import DatePicker from '@/components/ui/DatePicker';
import Input from '@/components/ui/Input';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { Typography } from '@/components/ui/Typography';
import {
    useNextKinProspectiveWardFormContext,
    useNextKinProspectiveWardFormStepForm,
} from '../../context/NextKinProspectiveWardFormContext';
import s from './styles.module.css';

const WaiversListStep: React.FC = () => {
    const { form, isLoading } = useNextKinProspectiveWardFormStepForm('waiversListStep');
    const { goToPreviousStep, toggleIsSuccessful } = useNextKinProspectiveWardFormContext();

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
                <div className={s['content-description']}>
                    <Typography variant="body-m">
                        List the Prospective Ward&apos;s closest relatives. They must be notified about the guardianship
                        application unless they signed a waiver of notice.
                    </Typography>
                    <Alert>
                        Specify age and birth date of each minor under 16 on the line containing the minor&apos;s name.
                        List the name and address of the minor&apos;s parent, guardian or custodian on the name and
                        address lines following the minor&apos;s address.
                    </Alert>
                </div>
                <div className={s.inputs}>
                    <form.Field
                        name="relatives"
                        children={(field) => {
                            return (
                                <>
                                    {field.state?.value?.map((_, index) => {
                                        return (
                                            <form.Field
                                                name={`relatives[${index}]`}
                                                children={(relative) => {
                                                    return (
                                                        <div className={s['relative-card']} key={index}>
                                                            <div className={s['relative-card-header']}>
                                                                <Typography variant="body-m" render={<strong />}>
                                                                    Relative {index + 1}
                                                                </Typography>

                                                                {field.state.value?.length > 1 && (
                                                                    <Button
                                                                        variant="secondary"
                                                                        size="small"
                                                                        onClick={() => {
                                                                            field.handleChange(
                                                                                field.state.value.filter((_, i) => {
                                                                                    return i !== index;
                                                                                })
                                                                            );
                                                                        }}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                )}
                                                            </div>

                                                            <div className={s['input-with-checkbox']}>
                                                                <form.AppField
                                                                    name={`relatives[${index}].fullName`}
                                                                    children={(field) => {
                                                                        return (
                                                                            <field.InputField
                                                                                name={`relatives[${index}].fullName`}
                                                                                label={<>Full name of relative</>}
                                                                                placeholder="Type full name"
                                                                                onBlur={field.handleBlur}
                                                                            />
                                                                        );
                                                                    }}
                                                                />

                                                                <form.Field
                                                                    name={`relatives[${index}].isRelativeUnder18`}
                                                                    children={(f) => {
                                                                        return (
                                                                            <div className={s['checkbox-wrapper']}>
                                                                                <Checkbox
                                                                                    checked={f.state.value}
                                                                                    onCheckedChange={(checked) => {
                                                                                        f.handleChange(checked);
                                                                                    }}
                                                                                />
                                                                                <Typography variant="body-s">
                                                                                    This relative under the age of 18
                                                                                </Typography>
                                                                            </div>
                                                                        );
                                                                    }}
                                                                />

                                                                {relative.state.value?.isRelativeUnder18 && (
                                                                    <form.AppField
                                                                        name={`relatives[${index}].dob`}
                                                                        children={(f) => {
                                                                            return (
                                                                                <DatePicker
                                                                                    value={dateReturn(f.state.value)}
                                                                                    onChange={f.handleChange}
                                                                                    placeholder="MM / DD / YYYY"
                                                                                    trigger={
                                                                                        <Input
                                                                                            placeholder="MM / DD / YYYY"
                                                                                            value={
                                                                                                f.state.value
                                                                                                    ? `${new Date(f.state.value).getMonth() + 1}/${new Date(f.state.value).getDate()}/${new Date(f.state.value).getFullYear()}`
                                                                                                    : ''
                                                                                            }
                                                                                            readOnly
                                                                                            leftAddon={
                                                                                                <Calendar20Icon />
                                                                                            }
                                                                                        />
                                                                                    }
                                                                                />
                                                                            );
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>

                                                            <form.Field
                                                                name={`relatives[${index}].relationship`}
                                                                children={(field) => {
                                                                    const errorMessage = getFieldErrorMessage(
                                                                        field.state.meta.errors
                                                                    );

                                                                    return (
                                                                        <FormFieldLabelErrorWrapper
                                                                            className={s['field-wrap']}
                                                                            name={`relatives[${index}].relationship`}
                                                                            label={<>Relationship to the ward</>}
                                                                            errorMessage={errorMessage}
                                                                        >
                                                                            <RadioGroup
                                                                                className={s['checkbox-group']}
                                                                                value={field.state.value}
                                                                                onValueChange={(value) => {
                                                                                    field.handleChange(value as string);
                                                                                }}
                                                                            >
                                                                                <RadioGroupItem
                                                                                    label="Spouse"
                                                                                    value={'spouse'}
                                                                                />
                                                                                <RadioGroupItem
                                                                                    label="Living children"
                                                                                    value={'living_children'}
                                                                                />
                                                                                <RadioGroupItem
                                                                                    label="Current guardian"
                                                                                    value={'current_guardian'}
                                                                                />
                                                                                <RadioGroupItem
                                                                                    label="Other next of keen"
                                                                                    value={'other_next_of_keen'}
                                                                                />
                                                                            </RadioGroup>
                                                                        </FormFieldLabelErrorWrapper>
                                                                    );
                                                                }}
                                                            />

                                                            <div className={s['inputs-wrapper']}>
                                                                <form.AppField
                                                                    name={`relatives[${index}].address`}
                                                                    children={(field) => {
                                                                        return (
                                                                            <field.InputField
                                                                                name={`relatives[${index}].address`}
                                                                                label={<>Address</>}
                                                                                placeholder="Type address"
                                                                                onBlur={field.handleBlur}
                                                                            />
                                                                        );
                                                                    }}
                                                                />

                                                                <form.AppField
                                                                    name={`relatives[${index}].zip`}
                                                                    children={(field) => {
                                                                        return (
                                                                            <field.InputField
                                                                                name={`relatives[${index}].fullName`}
                                                                                label={<>ZIP code</>}
                                                                                placeholder="Ex. 43215"
                                                                                onBlur={field.handleBlur}
                                                                            />
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                                    <Button
                                        variant="secondary"
                                        size="medium"
                                        onClick={() => {
                                            field.handleChange([
                                                ...field.state.value,
                                                {
                                                    fullName: '',
                                                    isRelativeUnder18: false,
                                                    relationship: '',
                                                    address: '',
                                                    zip: '',
                                                },
                                            ]);
                                        }}
                                    >
                                        Add another relative
                                    </Button>
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

export default WaiversListStep;
