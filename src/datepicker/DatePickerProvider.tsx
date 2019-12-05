import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { DatePickerProps, DatePickerViews } from './index';
import { Action, datePickerReducer, DatePickerState } from './datePickerReducer';

interface HandleKeyPressPayload {
	evt: React.KeyboardEvent;
	cellNumber: number;
	maxCellNumber: number;
}
export type HandleKeyPress = (payload: HandleKeyPressPayload) => void;

export interface DatePickerContext extends DatePickerState {
	dispatch: Dispatch<Action>;
}

const DatePickerContext = createContext<DatePickerContext | null>(null);

DatePickerContext.displayName = 'DatePickerContext';

export const DatePickerProvider: React.FunctionComponent<DatePickerProps> = props => {
	const initialState: DatePickerState = Object.assign(
		{},
		{
			weekStart: 1,
			currentView: DatePickerViews.Days,
			today: new Date(),
			currentDate: new Date(),
			views: [DatePickerViews.Years, DatePickerViews.Months, DatePickerViews.Days],
			currentFocusedValue: 1
		},
		props
	);
	const [state, dispatch] = useReducer(datePickerReducer, initialState);

	return (
		<DatePickerContext.Provider
			value={{
				...state,
				dispatch
			}}
		>
			{props.children}
		</DatePickerContext.Provider>
	);
};

export const useDatePickerContext = () => {
	const context = useContext(DatePickerContext);

	if (!context) throw new Error('You must define the ' + DatePickerContext.displayName);

	return context;
};
