import React from 'react';
import { useDatePickerContext } from './DatePickerProvider';
import { DatePickerViews } from './index';
import { DatePickerDaysView } from './DatePickerDaysView';
import { DatePickerMonthsView } from './DatePickerMonthsView';
import { DatePickerYearsView } from './DatePickerYearsView';

export function DatePickerCurrentView() {
	const { currentView } = useDatePickerContext();

	switch (currentView) {
		case DatePickerViews.Days: {
			return <DatePickerDaysView />;
		}
		case DatePickerViews.Months: {
			return <DatePickerMonthsView />;
		}
		case DatePickerViews.Years: {
			return <DatePickerYearsView />;
		}
		default:
			return <DatePickerDaysView />;
	}
}
