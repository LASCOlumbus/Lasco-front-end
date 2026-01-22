import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import type { DatePickerContentInternalProps, DatePickerProps } from './types';
import React from 'react';
import { Component as Calendar20Icon } from '@/icons/calendar_20.svg?svgUse';
import { Component as ChevronUp20Icon } from '@/icons/chevron-up_20.svg?svgUse';
import { useToggle } from '@react-hookz/web';
import clsx from 'clsx';
import { format } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { ScrollArea } from '@/components/ui/ScrollArea';
import s from './styles.module.css';

import 'react-datepicker/dist/react-datepicker.css';

import { SELECT_CONTENT_OFFSET } from '../Select/constants';
import { YEARS_FOR_DROPDOWN } from './constants';
import { Button } from '../Button';

const DatePickerContent: React.FC<DatePickerContentInternalProps> = ({
    value,
    onChange,
    minDate,
    maxDate,
    onClose,
    selectsRange,
    startDate,
    endDate,
    onRangeChange,
}) => {
    const today = new Date();
    const currentYear = value ? value.getFullYear() : today.getFullYear();

    const [selectedYear, setSelectedYear] = React.useState(currentYear);
    const [currentDisplayMonth, setCurrentDisplayMonth] = React.useState(value ? value.getMonth() : today.getMonth());
    const [isYearDropdownOpen, toggleYearDropdown] = useToggle();

    React.useEffect(() => {
        if (value) {
            setCurrentDisplayMonth(value.getMonth());
            setSelectedYear(value.getFullYear());
        }
    }, [value]);

    const handleYearSelect = (selectedYearValue: number) => {
        setSelectedYear(selectedYearValue);
        const dayToUse = value?.getDate() ?? 1;
        // Ensure the date is valid (e.g., Feb 30 becomes Feb 28/29)
        const lastDayOfMonth = new Date(selectedYearValue, currentDisplayMonth + 1, 0).getDate();
        const validDay = Math.min(dayToUse, lastDayOfMonth);
        const finalDate = new Date(selectedYearValue, currentDisplayMonth, validDay);

        if (!minDate || finalDate >= minDate) {
            if (!maxDate || finalDate <= maxDate) {
                onChange?.(finalDate);
            }
        }
    };

    const handleMonthChange = (date: Date) => {
        setCurrentDisplayMonth(date.getMonth());
    };

    const handleDateChange = (date: Date | null) => {
        onChange?.(date ?? null);
        if (date) {
            onClose?.();
        }
    };

    const handleRangeChange = (dates: [Date | null, Date | null] | null) => {
        if (dates) {
            onRangeChange?.(dates);
            // Close when both dates are selected
            if (dates[0] && dates[1]) {
                onClose?.();
            }
        } else {
            onRangeChange?.([null, null]);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRangeChangeTyped = handleRangeChange as any;

    const renderCustomHeader = ({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
    }: ReactDatePickerCustomHeaderProps) => {
        return (
            <div className={s.header}>
                <Button
                    className={clsx(s.cta, s.nav)}
                    type="button"
                    variant="secondary"
                    size="small"
                    isIcon
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    aria-label="Previous month"
                >
                    <ChevronUp20Icon className={clsx(s.icon, s.prev)} />
                </Button>
                <Popover open={isYearDropdownOpen} onOpenChange={toggleYearDropdown}>
                    <PopoverTrigger className={s['month-year']}>
                        {format(date, 'MMMM yyyy')}
                        <ChevronUp20Icon className={s.icon} />
                    </PopoverTrigger>
                    <PopoverContent
                        className={clsx(s.dropdown, s.year)}
                        positionerProps={{
                            align: 'end',
                            sideOffset: 4,
                        }}
                    >
                        <ScrollArea className={s.scroll}>
                            {YEARS_FOR_DROPDOWN.map((yearValue) => {
                                const isSelected = yearValue === selectedYear;
                                const isFuture = yearValue > today.getFullYear();

                                return (
                                    <button
                                        key={yearValue}
                                        type="button"
                                        className={s.option}
                                        data-selected={isSelected}
                                        data-future={isFuture}
                                        onClick={() => {
                                            handleYearSelect(yearValue);
                                            toggleYearDropdown(false);
                                        }}
                                    >
                                        {yearValue}
                                    </button>
                                );
                            })}
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
                <Button
                    className={clsx(s.cta, s.nav)}
                    type="button"
                    variant="secondary"
                    size="small"
                    isIcon
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    aria-label="Next month"
                >
                    <ChevronUp20Icon className={clsx(s.icon, s.next)} />
                </Button>
            </div>
        );
    };

    const dayClassName = (date: Date) => {
        let isSelected = false;
        let isInRange = false;
        let isRangeStart = false;
        let isRangeEnd = false;

        if (selectsRange && startDate && endDate) {
            const dateStr = date.toDateString();
            const startStr = startDate.toDateString();
            const endStr = endDate.toDateString();
            isRangeStart = dateStr === startStr;
            isRangeEnd = dateStr === endStr;
            isInRange = date >= startDate && date <= endDate;
            isSelected = isRangeStart || isRangeEnd;
        } else if (selectsRange && startDate && !endDate) {
            isSelected = date.toDateString() === startDate.toDateString();
        } else if (!selectsRange && value) {
            isSelected = date.toDateString() === value.toDateString();
        }

        const isOtherMonth = date.getMonth() !== currentDisplayMonth;

        return clsx(s.day, {
            [s['day-other-month']]: isOtherMonth,
            [s['day-selected']]: isSelected,
            [s['day-in-range']]: isInRange && !isSelected,
            [s['day-range-start']]: isRangeStart,
            [s['day-range-end']]: isRangeEnd,
        });
    };

    if (selectsRange) {
        return (
            <div className={s.content}>
                <ReactDatePicker
                    selected={startDate ?? null}
                    onChange={handleRangeChangeTyped}
                    minDate={minDate}
                    maxDate={maxDate}
                    inline
                    selectsRange
                    startDate={startDate ?? null}
                    endDate={endDate ?? null}
                    renderCustomHeader={renderCustomHeader}
                    dayClassName={dayClassName}
                    calendarClassName={s.picker}
                    onMonthChange={handleMonthChange}
                    fixedHeight
                />
            </div>
        );
    }

    return (
        <div className={s.content}>
            <ReactDatePicker
                selected={value ?? null}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                inline
                renderCustomHeader={renderCustomHeader}
                dayClassName={dayClassName}
                calendarClassName={s.picker}
                onMonthChange={handleMonthChange}
                fixedHeight
            />
        </div>
    );
};

const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    placeholder = 'MM / DD / YYYY',
    disabled,
    className,
    contentProps,
    minDate,
    maxDate,
    selectsRange,
    startDate,
    endDate,
    onRangeChange,
}) => {
    const [isOpen, toggleIsOpen] = useToggle();

    const formatDate = (date: Date | null): string => {
        return date ? format(date, 'MM/dd/yyyy') : placeholder;
    };

    const formatDateRange = (start: Date | null, end: Date | null): string => {
        if (!start && !end) {
            return placeholder;
        } else if (start && !end) {
            return `${formatDate(start)} - ...`;
        } else if (start && end) {
            return `${formatDate(start)} - ${formatDate(end)}`;
        } else {
            return placeholder;
        }
    };

    return (
        <div className={s.wrap}>
            <Popover open={isOpen} onOpenChange={toggleIsOpen}>
                <PopoverTrigger
                    className={clsx(s.trigger, 'focus-primary', {
                        [s.placeholder]: selectsRange ? !startDate && !endDate : !value,
                    })}
                    disabled={disabled}
                >
                    <Calendar20Icon />
                    {selectsRange ? formatDateRange(startDate ?? null, endDate ?? null) : formatDate(value ?? null)}
                </PopoverTrigger>
                <PopoverContent
                    {...contentProps}
                    className={clsx(contentProps?.className, className)}
                    positionerProps={{
                        align: 'start',
                        sideOffset: contentProps?.positionerProps?.alignOffset ?? SELECT_CONTENT_OFFSET,
                    }}
                >
                    <DatePickerContent
                        value={value ?? null}
                        onChange={onChange}
                        minDate={minDate}
                        maxDate={maxDate}
                        selectsRange={selectsRange}
                        startDate={startDate ?? null}
                        endDate={endDate ?? null}
                        onRangeChange={onRangeChange}
                        onClose={() => {
                            return toggleIsOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DatePicker;
