import { format } from 'date-fns';
import React from 'react';
import classNames from 'classnames';
import { useDatePickerContext } from './DatePickerProvider';
import { useDisabledMonth } from './hooks';
import { isSameCalendarDate } from '../utils/utils';
import { setMonthDate } from './datePickerActions';

export interface Props {
	monthDate: Date;
}
export const DatePickerCellMonth = (props: Props) => {
	const { today, dispatch } = useDatePickerContext();
	const { monthDate } = props;

	const onClick = () => {
		dispatch(setMonthDate(monthDate));
	};

	const disabled = useDisabledMonth(monthDate);

	// by default, when the month date is created, we set the day as 1 (first day of the month)

	const cellClass = classNames('DatePicker__Cell DatePicker__Cell--wide', {
		'DatePicker__Cell--current': !disabled && isSameCalendarDate(today, monthDate),
		'DatePicker__Cell--disabled': disabled
	});

	return (
		<div role="gridcell" className="DatePicker__CellWrapper DatePicker__CellWrapper--wide">
			<button disabled={disabled} aria-label="" className={cellClass} onClick={onClick}>
				{format(monthDate, 'MMM').toUpperCase()}
			</button>
		</div>
	);
};
