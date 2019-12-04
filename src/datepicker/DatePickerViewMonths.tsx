import React, { useEffect, useRef, useState } from 'react';
import { useNextView, useShouldSetDateValue } from './hooks';
import { useDatePickerContext } from './DatePickerProvider';
import { changeView } from './datePickerActions';
import { DatePickerCellMonth } from './DatePickerCellMonth';

export function DatePickerViewMonths() {
	const { currentDate, month, dispatch } = useDatePickerContext();
	const shouldSetValue = useShouldSetDateValue();
	const nextView = useNextView();

	const rows = useRef(Array.from(Array(3)));
	const cells = useRef(Array.from(Array(4)));
	const [months, setMonths] = useState(
		Array.from(Array(12)).map((noValue, index) => {
			return new Date(currentDate.getFullYear(), index, 1);
		})
	);

	useEffect(() => {
		setMonths(
			Array.from(Array(12)).map((noValue, index) => {
				return new Date(currentDate.getFullYear(), index, 1);
			})
		);
	}, [currentDate]);

	// changing the view when we set the month
	useEffect(() => {
		if (typeof month !== 'undefined' && !shouldSetValue) {
			dispatch(changeView(nextView));
		}
	}, [dispatch, month, nextView, shouldSetValue]);

	return (
		<>
			{rows.current.map((noValue, rowIndex) => {
				return (
					<div key={rowIndex} className="DatePicker__Row" role="row">
						{cells.current.map((noValue, cellIndex) => {
							return <DatePickerCellMonth key={cellIndex} monthDate={months[rowIndex * 4 + cellIndex]} />;
						})}
					</div>
				);
			})}
		</>
	);
}
