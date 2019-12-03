import { Reducer } from "react";
import { DatePickerProps, DatePickerViews } from "./index";
import { CHANGE_VIEW, ChangeViewAction } from "./datePickerActions";

type AllKeyOf<T> = T extends never ? never : keyof T;

type NotPartial<T, K> = { [P in Extract<keyof T, K>]-?: T[P] };

type WithRequiredProperties<T, K extends AllKeyOf<T>> = T extends never ? never : Omit<T, K> & NotPartial<T, K>;

export interface Action {
	type: string;
	payload: any;
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
