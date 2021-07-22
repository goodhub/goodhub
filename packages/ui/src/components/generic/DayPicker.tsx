import { Popover, Transition } from '@headlessui/react';
import { format, isValid, getMonth, getDate, lastDayOfMonth, getYear, parse } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';

import { Day, useLilius } from 'use-lilius';
import { TextInput } from './forms/TextInput';
import { DatePicker } from './DatePicker';

export const parseTextToDate = (value: string, context: { current: Date }) => {
  const parts = value.split('/');
  const partsAsNumber = parts.map((p) => parseInt(p, 10));

  // Make sure the month is within the valid range
  // of months (1 - 12). If no month is given, default
  // to the one we're looking at.
  if (parts.length < 1) {
    parts[0] = `${getMonth(context.current)}`;
  } else if (partsAsNumber[0] < 1) {
    parts[0] = '1';
  } else if (partsAsNumber[0] > 12) {
    parts[0] = '12';
  }

  // Make sure the day is within the valid range
  // of days (1 - last day of the given month). If no
  // day is given, default to the first day.
  if (parts.length < 2) {
    parts[1] = '1';
  } else if (partsAsNumber[1] < 1) {
    parts[1] = '1';
  } else if (partsAsNumber[1] > getDate(lastDayOfMonth(context.current))) {
    parts[1] = `${getDate(lastDayOfMonth(context.current))}`;
  }

  // If no year is given, default to the one we're looking at.
  // If the user passes in 2 digits, append them to the first 2 digits
  // of the year we're looking at. Example: `12` becomes `2012` if we're
  // looking at any year between 2000 and 2999.
  if (parts.length < 3) {
    parts[2] = `${getYear(context.current)}`;
  } else if (partsAsNumber[2] > 9 && partsAsNumber[2] < 100) {
    parts[2] = `${Math.round(getYear(context.current) / 1000) * 1000 + partsAsNumber[2]}`;
  }

  return parse(parts.join('/'), 'dd/MM/yyyy', new Date());
}

interface DayPickerProps {
  value?: Date
  onChange?: (date?: Date) => void
}

export const DayPicker: FC<DayPickerProps> = ({ value, onChange }) => {
  const {
    calendar,
    clearSelected,
    inRange,
    isSelected,
    select,
    selected,
    setViewing,
    toggle,
    viewing,
    viewNextMonth,
    viewPreviousMonth,
  } = useLilius({ selected: value ? [value] : [], weekStartsOn: Day.MONDAY });

  const [inputValue, setInputValue] = useState('');

  // Only accept digits and forward slash as input.
  const onInputChange = (input: string) => {
    setInputValue(input.trim().replace(/[^\d/]+/g, ''));
  };

  // When the input field loses focus, we need to parse
  // the input to set the date. While doing this, we also do some
  // assumptions for the user and fix mistakes.
  const onInputBlur = () => {
    // If the input is empty, we should just go ahead and
    // clear the current selection.
    if (inputValue === '') {
      clearSelected();
      return;
    }

    const parsed = parseTextToDate(inputValue, { current: viewing })

    if (isValid(parsed)) {
      select(parsed, true);
    } else if (selected.length > 0) {
      setInputValue(format(selected[0], 'EEEE do MMMM yyyy'));
    } else {
      setInputValue('');
    }
  };

  // When the selection is changed, we want to update the input field
  // and the currently viewed month to match.
  useEffect(() => {
    setInputValue(selected.length > 0 ? format(selected[0], 'EEEE do MMMM yyyy') : '');
    setViewing(selected.length > 0 ? selected[0] : new Date());

    onChange?.(selected?.[0])
  }, [selected, onChange, setViewing, setInputValue]);

  return (
    <div className="w-full">
      <Popover as="div" className="relative z-10 w-full inline-block select-none">
        {({ open }) => (
          <>
            <div className="flex items-center relative">
              <TextInput
                name="date"
                onBlur={() => onInputBlur()}
                onChange={(value) => onInputChange(value)}
                description='Select a Date'
                value={inputValue}
              >
                <Popover.Button className="mt-1 p-1">
                  <FiCalendar
                    aria-label="Open Calendar"
                    className="text-gray-500 hover:text-gray-700"
                  />
                </Popover.Button>
              </TextInput>
            </div>

            <Transition
              show={open}
              className="z-10"
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel static as="div" className="w-max-content absolute right-0 mt-1 origin-top-right shadow-lg cursor-default">
                <DatePicker
                  calendar={calendar}
                  selected={selected}
                  viewing={viewing}
                  inRange={inRange}
                  isSelected={isSelected}
                  viewPreviousMonth={viewPreviousMonth}
                  viewNextMonth={viewNextMonth}
                  onDayClick={(day) => toggle(day, true)}
                />
              </Popover.Panel>
            </Transition>
          </>)}
      </Popover>
    </div>
  );
};
