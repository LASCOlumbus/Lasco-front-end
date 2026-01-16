import type { TypographyVariant } from '@/components/ui/Typography/types';
import { useState } from 'react';
import { CheckboxGroup } from '@base-ui/react/checkbox-group';
import { RadioGroup } from '@base-ui/react/radio-group';
import clsx from 'clsx';
import { toastManager } from '@/lib/@toastManager';
import { Button } from '@/components/ui/Button';
import { ButtonSize, ButtonVariant } from '@/components/ui/Button/types';
import { Checkbox } from '@/components/ui/Checkbox';
import { CheckboxGroupItem } from '@/components/ui/CheckboxGroupItem';
import { Radio } from '@/components/ui/Radio';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { Typography } from '@/components/ui/Typography';
import { ComponentSection } from './components/ComponentSection';
import s from './style.module.css';

const TYPOGRAPHY_VARIANTS: TypographyVariant[] = [
    'heading-h1',
    'heading-h2',
    'heading-h3',
    'heading-h4',
    'heading-h5',
    'body-m',
    'body-s',
    'body-caption',
    'button-big',
    'button-medium',
    'button-small',
];

const BUTTON_VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'link'];

const BUTTON_SIZES: ButtonSize[] = ['big', 'medium', 'small'];

const UiKit: React.FC = () => {
    const [checkboxStates, setCheckboxStates] = useState({
        basic1: false,
        basic2: true,
        basic3: false,
        basic4: true,
        indeterminate1: false,
    });

    const [checkboxGroupValue, setCheckboxGroupValue] = useState<string[]>(['item2', 'item4']);

    const [radioGroupValue, setRadioGroupValue] = useState<string>('radio2');

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setCheckboxStates((prev) => {
            return { ...prev, [name]: checked };
        });
    };

    const createCheckboxChangeHandler = (name: string) => {
        return (checked: boolean) => {
            handleCheckboxChange(name, checked);
        };
    };
    return (
        <main className={clsx(s.wrap, 'full-height')}>
            <div className={s.inner}>
                <header className={s.header}>
                    <Typography variant="heading-h1" render={<h1 />}>
                        UI Kit
                    </Typography>
                    <Typography variant="body-m" className={s.description}>
                        A comprehensive showcase of all typography variants available in the design system.
                    </Typography>
                </header>
                <section className={s.content}>
                    <ComponentSection title="Typography">
                        {TYPOGRAPHY_VARIANTS.map((variant) => {
                            return (
                                <div key={variant} className={s['variant-container']}>
                                    <Typography variant="body-s" className={s['variant-title']}>
                                        {variant}
                                    </Typography>
                                    <div className={s['variant-content']}>
                                        <Typography variant={variant}>
                                            The quick brown fox jumps over the lazy dog
                                        </Typography>
                                        <Typography variant={variant}>1234567890</Typography>
                                        <Typography variant={variant} render={<strong />}>
                                            Bold text example
                                        </Typography>
                                        <Typography variant={variant}>Regular text example</Typography>
                                    </div>
                                </div>
                            );
                        })}
                    </ComponentSection>
                    <ComponentSection title="Buttons">
                        {BUTTON_VARIANTS.map((variant) => {
                            return (
                                <div key={variant} className={s['variant-container']}>
                                    <Typography variant="body-s" className={s['variant-title']}>
                                        {variant}
                                    </Typography>
                                    <div className={s['button-sizes']}>
                                        {BUTTON_SIZES.map((size) => {
                                            return (
                                                <div className={s['button-sizes']} key={`${variant}-${size}`}>
                                                    <Button key={`${variant}-${size}`} variant={variant} size={size}>
                                                        {variant} {size}
                                                    </Button>
                                                    <Button
                                                        key={`${variant}-${size}`}
                                                        variant={variant}
                                                        size={size}
                                                        disabled
                                                    >
                                                        {variant} {size}
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </ComponentSection>
                    <ComponentSection title="Checkbox">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                Basic Checkbox
                            </Typography>
                            <div className={s['variant-content']}>
                                <div className={s['button-sizes']}>
                                    <Checkbox
                                        checked={checkboxStates.basic1}
                                        onCheckedChange={createCheckboxChangeHandler('basic1')}
                                    />
                                    <Checkbox
                                        checked={checkboxStates.basic2}
                                        onCheckedChange={createCheckboxChangeHandler('basic2')}
                                    />
                                    <Checkbox
                                        checked={checkboxStates.basic3}
                                        onCheckedChange={createCheckboxChangeHandler('basic3')}
                                        disabled
                                    />
                                    <Checkbox
                                        checked={checkboxStates.basic4}
                                        onCheckedChange={createCheckboxChangeHandler('basic4')}
                                        disabled
                                    />
                                    <Checkbox
                                        checked={checkboxStates.indeterminate1}
                                        onCheckedChange={createCheckboxChangeHandler('indeterminate1')}
                                        indeterminate
                                    />
                                </div>
                            </div>
                        </div>
                    </ComponentSection>
                    <ComponentSection title="Checkbox Group Item">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                With Labels (using CheckboxGroup)
                            </Typography>
                            <div className={s['variant-content']}>
                                <CheckboxGroup
                                    className={s['checkbox-group']}
                                    value={checkboxGroupValue}
                                    onValueChange={(value) => {
                                        return setCheckboxGroupValue(value);
                                    }}
                                >
                                    <CheckboxGroupItem label="Option 1" value="item1" />
                                    <CheckboxGroupItem label="Option 2 (Checked)" value="item2" />
                                    <CheckboxGroupItem label="Option 3 (Disabled)" value="item3" disabled />
                                    <CheckboxGroupItem label="Option 4 (Checked & Disabled)" value="item4" disabled />
                                    <CheckboxGroupItem
                                        label={
                                            <span>
                                                Option 5 with <strong>custom React node</strong>
                                            </span>
                                        }
                                        value="item5"
                                    />
                                </CheckboxGroup>
                            </div>
                        </div>
                    </ComponentSection>
                    <ComponentSection title="Radio">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                Basic Radio
                            </Typography>
                            <div className={s['variant-content']}>
                                <Typography variant="body-m" style={{ marginBottom: '1rem' }}>
                                    Note: Radio buttons must be used within a RadioGroup
                                </Typography>
                                <RadioGroup
                                    value={radioGroupValue}
                                    onValueChange={(value) => {
                                        return setRadioGroupValue(value as string);
                                    }}
                                >
                                    <div className={s['button-sizes']}>
                                        <Radio value="radio1" />
                                        <Radio value="radio2" />
                                        <Radio value="radio3" disabled />
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </ComponentSection>
                    <ComponentSection title="Radio Group Item">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                With Labels (using RadioGroup)
                            </Typography>
                            <div className={s['variant-content']}>
                                <RadioGroup
                                    className={s['checkbox-group']}
                                    value={radioGroupValue}
                                    onValueChange={(value) => {
                                        return setRadioGroupValue(value as string);
                                    }}
                                >
                                    <RadioGroupItem label="Option 1" value="radio1" />
                                    <RadioGroupItem label="Option 2 (Selected)" value="radio2" />
                                    <RadioGroupItem label="Option 3 (Disabled)" value="radio3" disabled />
                                    <RadioGroupItem
                                        label={
                                            <span>
                                                Option 4 with <strong>custom React node</strong>
                                            </span>
                                        }
                                        value="radio4"
                                    />
                                </RadioGroup>
                            </div>
                        </div>
                    </ComponentSection>
                    <ComponentSection title="Toast">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                Toast Notifications
                            </Typography>
                            <div className={s['variant-content']}>
                                <div className={s['button-sizes']}>
                                    <Button
                                        variant="primary"
                                        size="medium"
                                        onClick={() => {
                                            toastManager.add({
                                                type: 'success',
                                                title: 'Success',
                                                description: 'Your action was completed successfully!',
                                                timeout: 5000,
                                            });
                                        }}
                                    >
                                        Show Success Toast
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="medium"
                                        onClick={() => {
                                            toastManager.add({
                                                type: 'error',
                                                title: 'Error',
                                                description: 'Something went wrong. Please try again.',
                                                timeout: 5000,
                                            });
                                        }}
                                    >
                                        Show Error Toast
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="medium"
                                        onClick={() => {
                                            toastManager.add({
                                                type: 'success',
                                                title: 'Custom Title',
                                                description:
                                                    'This is a custom success message with a longer description to test how the toast handles multiple lines of text.',
                                                timeout: 7000,
                                            });
                                        }}
                                    >
                                        Show Custom Success
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="medium"
                                        onClick={() => {
                                            toastManager.add({
                                                type: 'error',
                                                title: 'Validation Error',
                                                description:
                                                    'Please check your input and try again. Make sure all required fields are filled correctly.',
                                                timeout: 7000,
                                            });
                                        }}
                                    >
                                        Show Custom Error
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ComponentSection>
                </section>
            </div>
        </main>
    );
};

export default UiKit;
