import React, { Fragment } from 'react';
import { HandleKeyPress, useDatePickerContext } from './DatePickerProvider';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import addDays from 'date-fns/addDays';
import { DatePickerCellDay } from './DatePickerCellDay';
import { KEY_NAMES } from '../constants';
import { moveDown, moveLeft, moveRight, moveUp } from './keyBoardActions';

const days = Array.from(new Array(7).keys());

export function DatePickerViewDays() {
	const { currentDate, dispatch } = useDatePickerContext();

	const firstDateOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

	const lastDateOfMonth = lastDayOfMonth(currentDate);
	const weeks = eachWeekOfInterval(
		{ start: firstDateOfTheMonth, end: lastDateOfMonth },
		{
			weekStartsOn: 1
		}
	);

	const onKeyPress: HandleKeyPress = ({ evt, maxCellNumber, cellNumber }) => {
		switch (evt.key) {
			case KEY_NAMES.TAB: {
				if (evt.shiftKey) {
					if (cellNumber - 1 > 0) {
						dispatch(moveLeft());
					}
				} else {
					if (cellNumber + 1 <= maxCellNumber) {
						dispatch(moveRight());
					}
				}
				break;
			}
			case KEY_NAMES.ARROW_RIGHT: {
				if (cellNumber + 1 <= maxCellNumber) {
					dispatch(moveRight());
				}
				break;
			}
			case KEY_NAMES.ARROW_DOWN: {
				if (cellNumber + 7 <= maxCellNumber) {
					dispatch(moveDown());
				}
				break;
			}
			case KEY_NAMES.ARROW_LEFT: {
				if (cellNumber - 1 > 0) {
					dispatch(moveLeft());
				}
				break;
			}
			case KEY_NAMES.ARROW_UP: {
				if (cellNumber - 7 >= 1) {
					dispatch(moveUp());
				}
				break;
			}
		}
	};

	return (
		<Fragment>
			{weeks.map((firstDayOfWeek: Date, weekIndex: number) => {
				return (
					<div className="DatePicker__Row" key={weekIndex}>
						{days.map((day: number) => {
							const currentDay = addDays(firstDayOfWeek, day);
							return (
								<DatePickerCellDay
									maxCellNumber={lastDateOfMonth.getDate()}
									cellNumber={currentDay.getDate()}
									key={day}
									date={currentDay}
									onKeyPress={onKeyPress}
								/>
							);
						})}
					</div>
				);
			})}
		</Fragment>
	);
}
