import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import isSameMonth from 'date-fns/isSameMonth';
import format from 'date-fns/format';
import { HandleKeyPress, useDatePickerContext } from './DatePickerProvider';
import { Formats } from '../constants';
import enGB from 'date-fns/locale/en-GB';
import { useDisabledDay } from './hooks';
import { isSameCalendarDate } from '../utils/utils';
import { setDayDate, setFocusedCell } from './datePickerActions';

interface Props {
	date: Date;
	cellNumber: number;
	maxCellNumber: number;
	onKeyPress: HandleKeyPress;
}

const dayLabel = (date: Date) => {
	return format(date, Formats.EEEE_MM_YYYY, {
		locale: enGB
	});
};

export function DatePickerCellDay(props: Props) {
	const { date, cellNumber, maxCellNumber, onKeyPress } = props;
	const { today, currentDate, dispatch, currentFocusedValue } = useDatePickerContext();
	const disabled = useDisabledDay(date);
	const notSameMonth = !isSameMonth(date, currentDate);
	const cellClass = classNames('DatePicker__Cell', {
		'DatePicker__Cell--current': !disabled && isSameCalendarDate(today, date),
		'DatePicker__Cell--disabled': disabled || notSameMonth
	});

	const wrapperClass = classNames('DatePicker__CellWrapper', {
		'DatePicker__CellWrapper--is-today': isSameCalendarDate(date, today)
	});
	const button = useRef<HTMLButtonElement>(null);

	const onClick = () => {
		dispatch(setFocusedCell(cellNumber));
		dispatch(setDayDate(date));
	};

	const onKeyDown = (evt: React.KeyboardEvent) => {
		onKeyPress({ evt, maxCellNumber, cellNumber });
	};

	useEffect(() => {
		if (cellNumber === 1 && button.current) {
			button.current.focus();
		}
	}, []);

	useEffect(() => {
		if (cellNumber === currentFocusedValue && button.current) {
			button.current.focus();
		}
	}, [currentFocusedValue]);

	return (
		<div role="gridcell" className={wrapperClass}>
			<button
				disabled={disabled || notSameMonth}
				aria-label={dayLabel(date)}
				className={cellClass}
				onKeyDown={onKeyDown}
				onClick={onClick}
				ref={button}
			>
				{date.getDate()}
			</button>
		</div>
	);
}
