import type React from 'react';
import type { PopoverContentProps } from '@/components/ui/Popover/types';

export type DatePickerProps = {
    value?: Date | null;
    onChange?: (_date: Date | null) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    contentProps?: PopoverContentProps;
    trigger?: React.ReactNode;
    minDate?: Date;
    maxDate?: Date;
    selectsRange?: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    onRangeChange?: (_dates: [Date | null, Date | null]) => void;
};

export type DatePickerContentProps = Pick<
    DatePickerProps,
    'value' | 'minDate' | 'maxDate' | 'selectsRange' | 'startDate' | 'endDate' | 'onChange' | 'onRangeChange'
>;

export type DatePickerContentInternalProps = DatePickerContentProps & {
    onClose?: () => void;
};
