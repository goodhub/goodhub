import { FC } from 'react';
import { format, getDay } from 'date-fns';
import Card from './Card';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Day } from './Day';

interface DatePickerProps {
  selected: Date[];
  viewing: Date;
  calendar: Date[][];

  isSelected: (date: Date) => boolean;
  inRange: (date: Date, min: Date, max: Date) => boolean;
  viewPreviousMonth: () => void;
  viewNextMonth: () => void;

  onDayClick: (day: Date) => void;
}

export const DatePicker: FC<DatePickerProps> = ({
  calendar,
  viewing,
  selected,
  viewPreviousMonth,
  viewNextMonth,
  isSelected,
  inRange,
  onDayClick
}) => {
  return (
    <Card className="py-2 z-20">
      <div className="flex justify-between items-center px-3 py-1">
        <FiChevronLeft
          aria-label="Previous Month"
          className="cursor-pointer hover:bg-gray-50 w-8 h-8 p-1.5 rounded-lg"
          onClick={viewPreviousMonth}
        />

        <p>{format(viewing, 'MMMM yyyy')}</p>

        <FiChevronRight
          aria-label="Next Month"
          className="cursor-pointer hover:bg-gray-50 w-8 h-8 p-1.5 rounded-lg"
          onClick={viewNextMonth}
        />
      </div>

      <div className="px-2 pt-2">
        <div className="grid grid-cols-7 text-sm text-center">
          {calendar.length > 0 &&
            calendar[0].map(day => (
              <div key={`${day}`} className="p-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][getDay(day)]}
              </div>
            ))}
        </div>

        {calendar.map(week => (
          <div key={`week-${week[0]}`} className="grid grid-cols-7 text-gray-600">
            {week.map(day => (
              <Day
                key={day.toString()}
                day={day}
                selected={selected}
                viewing={viewing}
                inRange={inRange}
                isSelected={isSelected}
                onClick={() => onDayClick(day)}
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};
