import React from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { US_STATES_SELECT_OPTIONS } from '@/lib/constants';
import { getFieldErrorMessage } from '@/lib/utils/getFieldErrorMessage';
import { parseDate } from '@/lib/utils/parseDate';
import FormFieldWrapper from '@/components/Forms/components/FormFieldWrapper';
import FormFieldLabelErrorWrapper from '@/components/Forms/components/FormFieldWrapper/components/FormFieldLabelErrorWrapper';
import ResponsiveLoader from '@/components/ResponsiveLoader';
import { Button } from '@/components/ui/Button';
import DatePicker from '@/components/ui/DatePicker';
import { FieldSetCard, FieldSetCardHeader } from '@/components/ui/FieldSetCard';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { Typography } from '@/components/ui/Typography';
import {
    useApplicantCredibilityApplicationFormContext,
    useApplicantCredibilityApplicationFormStepForm,
} from '../../context/ApplicantCredibilityApplicationFormContext';
import s from './styles.module.css';

const FamilyAndEmploymentStep: React.FC = () => {
    const { form, isLoading } = useApplicantCredibilityApplicationFormStepForm('familyAndEmploymentStep');
    const { goToPreviousStep } = useApplicantCredibilityApplicationFormContext();

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
                <div className={s['content-description']}>
                    <Typography variant="heading-h4" render={<strong />}>
                        Marital status
                    </Typography>

                    <form.Field
                        name="isMarried"
                        children={(field) => {
                            const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                            return (
                                <>
                                    <FormFieldLabelErrorWrapper
                                        className={s['field-wrap']}
                                        name="isMarried"
                                        label={<>Are you currently married?</>}
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
                                    {field.state.value && (
                                        <>
                                            <div className={s['inputs-wrapper']}>
                                                <form.AppField
                                                    name="marriage.spouseName"
                                                    children={(field) => {
                                                        return (
                                                            <field.InputField
                                                                name="marriage.spouseName"
                                                                label={<>Spouse full name</>}
                                                                placeholder="Type spouse’s full name"
                                                                onBlur={field.handleBlur}
                                                            />
                                                        );
                                                    }}
                                                />
                                                <form.AppField
                                                    name="marriage.yearMarried"
                                                    children={(field) => {
                                                        return (
                                                            <field.SelectField
                                                                name="marriage.yearMarried"
                                                                type="single"
                                                                label={<>Years married</>}
                                                                placeholder="Select years"
                                                                isSearchable
                                                                options={[
                                                                    ...Array.from({ length: 50 }).map((_, index) => {
                                                                        return {
                                                                            label: `${index + 1} year(s)`,
                                                                            value: `${index + 1}_year(s)`,
                                                                        };
                                                                    }),
                                                                ]}
                                                            />
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className={s['inputs-wrapper']}>
                                                <form.AppField
                                                    name="marriage.spouseStreetAddress"
                                                    children={(field) => {
                                                        return (
                                                            <field.InputField
                                                                name="marriage.spouseStreetAddress"
                                                                label={<>Spouse street address </>}
                                                                placeholder="Type street address"
                                                                onBlur={field.handleBlur}
                                                            />
                                                        );
                                                    }}
                                                />
                                                <form.AppField
                                                    name="marriage.city"
                                                    children={(field) => {
                                                        return (
                                                            <field.InputField
                                                                name="marriage.city"
                                                                label={<>City</>}
                                                                placeholder="Type city"
                                                                onBlur={field.handleBlur}
                                                            />
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className={s['inputs-wrapper']}>
                                                <form.AppField
                                                    name="marriage.state"
                                                    children={(field) => {
                                                        return (
                                                            <field.SelectField
                                                                name="marriage.state"
                                                                type="single"
                                                                label={<>State</>}
                                                                placeholder="Select state"
                                                                isSearchable
                                                                options={[
                                                                    ...US_STATES_SELECT_OPTIONS.map((state) => {
                                                                        return {
                                                                            label: `${state.value} - ${state.label}`,
                                                                            value: state.value,
                                                                        };
                                                                    }),
                                                                ]}
                                                            />
                                                        );
                                                    }}
                                                />
                                                <form.AppField
                                                    name="marriage.zip"
                                                    children={(field) => {
                                                        return (
                                                            <field.InputField
                                                                name="marriage.zip"
                                                                label={<>ZIP code</>}
                                                                placeholder="Ex. 43215"
                                                                onBlur={field.handleBlur}
                                                            />
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )}
                                </>
                            );
                        }}
                    />
                </div>

                <div className={s.inputs}>
                    <FieldSetCard>
                        <FieldSetCardHeader>
                            <Typography variant="heading-h4" render={<strong />}>
                                Employment
                            </Typography>
                        </FieldSetCardHeader>

                        <div className={s['inputs-wrapper']}>
                            <form.AppField
                                name="employment.currentEmployer"
                                children={(field) => {
                                    return (
                                        <field.InputField
                                            name="employment.currentEmployer"
                                            label={<>Current employer</>}
                                            placeholder="Type employer name"
                                            onBlur={field.handleBlur}
                                        />
                                    );
                                }}
                            />
                            <form.AppField
                                name="employment.from"
                                children={(f) => {
                                    return (
                                        <FormFieldWrapper name="employment.from" label={<>From</>}>
                                            <DatePicker
                                                value={parseDate(f.state.value)}
                                                onChange={f.handleChange}
                                                placeholder="MM / DD / YYYY"
                                            />
                                        </FormFieldWrapper>
                                    );
                                }}
                            />
                        </div>

                        <form.Field
                            name="employment.isSameEmployerLast5Years"
                            children={(field) => {
                                const errorMessage = getFieldErrorMessage(field.state.meta.errors);

                                return (
                                    <FormFieldLabelErrorWrapper
                                        className={s['field-wrap']}
                                        name="employment.isSameEmployerLast5Years"
                                        label={<>Have you worked for this employer for the last 5 years?</>}
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
                    </FieldSetCard>

                    <form.Field
                        mode="array"
                        name="employment.isSameEmployerLast5Years"
                        children={(field) => {
                            return field.state.value === false ? (
                                <form.Field
                                    name="employment.previousEmployers"
                                    children={(field) => {
                                        return (
                                            <>
                                                {field.state?.value?.map((_, index) => {
                                                    return (
                                                        <form.Field
                                                            name={`employment.previousEmployers[${index}]`}
                                                            children={(_) => {
                                                                return (
                                                                    <FieldSetCard key={index}>
                                                                        <FieldSetCardHeader>
                                                                            <Typography
                                                                                variant="heading-h4"
                                                                                render={<strong />}
                                                                            >
                                                                                Previous employer within the last 5
                                                                                years
                                                                            </Typography>

                                                                            {(field.state.value?.length as number) >
                                                                                1 && (
                                                                                <Button
                                                                                    variant="secondary"
                                                                                    size="small"
                                                                                    onClick={() => {
                                                                                        field.handleChange(
                                                                                            field.state.value?.filter(
                                                                                                (_, i) => {
                                                                                                    return i !== index;
                                                                                                }
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    Remove
                                                                                </Button>
                                                                            )}
                                                                        </FieldSetCardHeader>

                                                                        <form.AppField
                                                                            name={`employment.previousEmployers[${index}].employer`}
                                                                            children={(field) => {
                                                                                return (
                                                                                    <field.InputField
                                                                                        name={`employment.previousEmployers[${index}].employer`}
                                                                                        label={<>Previous employer</>}
                                                                                        placeholder="Type previous employer name"
                                                                                        onBlur={field.handleBlur}
                                                                                    />
                                                                                );
                                                                            }}
                                                                        />

                                                                        <div className={s['inputs-wrapper']}>
                                                                            <form.AppField
                                                                                name={`employment.previousEmployers[${index}].from`}
                                                                                children={(field) => {
                                                                                    return (
                                                                                        <FormFieldWrapper
                                                                                            name={`employment.previousEmployers[${index}].from`}
                                                                                            label={<>From</>}
                                                                                        >
                                                                                            <DatePicker
                                                                                                value={parseDate(
                                                                                                    field.state.value
                                                                                                )}
                                                                                                onChange={
                                                                                                    field.handleChange
                                                                                                }
                                                                                                placeholder="MM / DD / YYYY"
                                                                                            />
                                                                                        </FormFieldWrapper>
                                                                                    );
                                                                                }}
                                                                            />

                                                                            <form.AppField
                                                                                name={`employment.previousEmployers[${index}].to`}
                                                                                children={(f) => {
                                                                                    return (
                                                                                        <FormFieldWrapper
                                                                                            name={`employment.previousEmployers[${index}].to`}
                                                                                            label={<>To</>}
                                                                                        >
                                                                                            <DatePicker
                                                                                                value={parseDate(
                                                                                                    f.state.value
                                                                                                )}
                                                                                                onChange={
                                                                                                    f.handleChange
                                                                                                }
                                                                                                placeholder="MM / DD / YYYY"
                                                                                            />
                                                                                        </FormFieldWrapper>
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </FieldSetCard>
                                                                );
                                                            }}
                                                        />
                                                    );
                                                })}
                                                <Button
                                                    variant="secondary"
                                                    size="small"
                                                    onClick={() => {
                                                        field.handleChange(
                                                            field.state.value?.length
                                                                ? [
                                                                      ...field.state.value,
                                                                      {
                                                                          employer: '',
                                                                          from: null,
                                                                          to: null,
                                                                      },
                                                                  ]
                                                                : [
                                                                      {
                                                                          employer: '',
                                                                          from: null,
                                                                          to: null,
                                                                      },
                                                                  ]
                                                        );
                                                    }}
                                                >
                                                    Add previous employer
                                                </Button>
                                            </>
                                        );
                                    }}
                                />
                            ) : null;
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
                            <Button variant="primary" type="submit" size="big" disabled={!canSubmit || !isValid}>
                                Next step
                            </Button>
                        );
                    }}
                />
            </div>
        </form>
    );
};

export default FamilyAndEmploymentStep;
