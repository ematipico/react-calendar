import React from 'react';
import { DatePickerProvider } from './DatePickerProvider';
import { DatePickerWrapper } from './DatePickerWrapper';
import { DatePickerHead } from './DatePickerHead';
import { DatePickerBody } from './DatePickerBody';

export enum DatePickerViews {
	Days = 'Days',
	Months = 'Months',
	Years = 'Years'
}

export const Days = {
	Sunday: 0,
	Monday: 1,
	Tuesday: 2,
	Wednesday: 3,
	Thursday: 4,
	Friday: 5,
	Saturday: 6
};

export interface DatePickerProps {
	/**
	 *
	 */
	minDate?: Date;

	/**
	 *
	 */
	maxDate?: Date;

	/**
	 *
	 */
	currentDate?: Date;

	/**
	 *
	 */

	currentView?: DatePickerViews;

	/**
	 *
	 */
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export default function DatePicker(props: DatePickerProps) {
	return (
		<DatePickerProvider>
			<DatePickerWrapper>
				<DatePickerHead />
				<DatePickerBody />
			</DatePickerWrapper>
		</DatePickerProvider>
	);
}
