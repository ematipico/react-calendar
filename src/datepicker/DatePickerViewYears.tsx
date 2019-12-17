import React, { Fragment, useEffect, useRef } from 'react';
import { useDatePickerContext } from './DatePickerProvider';
import { addYears } from 'date-fns';
import { useFirstYear, useNextView, useShouldSetDateValue } from './hooks';
import { changeView } from './datePickerActions';
import { DatePickerCellYear } from './DatePickerCellYear';

export function DatePickerViewYears() {
	const { dispatch, year } = useDatePickerContext();
	const rows = useRef(Array.from(Array(5)));
	const cells = useRef(Array.from(Array(4)));
	const firstDateYear = useFirstYear();

	const nextView = useNextView();
	const shouldSetValue = useShouldSetDateValue();
	// changing the view when we set the year
	useEffect(() => {
		if (year && !shouldSetValue) {
			dispatch(changeView(nextView));
		}
		// eslint-disable-next-line
	}, [year, shouldSetValue]);

	return (
		<Fragment>
			{rows.current.map((_, rowIndex) => {
				return (
					<div key={rowIndex} className="DatePicker__Row" role="row">
						{cells.current.map((_, cellIndex) => {
							return <DatePickerCellYear key={cellIndex} date={addYears(firstDateYear, rowIndex * 4 + cellIndex)} />;
						})}
					</div>
				);
			})}
		</Fragment>
	);
}
