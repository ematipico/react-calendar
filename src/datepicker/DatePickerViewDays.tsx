import React, { Fragment } from 'react';
import { useDatePickerContext } from './DatePickerProvider';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import addDays from 'date-fns/addDays';
import { DatePickerCellDay } from './DatePickerCellDay';

const days = Array.from(new Array(7).keys());

export function DatePickerViewDays() {
	const { currentDate } = useDatePickerContext();

	const firstDateOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

	const lastDateOfMonth = lastDayOfMonth(currentDate);
	const weeks = eachWeekOfInterval(
		{ start: firstDateOfTheMonth, end: lastDateOfMonth },
		{
			weekStartsOn: 1
		}
	);

	return (
		<Fragment>
			{weeks.map((firstDayOfWeek: Date, index: number) => {
				return (
					<div className="DatePicker__Row" key={index}>
						{days.map((day: number) => {
							const currentDay = addDays(firstDayOfWeek, day);
							return <DatePickerCellDay key={day} date={currentDay} />;
						})}
					</div>
				);
			})}
		</Fragment>
	);
}
