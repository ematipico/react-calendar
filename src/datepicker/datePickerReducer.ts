import { Reducer } from 'react';
import { DatePickerProps, DatePickerViews } from './index';
import {
	CHANGE_VIEW,
	ChangeViewAction,
	NEXT_MONTH,
	PREVIOUS_MONTH,
	SET_DAY_DATE,
	SET_MONTH_DATE,
	SET_YEAR_DATE
} from './datePickerActions';
import addMonths from 'date-fns/addMonths';
import { GO_TO_HOME, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from './keyBoardActions';
import { format, setMonth, setYear } from 'date-fns';
import { calculateFirstYearWindow } from '../utils/utils';

export interface Action {
	type: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload?: any;
}

export interface DatePickerState extends DatePickerProps {
	month?: number;

	year?: number;

	day?: number;

	weekStart: number;

	today: Date;

	currentView: DatePickerViews;

	currentDate: Date;

	views: DatePickerViews[];

	xCoordinate?: number;
	yCoordinate?: number;

	currentFocusedValue: string;
}

export const datePickerReducer: Reducer<DatePickerState, Action> = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CHANGE_VIEW: {
			const { payload } = action as ChangeViewAction;
			return {
				...state,
				currentView: payload
			};
		}

		case MOVE_RIGHT: {
			const { currentFocusedValue } = state;
			return {
				...state,
				currentFocusedValue: parseInt(currentFocusedValue, 10) + 1 + ''
			};
		}

		case MOVE_LEFT: {
			const { currentFocusedValue } = state;
			return {
				...state,
				currentFocusedValue: parseInt(currentFocusedValue, 10) - 1 + ''
			};
		}

		case MOVE_UP: {
			const { currentFocusedValue } = state;
			return {
				...state,
				currentFocusedValue: parseInt(currentFocusedValue, 10) - 7 + ''
			};
		}

		case MOVE_DOWN: {
			const { currentFocusedValue } = state;
			return {
				...state,
				currentFocusedValue: parseInt(currentFocusedValue, 10) + 7 + ''
			};
		}

		case GO_TO_HOME: {
			const { currentDate, currentView, today } = state;
			switch (currentView) {
				case DatePickerViews.Days: {
					return {
						...state,
						currentFocusedValue: '1'
					};
				}
				case DatePickerViews.Months: {
					return {
						...state,
						currentFocusedValue: format(new Date(currentDate.getFullYear(), 1), 'MMM')
					};
				}

				case DatePickerViews.Years: {
					return {
						...state,
						currentFocusedValue: format(calculateFirstYearWindow(currentDate, today), 'yyyy')
					};
				}
				default:
					return state;
			}
		}

		case NEXT_MONTH: {
			const newCurrentDate = addMonths(state.currentDate, 1);

			return {
				...state,
				currentDate: newCurrentDate
			};
		}

		case PREVIOUS_MONTH: {
			const newCurrentDate = addMonths(state.currentDate, -1);

			return {
				...state,
				currentDate: newCurrentDate
			};
		}

		case SET_YEAR_DATE: {
			const { date } = payload;

			return {
				...state,
				year: date.getFullYear(),
				currentDate: setYear(state.currentDate, date.getFullYear())
			};
		}

		case SET_MONTH_DATE: {
			const { date } = payload;
			const year = state.year || date.getFullYear();
			const month = date.getMonth();
			return {
				...state,
				year,
				month,
				currentDate: setMonth(setYear(state.currentDate, year), month)
			};
		}

		case SET_DAY_DATE: {
			const { date } = payload;
			const year = state.year || date.getFullYear();
			// months starts from zero, so 0 can't be used
			const month = typeof state.month !== 'undefined' ? state.month : date.getMonth();

			return {
				...state,
				year,
				month,
				day: date.getDate(),
				currentDate: setMonth(setYear(state.currentDate, year), month)
			};
		}

		default: {
			return state;
		}
	}
};
