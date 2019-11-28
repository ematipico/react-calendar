import { Reducer } from "react";
import { DatePickerProps } from "./index";
import { CHANGE_VIEW, ChangeViewAction } from "./datePickerActions";

export interface Action {
	type: string;
	payload: any;
}

export interface DatePickerState extends DatePickerProps {
	month?: number;

	year?: number;

	day?: number;
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

		default: {
			return state;
		}
	}
};
