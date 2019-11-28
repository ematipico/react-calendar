import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { DatePickerProps } from "./index";
import { Action, datePickerReducer } from "./datePickerReducer";

export interface DatePickerContext extends DatePickerProps {
	dispatch: Dispatch<Action>;
}

const DatePickerContext = createContext<DatePickerContext | null>(null);

DatePickerContext.displayName = "DatePickerContext";

export const DatePickerProvider: React.FunctionComponent = props => {
	const [state, dispatch] = useReducer(datePickerReducer, {});

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

	if (!context) throw new Error("You must define the " + DatePickerContext.displayName);

	return context;
};
