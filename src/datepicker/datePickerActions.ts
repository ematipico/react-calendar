import {DatePickerViews} from './index';

export const CHANGE_VIEW = '@datepicker/changeView';


export interface ChangeViewAction {
	type: typeof CHANGE_VIEW,
	payload: DatePickerViews
}

export function changeView(newView: DatePickerViews) {
	return {
		type: CHANGE_VIEW,
		payload: newView
	};
}
