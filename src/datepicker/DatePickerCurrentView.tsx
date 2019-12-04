import React, {useEffect} from 'react';
import { useDatePickerContext } from './DatePickerProvider';
import { DatePickerViews } from './index';
import { DatePickerViewDays } from './DatePickerViewDays';
import { DatePickerViewMonths } from './DatePickerViewMonths';
import { DatePickerViewYears } from './DatePickerViewYears';
import {useChosenDate, useShouldSetDateValue} from "./hooks";

export function DatePickerCurrentView() {
	const { currentView, onDateChosen } = useDatePickerContext();

	const shouldSetValue = useShouldSetDateValue();
	const chosenDate = useChosenDate();

	useEffect(() => {
		if (shouldSetValue === true && chosenDate) {
			onDateChosen && onDateChosen(chosenDate);
		}
	}, [chosenDate, onDateChosen, shouldSetValue]);

	switch (currentView) {
		case DatePickerViews.Days: {
			return <DatePickerViewDays />;
		}
		case DatePickerViews.Months: {
			return <DatePickerViewMonths />;
		}
		case DatePickerViews.Years: {
			return <DatePickerViewYears />;
		}
		default:
			return <DatePickerViewDays />;
	}
}
