import { DatePickerViews } from './index';

export const CHANGE_VIEW = '@datepicker/changeView';
export const NEXT_MONTH = '@datepicker/nextMonth';
export const PREVIOUS_MONTH = '@datepicker/previousMonth';

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
