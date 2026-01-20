import type { SelectProps } from './types';
import React from 'react';
import { Component as ArrowUp20Icon } from '@/icons/arrow-up_20.svg?svgUse';
import { Component as Check16Icon } from '@/icons/check_16.svg?svgUse';
// import { Component as Plus16Icon } from '@/icons/plus_16.svg?svgUse';
import { Component as Search16Icon } from '@/icons/search_16.svg?svgUse';
import { useRafEffect, useToggle } from '@react-hookz/web';
import { useVirtualizer } from '@tanstack/react-virtual';
import clsx from 'clsx';
import { intlPluralRulesSimplify } from '@/lib/utils/intlPluralRulesSimplify';
import { useDebounce } from '@/hooks/useDebounce';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/Drawer';
import Loader from '@/components/ui/Loader';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Typography } from '@/components/ui/Typography';
import { SELECT_CONTENT_OFFSET, SELECT_SEARCH_DEBOUNCE_DELAY } from './constants';
import Input from '../Input';
import { ScrollArea } from '../ScrollArea';
import s from './styles.module.css';

const Select: React.FC<SelectProps> = ({
    className,
    placeholder,
    type,
    value,
    options,
    size = 'default',
    singularPrefix,
    pluralPrefix,
    leftAddon,
    search = '',
    isLoading,
    isSearchable,
    isCreatable,
    disabled,
    errorMessage,
    contentProps,
    onChange,
    onOptionCreate,
    onSearchChange,
    drawerLabel = 'Select',
}) => {
    const isMobile = useIsMobile();

    const selectListRef = React.useRef<React.ComponentRef<'div'>>(null);

    const [isPopoverOpened, toggleIsPopoverOpened] = useToggle();
    const debouncedSearch = useDebounce(search, SELECT_SEARCH_DEBOUNCE_DELAY);

    const isSearchEnabled = isSearchable && !!onSearchChange;
    const isCreateOptionEnabled = isCreatable && !!onOptionCreate && !!debouncedSearch;

    const displayValue = React.useMemo(() => {
        if (!value || (Array.isArray(value) && !value.length)) {
            return placeholder;
        }

        if (type === 'single') {
            const selectedOption = options.find((option) => {
                return option.value.toString() === value;
            });

            return selectedOption?.label ?? placeholder;
        }

        const totalSelectedOptions = value.length;

        return `${totalSelectedOptions} ${intlPluralRulesSimplify(totalSelectedOptions, singularPrefix, pluralPrefix)}`;
    }, [options, placeholder, pluralPrefix, singularPrefix, type, value]);

    const filteredOptions = React.useMemo(() => {
        if (!isSearchable || !debouncedSearch) {
            return options;
        }

        return options.filter((option) => {
            return option.label.toLowerCase().includes(debouncedSearch.trim().toLowerCase());
        });
    }, [isSearchable, options, debouncedSearch]);

    const triggerJSX = React.useMemo(() => {
        return (
            <>
                <span className={s.inner}>
                    {leftAddon ? <span className={clsx(s.addon, s.left)}>{leftAddon}</span> : null}
                    <Typography
                        className={clsx(s.value, {
                            [s.placeholder]: !value || (Array.isArray(value) && !value.length),
                        })}
                        variant="body-s"
                        render={<span />}
                    >
                        {displayValue}
                    </Typography>
                </span>
                <ArrowUp20Icon className={clsx(s.icon, s.indicator)} />
            </>
        );
    }, [displayValue, leftAddon, value]);

    const virtualizer = useVirtualizer({
        count: filteredOptions.length,
        getScrollElement() {
            return selectListRef.current;
        },
        estimateSize() {
            return isMobile ? 50 : 38;
        },
    });

    const searchChangeHandler = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onSearchChange?.(event.target.value);
        },
        [onSearchChange]
    );

    useRafEffect(() => {
        if (isPopoverOpened) {
            virtualizer.measure();
        } else {
            onSearchChange?.('');
        }
    }, [isPopoverOpened, isMobile, search]);

    if (isMobile) {
        return (
            <Drawer open={isPopoverOpened} onOpenChange={toggleIsPopoverOpened}>
                <DrawerTrigger
                    className={clsx(s.trigger, 'focus-primary', className, {
                        [s.error]: !!errorMessage,
                    })}
                    data-size={size}
                    disabled={disabled}
                >
                    {triggerJSX}
                </DrawerTrigger>
                <DrawerContent className={s.content}>
                    <span className={s.line} />
                    <DrawerHeader>
                        <DrawerTitle>
                            {leftAddon}
                            {drawerLabel}
                        </DrawerTitle>
                    </DrawerHeader>
                    {isSearchEnabled ? (
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
                    ) : null}
                    {isLoading ? (
                        <span className={s['loader-wrap']}>
                            <Loader className={s.loader} />
                        </span>
                    ) : null}
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
                                    const isOptionSelected =
                                        type === 'single' ? option.value === value : value?.includes(option.value);
                                    const isLastItem = virtualItem.index === filteredOptions.length - 1;

                                    return (
                                        <li
                                            key={virtualItem.key}
                                            className={s['select-list-item']}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: `${virtualItem.size}px`,
                                                transform: `translateY(${virtualItem.start}px)`,
                                            }}
                                        >
                                            <button
                                                className={clsx(s.option, 'focus-primary', 'truncate')}
                                                role="option"
                                                type="button"
                                                aria-selected={isOptionSelected}
                                                title={option.label}
                                                onClick={() => {
                                                    if (type === 'single') {
                                                        onChange?.(option.value.toString());
                                                        toggleIsPopoverOpened(false);
                                                    } else {
                                                        const newValues = isOptionSelected
                                                            ? (value?.filter((valueOption) => {
                                                                  return valueOption !== option.value;
                                                              }) ?? [])
                                                            : [...(value ?? []), option.value];

                                                        onChange?.(newValues);
                                                    }
                                                }}
                                            >
                                                <Typography className="truncate" variant="body-s" render={<span />}>
                                                    {option.label}
                                                </Typography>
                                                {isOptionSelected ? (
                                                    <Check16Icon className={clsx(s.icon, s.check)} aria-hidden />
                                                ) : null}
                                            </button>
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
                        <div>
                            {isCreateOptionEnabled ? null : (
                                <div className={s.empty}>
                                    <Typography variant="body-s">No options found</Typography>
                                </div>
                            )}
                        </div>
                    )}
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Popover open={isPopoverOpened} onOpenChange={toggleIsPopoverOpened}>
            <PopoverTrigger
                className={clsx(s.trigger, 'focus-primary', className, {
                    [s.error]: !!errorMessage,
                })}
                data-size={size}
                disabled={disabled}
            >
                {triggerJSX}
            </PopoverTrigger>
            <PopoverContent
                className={clsx(s.content, {
                    [s.creatable]: isCreateOptionEnabled,
                })}
                {...contentProps}
                positionerProps={{
                    ...contentProps?.positionerProps,
                    align: 'start',
                    alignOffset: contentProps?.positionerProps?.alignOffset ?? SELECT_CONTENT_OFFSET,
                }}
            >
                {isSearchEnabled ? (
                    <div className={s['search-wrap']}>
                        <Input
                            placeholder="Search"
                            type="search"
                            size="sm"
                            value={search}
                            leftAddon={<Search16Icon />}
                            onChange={searchChangeHandler}
                        />
                    </div>
                ) : null}
                {/* {isCreateOptionEnabled ? (
                    <button
                        className={clsx(s.option, s.create, 'focus-primary', 'truncate')}
                        type="button"
                        title={debouncedSearch}
                        onClick={() => {
                            onOptionCreate(debouncedSearch);
                            toggleIsPopoverOpened(false);
                        }}
                    >
                        <Typography className="truncate" variant="body-s" render={<span />}>
                            <Plus16Icon />
                            <span>
                                Keep&nbsp;
                                {debouncedSearch}
                            </span>
                        </Typography>
                    </button>
                ) : null} */}
                {isLoading ? (
                    <span className={s['loader-wrap']}>
                        <Loader className={s.loader} />
                    </span>
                ) : null}
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
                                const isOptionSelected =
                                    type === 'single' ? option.value === value : value?.includes(option.value);

                                return (
                                    <li
                                        key={virtualItem.key}
                                        className={s['select-list-item']}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: `${virtualItem.size}px`,
                                            transform: `translateY(${virtualItem.start}px)`,
                                        }}
                                    >
                                        <button
                                            className={clsx(s.option, 'focus-primary', 'truncate')}
                                            role="option"
                                            type="button"
                                            aria-selected={isOptionSelected}
                                            title={option.label}
                                            onClick={() => {
                                                if (type === 'single') {
                                                    onChange?.(option.value.toString());
                                                    toggleIsPopoverOpened(false);
                                                } else {
                                                    const newValues = isOptionSelected
                                                        ? (value?.filter((valueOption) => {
                                                              return valueOption !== option.value;
                                                          }) ?? [])
                                                        : [...(value ?? []), option.value];

                                                    onChange?.(newValues);
                                                }
                                            }}
                                        >
                                            <Typography className="truncate" variant="body-s" render={<span />}>
                                                {option.label}
                                            </Typography>
                                            {isOptionSelected ? (
                                                <Check16Icon className={clsx(s.icon, s.check)} aria-hidden />
                                            ) : null}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </ScrollArea>
                ) : (
                    <div>
                        {isCreateOptionEnabled ? null : (
                            <div className={s.empty}>
                                <Typography variant="body-s">No options found</Typography>
                            </div>
                        )}
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default React.memo(Select);
