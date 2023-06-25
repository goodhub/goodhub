import { FC } from 'react';
import { endOfMonth, format, isToday, isEqual, startOfMonth } from 'date-fns';

const merge = (...classes: (string | undefined | null)[]) => classes.filter(Boolean).join(' ');

interface DayProps {
  day: Date;
  viewing: Date;
  selected: Date[];

  isSelected: (date: Date) => boolean;
  inRange: (date: Date, min: Date, max: Date) => boolean;

  onClick: () => void;
}

export const Day: FC<DayProps> = ({ day, selected, viewing, isSelected, inRange, onClick }) => {
  return (
    <div
      style={{ aspectRatio: '1' }}
      className={merge(
        'flex items-center justify-center cursor-pointer my-0.5',
        // Rounds the left side if is the first selected (or only)
        isSelected(day) && isEqual(day, selected[0]) ? 'rounded-l-full' : null,

        // Rounds the right side if is the last selected (or only)
        isSelected(day) && isEqual(day, selected[selected.length - 1]) ? 'rounded-r-full' : null,

        // Is not in the current month being viewed
        !inRange(day, startOfMonth(viewing), endOfMonth(viewing)) ? 'text-gray-400' : null,

        // Subtle highlight of today when today is not selected
        isToday(day) && !isSelected(day) ? 'text-blue-700 font-semibold' : null,

        // Boldly highlight & provide hover feedback for currently selected date
        isSelected(day) ? 'bg-blue-700 hover:bg-blue-800 text-white font-bold' : null,

        // If not selected (and therefore not using custom colours), provide default hover feedback
        !isSelected(day) ? 'hover:bg-gray-100 hover:text-gray-800 hover:rounded-full' : null
      )}
      key={`${day}`}
      onClick={onClick}
    >
      <p>{format(day, 'd')}</p>
    </div>
  );
};
