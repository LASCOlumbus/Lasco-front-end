import type { Country, FlagProps } from 'react-phone-number-input';
import type { WithClassName } from '@/lib/types';
import type { CountrySelectProps } from './types';
import React from 'react';
import { Component as ChevronUp16Icon } from '@/icons/chevron-up_16.svg?svgUse';
import { Component as Search16Icon } from '@/icons/search_16.svg?svgUse';
import { useRafEffect, useToggle } from '@react-hookz/web';
import { useVirtualizer } from '@tanstack/react-virtual';
import clsx from 'clsx';
import { getCountryCallingCode } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { useDebounce } from '@/hooks/useDebounce';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/Drawer';
import Input from '@/components/ui/Input';
import Option from '@/components/ui/Option';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Typography } from '@/components/ui/Typography';
import s from './styles.module.css';

const FlagComponent: React.FC<WithClassName<FlagProps>> = ({ className, country, countryName }) => {
    const Flag = flags[country];

    return (
        <span className={clsx(s.flag, className)}>
            {/* {Flag ? <Flag title={countryName} /> :
            <Phone20Icon className={clsx(s.icon, s.phone)} aria-hidden />} */}
            {Flag ? <Flag title={countryName} /> : null}
            <span className="sr-only">{countryName}</span>
        </span>
    );
};

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, disabled, options }) => {
    const isMobile = useIsMobile();

    const selectListRef = React.useRef<HTMLDivElement>(null);

    const [isPopoverOpened, toggleIsPopoverOpened] = useToggle();
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search);

    const filteredOptions = React.useMemo(() => {
        if (!debouncedSearch) {
            return options;
        }

        return options.filter((option) => {
            return option.label.toLowerCase().includes(debouncedSearch.trim().toLowerCase());
        });
    }, [options, debouncedSearch]);

    const virtualizer = useVirtualizer({
        count: filteredOptions.length,
        getScrollElement() {
            return selectListRef.current;
        },
        estimateSize() {
            return isMobile ? 46 : 40;
        },
    });

    const searchChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }, []);

    useRafEffect(() => {
        if (isPopoverOpened) {
            virtualizer.measure();
        } else {
            setSearch('');
        }
    }, [isPopoverOpened, isMobile, search]);

    if (isMobile) {
        return (
            <Drawer open={isPopoverOpened} onOpenChange={toggleIsPopoverOpened}>
                <DrawerTrigger className={clsx(s.trigger, 'focus-primary')} disabled={disabled}>
                    <FlagComponent country={value} countryName={value} aria-hidden />
                    <span className="text-muted-foreground/80">
                        <ChevronUp16Icon className={clsx(s.icon, s.indicator)} aria-hidden />
                    </span>
                </DrawerTrigger>
                <DrawerContent className={s.content}>
                    <span className={s.line} />
                    <DrawerHeader>
                        <DrawerTitle>
                            {/* <Phone20Icon /> */}
                            Select country
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className={s['search-wrap']}>
                        <Input
                            placeholder="Search"
                            type="search"
                            size="default"
                            value={search}
                            leftAddon={<Search16Icon />}
                            onChange={searchChangeHandler}
                        />
                    </div>
                    {filteredOptions.length ? (
                        <ScrollArea className={s.list} viewportRef={selectListRef}>
                            <ul
                                style={{
                                    position: 'relative',
                                    height: `${virtualizer.getTotalSize()}px`,
                                    width: '100%',
                                }}
                            >
                                {virtualizer.getVirtualItems().map((virtualItem) => {
                                    const option = filteredOptions[virtualItem.index];
                                    const isOptionSelected = option.value === value;
                                    const isLastItem = virtualItem.index === filteredOptions.length - 1;

                                    return (
                                        <li
                                            key={virtualItem.key}
                                            className={s['list-item']}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: `${virtualItem.size}px`,
                                                transform: `translateY(${virtualItem.start}px)`,
                                            }}
                                        >
                                            <Option
                                                className={s.option}
                                                role="option"
                                                isSelected={isOptionSelected}
                                                title={option.label}
                                                onClick={() => {
                                                    onChange(option.value as Country);
                                                    toggleIsPopoverOpened(false);
                                                }}
                                            >
                                                <Typography className="truncate" variant="body-s" render={<span />}>
                                                    {option.value ? (
                                                        <FlagComponent
                                                            country={option.value}
                                                            countryName={value}
                                                            aria-hidden
                                                        />
                                                    ) : null}
                                                    {option.label}&nbsp;
                                                    {option.value ? `+${getCountryCallingCode(option.value)}` : ''}
                                                </Typography>
                                            </Option>
                                            {isLastItem ? null : (
                                                <svg
                                                    className={s.separator}
                                                    width="768"
                                                    height="2"
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <line strokeDasharray="6, 6" x1="0" y1="1" x2="600" y2="1" />
                                                </svg>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </ScrollArea>
                    ) : (
                        <div className={s.empty}>
                            <Typography variant="body-s">No options found</Typography>
                        </div>
                    )}
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Popover open={isPopoverOpened} onOpenChange={toggleIsPopoverOpened}>
            <PopoverTrigger className={clsx(s.trigger, 'focus-primary')} disabled={disabled}>
                <FlagComponent country={value} countryName={value} aria-hidden />
                <ChevronUp16Icon className={clsx(s.icon, s.indicator)} aria-hidden />
            </PopoverTrigger>
            <PopoverContent
                className={s.content}
                positionerProps={{
                    align: 'start',
                    sideOffset: 4,
                }}
            >
                <div className={s['search-wrap']}>
                    <Input
                        className={s.input}
                        placeholder="Search"
                        type="search"
                        size="sm"
                        value={search}
                        leftAddon={<Search16Icon className={s.icon} />}
                        onChange={searchChangeHandler}
                    />
                </div>
                {filteredOptions.length ? (
                    <ScrollArea viewportRef={selectListRef} className={s.list}>
                        <ul
                            style={{
                                position: 'relative',
                                height: `${virtualizer.getTotalSize()}px`,
                                width: '100%',
                            }}
                        >
                            {virtualizer.getVirtualItems().map((virtualItem) => {
                                const option = filteredOptions[virtualItem.index];
                                const isOptionSelected = option.value === value;

                                return (
                                    <li
                                        key={virtualItem.key}
                                        className={s['list-item']}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: `${virtualItem.size}px`,
                                            transform: `translateY(${virtualItem.start}px)`,
                                        }}
                                    >
                                        <Option
                                            className={clsx(s.option, 'truncate')}
                                            isSelected={isOptionSelected}
                                            title={option.label}
                                            onClick={() => {
                                                onChange(option.value as Country);
                                                toggleIsPopoverOpened(false);
                                            }}
                                        >
                                            <Typography
                                                className={clsx(s.label, 'truncate')}
                                                variant="body-s"
                                                render={<span />}
                                            >
                                                {option.value ? (
                                                    <FlagComponent
                                                        country={option.value}
                                                        countryName={value}
                                                        aria-hidden
                                                    />
                                                ) : null}
                                                <span className="truncate">{option.label}</span>
                                                {option.value ? `+${getCountryCallingCode(option.value)}` : ''}
                                            </Typography>
                                        </Option>
                                    </li>
                                );
                            })}
                        </ul>
                    </ScrollArea>
                ) : (
                    <div className={s.empty}>
                        <Typography variant="body-s">No options found</Typography>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default React.memo(CountrySelect);
export { FlagComponent };
