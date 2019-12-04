import React from 'react';
import classNames from 'classnames';
import isSameMonth from 'date-fns/isSameMonth';
import format from 'date-fns/format';
import { useDatePickerContext } from './DatePickerProvider';
import { Formats } from '../constants';
import enGB from 'date-fns/locale/en-GB';
import { useDisabledDay } from './hooks';
import { isSameCalendarDate } from '../utils/utils';
import { setDayDate } from './datePickerActions';

interface Props {
	date: Date;
}

const dayLabel = (date: Date) => {
	return format(date, Formats.EEEE_MM_YYYY, {
		locale: enGB
	});
};

export function DatePickerCellDay(props: Props) {
	const { date } = props;
	const { today, currentDate, dispatch } = useDatePickerContext();
	const disabled = useDisabledDay(date);
	const notSameMonth = !isSameMonth(date, currentDate);
	const cellClass = classNames('DatePicker__Cell', {
		'DatePicker__Cell--current': !disabled && isSameCalendarDate(today, date),
		'DatePicker__Cell--disabled': disabled || notSameMonth
	});

	const onClick = () => {
		dispatch(setDayDate(date));
	};

	return (
		<div role="gridcell" className="DatePicker__CellWrapper">
			<button disabled={disabled || notSameMonth} aria-label={dayLabel(date)} className={cellClass} onClick={onClick}>
				{date.getDate()}
			</button>
		</div>
	);
}
