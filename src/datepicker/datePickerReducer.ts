import { Reducer } from 'react';
import { DatePickerProps } from './index';
import { CHANGE_VIEW, ChangeViewAction, NEXT_MONTH, PREVIOUS_MONTH } from './datePickerActions';
import addMonths from 'date-fns/addMonths';

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

	currentDate: Date;
}

export const datePickerReducer: Reducer<DatePickerState, Action> = (state, action) => {
	const { type } = action;

	switch (type) {
		case CHANGE_VIEW: {
			const { payload } = action as ChangeViewAction;
			return {
				...state,
				currentView: payload
			};
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

		default: {
			return state;
		}
	}
};
