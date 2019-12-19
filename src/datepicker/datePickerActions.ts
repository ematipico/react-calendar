import { DatePickerViews } from './index';

export const CHANGE_VIEW = '@datepicker/changeView';
export const NEXT_MONTH = '@datepicker/nextMonth';
export const PREVIOUS_MONTH = '@datepicker/previousMonth';
export const SET_DAY_DATE = '@datepicker/setDayDate';
export const SET_MONTH_DATE = '@datepicker/setMonthDate';
export const SET_YEAR_DATE = '@datepicker/setYearDate';
export const SET_FOCUSED_CELL = '@datepicker/setFocusedCell';

export interface ChangeViewAction {
	type: typeof CHANGE_VIEW;
	payload: DatePickerViews;
}

export interface NextMonthAction {
	type: typeof NEXT_MONTH;
}

export interface PreviousMonthAction {
	type: typeof PREVIOUS_MONTH;
}

export interface SetYearDateAction {
	type: typeof SET_YEAR_DATE;
	payload: {
		date: Date;
	};
}

export interface SetMonthDateAction {
	type: typeof SET_MONTH_DATE;
	payload: {
		date: Date;
	};
}

export interface SetDayDateAction {
	type: typeof SET_DAY_DATE;
	payload: {
		date: Date;
	};
}

export interface SetFocusedValueAction {
	type: typeof SET_FOCUSED_CELL;
	payload: {
		newFocusedValue: number;
	};
}

export function changeView(newView: DatePickerViews): ChangeViewAction {
	return {
		type: CHANGE_VIEW,
		payload: newView
	};
}

export function nextMonth(): NextMonthAction {
	return {
		type: NEXT_MONTH
	};
}

export function previousMonth(): PreviousMonthAction {
	return {
		type: PREVIOUS_MONTH
	};
}

export const setYearDate = (date: Date): SetYearDateAction => {
	return {
		type: SET_YEAR_DATE,
		payload: { date }
	};
};

export const setMonthDate = (date: Date): SetMonthDateAction => {
	return {
		type: SET_MONTH_DATE,
		payload: { date }
	};
};

export const setDayDate = (date: Date): SetDayDateAction => {
	return {
		type: SET_DAY_DATE,
		payload: { date }
	};
};

export const setFocusedCell = (newFocusedValue: number): SetFocusedValueAction => {
	return {
		type: SET_FOCUSED_CELL,
		payload: { newFocusedValue }
	};
};
