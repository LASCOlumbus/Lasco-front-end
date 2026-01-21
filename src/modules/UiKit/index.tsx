import type { E164Number } from 'libphonenumber-js/core';
import type { TypographyVariant } from '@/components/ui/Typography/types';
import { useState } from 'react';
import { CheckboxGroup } from '@base-ui/react/checkbox-group';
import { RadioGroup } from '@base-ui/react/radio-group';
import clsx from 'clsx';
import { toastManager } from '@/lib/@toastManager';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { ButtonSize, ButtonVariant } from '@/components/ui/Button/types';
import { Checkbox } from '@/components/ui/Checkbox';
import { CheckboxGroupItem } from '@/components/ui/CheckboxGroupItem';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/Drawer';
import Input from '@/components/ui/Input';
import PhoneInput from '@/components/ui/Input/components/PhoneInput';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Radio } from '@/components/ui/Radio';
import { RadioGroupItem } from '@/components/ui/RadioGroupItem';
import { ScrollArea } from '@/components/ui/ScrollArea';
import Select from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
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

const SELECT_OPTIONS = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
] as const;

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

    const [inputValue, setInputValue] = useState<string>('');

    const [phoneValue, setPhoneValue] = useState<E164Number | ''>('');

    const [selectValue, setSelectValue] = useState<string | number>('option2');
    const [selectSearch, setSelectSearch] = useState<string>('');

    const [selectMultipleValue, setSelectMultipleValue] = useState<(string | number)[]>(['option1', 'option3']);

    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

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
                    <ComponentSection title="Alert">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                Informational Alert
                            </Typography>
                            <div className={s['variant-content']}>
                                <Alert>This is an informational alert message.</Alert>
                                <Alert>
                                    This is a longer alert message that demonstrates how the component handles multiple
                                    lines of text and maintains proper spacing and alignment.
                                </Alert>
                            </div>
                        </div>
                    </ComponentSection>
                    <ComponentSection title="Input">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                Basic
                            </Typography>
                            <div className={s['variant-content']}>
                                <Input
                                    placeholder="Type something…"
                                    value={inputValue}
                                    onChange={(e) => {
                                        return setInputValue(e.target.value);
                                    }}
                                />
                                <Input placeholder="Small input" size="sm" />
                                <Input placeholder="Loading state" isLoading />
                                <Input placeholder="Error state" errorMessage="This field is required" />
                            </div>
                        </div>
                    </ComponentSection>
                    <ComponentSection title="Textarea">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                Basic
                            </Typography>
                            <div className={s['variant-content']}>
                                <TextArea placeholder="Type something…" />
                                <TextArea placeholder="Type something…" errorMessage="This field is required" />
                            </div>
                        </div>
                    </ComponentSection>
                    <ComponentSection title="Phone Input">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                International (react-phone-number-input)
                            </Typography>
                            <div className={s['variant-content']}>
                                <PhoneInput
                                    value={phoneValue}
                                    onChange={(value) => {
                                        return setPhoneValue(value ?? '');
                                    }}
                                />
                            </div>
                        </div>
                    </ComponentSection>
                    <ComponentSection title="Select">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                Single (searchable)
                            </Typography>
                            <div className={s['variant-content']}>
                                <Select
                                    type="single"
                                    placeholder="Pick an option"
                                    options={[...SELECT_OPTIONS]}
                                    value={undefined}
                                    onChange={setSelectValue}
                                    isSearchable
                                    search={selectSearch}
                                    onSearchChange={setSelectSearch}
                                />
                                <Select
                                    type="single"
                                    size="sm"
                                    placeholder="Pick an option"
                                    options={[...SELECT_OPTIONS]}
                                    value={undefined}
                                    onChange={setSelectValue}
                                    isSearchable
                                    search={selectSearch}
                                    onSearchChange={setSelectSearch}
                                />
                                <Select
                                    type="single"
                                    placeholder="Pick an option"
                                    options={[...SELECT_OPTIONS]}
                                    value={selectValue}
                                    onChange={setSelectValue}
                                    isSearchable
                                    search={selectSearch}
                                    onSearchChange={setSelectSearch}
                                />
                                <Select
                                    type="single"
                                    placeholder="Disabled"
                                    options={[...SELECT_OPTIONS]}
                                    value={selectValue}
                                    onChange={setSelectValue}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                Multiple
                            </Typography>
                            <div className={s['variant-content']}>
                                <Select
                                    type="multiple"
                                    placeholder="Pick multiple"
                                    options={[...SELECT_OPTIONS]}
                                    value={selectMultipleValue}
                                    onChange={setSelectMultipleValue}
                                    singularPrefix="item"
                                    pluralPrefix="items"
                                />
                                <Select
                                    type="multiple"
                                    placeholder="Error state"
                                    options={[...SELECT_OPTIONS]}
                                    value={selectMultipleValue}
                                    onChange={setSelectMultipleValue}
                                    singularPrefix="item"
                                    pluralPrefix="items"
                                    errorMessage="Please select at least one"
                                />
                            </div>
                        </div>
                    </ComponentSection>
                    <ComponentSection title="Popover">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                Basic
                            </Typography>
                            <div className={s['variant-content']}>
                                <Popover>
                                    <PopoverTrigger render={<Button variant="primary" size="medium" />}>
                                        Open popover
                                    </PopoverTrigger>
                                    <PopoverContent style={{ padding: '12px' }}>
                                        <Typography variant="body-s">Popover content</Typography>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </ComponentSection>
                    <ComponentSection title="Drawer">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                Basic
                            </Typography>
                            <div className={s['variant-content']}>
                                <Drawer open={isDrawerOpened} onOpenChange={setIsDrawerOpened}>
                                    <DrawerTrigger asChild>
                                        <Button variant="primary" size="medium">
                                            Open drawer
                                        </Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <div style={{ padding: '16px' }}>
                                            <DrawerHeader>
                                                <DrawerTitle>Drawer title</DrawerTitle>
                                            </DrawerHeader>
                                            <Typography variant="body-s">
                                                This is a basic drawer example for the UI Kit.
                                            </Typography>
                                        </div>
                                    </DrawerContent>
                                </Drawer>
                            </div>
                        </div>
                    </ComponentSection>
                    <ComponentSection title="Scroll Area">
                        <div className={s['variant-container']}>
                            <Typography variant="body-s" className={s['variant-title']}>
                                Always visible scrollbar
                            </Typography>
                            <div className={s['variant-content']}>
                                <ScrollArea style={{ height: 160 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 12 }}>
                                        {Array.from({ length: 20 }).map((_, idx) => {
                                            return (
                                                <Typography key={idx} variant="body-s">
                                                    Scroll item {idx + 1}
                                                </Typography>
                                            );
                                        })}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                    </ComponentSection>
                </section>
            </div>
        </main>
    );
};

export default UiKit;
