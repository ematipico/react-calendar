import React, {createContext, Dispatch, useContext, useReducer} from 'react';
import {DatePickerProps, DatePickerViews} from './index';
import {Action, datePickerReducer, DatePickerState} from './datePickerReducer';
import {KEY_NAMES} from '../constants';
import {moveDown, moveLeft, moveRight, moveUp} from './keyBoardActions';

interface HandleKeyPressPayload {
	evt: React.KeyboardEvent;
	cellDate: Date;
}
type HandleKeyPress = (payload: HandleKeyPressPayload) => void;

export interface DatePickerContext extends DatePickerState {
	dispatch: Dispatch<Action>;
	handleKeyPress: HandleKeyPress;
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
			currentFocusedValue: ''
		},
		props
	);
	const [state, dispatch] = useReducer(datePickerReducer, initialState);

	const handleKeyPress: HandleKeyPress = ({ evt, cellDate }) => {
		switch (evt.key) {
			case KEY_NAMES.ARROW_RIGHT: {
				dispatch(moveRight());
				break;
			}
			case KEY_NAMES.ARROW_DOWN: {
				dispatch(moveDown());
				break;
			}
			case KEY_NAMES.ARROW_LEFT: {
				dispatch(moveLeft());
				break;
			}
			case KEY_NAMES.ARROW_UP: {
				dispatch(moveUp());
				break;
			}
		}
	};

	return (
		<DatePickerContext.Provider
			value={{
				...state,
				dispatch,
				handleKeyPress
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
