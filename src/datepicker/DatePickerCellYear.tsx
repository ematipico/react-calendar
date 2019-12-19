import { format } from 'date-fns';
import React from 'react';
import classNames from 'classnames';
import { useDatePickerContext } from './DatePickerProvider';
import { useDisabledYear } from './hooks';
import { isSameCalendarDate } from '../utils/utils';
import { setYearDate } from './datePickerActions';

export interface Props {
	date: Date;
}
export const DatePickerCellYear = (props: Props) => {
	const { date } = props;
	const { today, dispatch } = useDatePickerContext();

	const onClick = () => {
		dispatch(setYearDate(date));
	};

	const disabled = useDisabledYear(date);

	const cellClass = classNames('DatePicker__Cell DatePicker__Cell--wide  DatePicker__CellYear', {
		'DatePicker__Cell--current': !disabled && isSameCalendarDate(today, date),
		'DatePicker__Cell--disabled': disabled
	});

	return (
		<div role="gridcell" className="DatePicker__CellWrapper DatePicker__CellWrapper--wide">
			<button disabled={disabled} aria-label={format(date, 'yyyy')} className={cellClass} onClick={onClick}>
				{format(date, 'yyyy')}
			</button>
		</div>
	);
};
