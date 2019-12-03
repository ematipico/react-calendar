import { Reducer } from "react";
import { DatePickerProps, DatePickerViews } from "./index";
import { CHANGE_VIEW, ChangeViewAction } from "./datePickerActions";
import { GO_TO_HOME, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from "./keyBoardActions";
import { format } from "date-fns";
import { calculateFirstYearWindow } from "../utils/utils";

export interface Action {
	type: string;
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
	const { type } = action;

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
				currentFocusedValue: parseInt(currentFocusedValue, 10) + 1 + ""
			};
		}

		case MOVE_LEFT: {
			const { currentFocusedValue } = state;
			return {
				...state,
				currentFocusedValue: parseInt(currentFocusedValue, 10) - 1 + ""
			};
		}

		case MOVE_UP: {
			const { currentFocusedValue } = state;
			return {
				...state,
				currentFocusedValue: parseInt(currentFocusedValue, 10) - 7 + ""
			};
		}

		case MOVE_DOWN: {
			const { currentFocusedValue } = state;
			return {
				...state,
				currentFocusedValue: parseInt(currentFocusedValue, 10) + 7 + ""
			};
		}

		case GO_TO_HOME: {
			const { currentDate, currentView, today } = state;
			switch (currentView) {
				case DatePickerViews.Days: {
					return {
						...state,
						currentFocusedValue: "1"
					};
				}
				case DatePickerViews.Months: {
					return {
						...state,
						currentFocusedValue: format(new Date(currentDate.getFullYear(), 1), "MMM")
					};
				}

				case DatePickerViews.Years: {
					return {
						...state,
						currentFocusedValue: format(calculateFirstYearWindow(currentDate, today), "yyyy")
					};
				}
				default:
					return state;
			}
		}

		default: {
			return state;
		}
	}
};
