import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { DatePickerProps, DatePickerViews } from './index';
import { Action, datePickerReducer, DatePickerState } from './datePickerReducer';

export interface DatePickerContext extends DatePickerProps {
	dispatch: Dispatch<Action>;
}

const DatePickerContext = createContext<DatePickerContext | null>(null);

DatePickerContext.displayName = 'DatePickerContext';

export const DatePickerProvider: React.FunctionComponent<DatePickerProps> = props => {
	const initialState: DatePickerState = Object.assign(
		{},
		{
			weekStart: 1,
			currentView: DatePickerViews.Days
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
