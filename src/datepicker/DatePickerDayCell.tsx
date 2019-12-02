import React from 'react';
import classNames from 'classnames';
import isSameMonth from 'date-fns/isSameMonth';
import format from 'date-fns/format';
import { useDatePickerContext } from './DatePickerProvider';
import { Formats } from '../constants';
import enGB from 'date-fns/locale/en-GB';

interface Props {
	date: Date;
}

const dayLabel = (date: Date) => {
	return format(date, Formats.EEEE_MM_YYYY, {
		locale: enGB
	});
};

export function DatePickerDayCell(props: Props) {
	const { date } = props;
	const { currentDate } = useDatePickerContext();
	const notSameMonth = !isSameMonth(date, currentDate);
	const cellClass = classNames('DatePicker__Cell', {
		'DatePicker__Cell--disabled': notSameMonth
	});
	return (
		<div role="gridcell" className="DatePicker__CellWrapper">
			<button disabled={notSameMonth} aria-label={dayLabel(date)} className={cellClass}>
				{date.getDate()}
			</button>
		</div>
	);
}
