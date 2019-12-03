import React from "react";
import { DatePickerProvider } from "./DatePickerProvider";
import { DatePickerWrapper } from "./DatePickerWrapper";
import { DatePickerHead } from "./DatePickerHead";
import { DatePickerBody } from "./DatePickerBody";

export enum DatePickerViews {
	Days = "Days",
	Months = "Months",
	Years = "Years"
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

export type ShouldDisabled = (currentDate: Date) => boolean;
export type OnDateChosen = (date: Date) => void;


export interface DatePickerProps {

	/**
	 * Called when a date is chosen
	 */
	onDateChosen?: OnDateChosen;

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

	/**
	 * An array of dates to disable
	 */
	disabledDates?: Date[]

	/**
	 * It marks a specific cell month disabled or not.
	 */
	shouldDisableMonth?: ShouldDisabled;
	/**
	 * It marks a specific cell month disabled or not.
	 */
	shouldDisableYear?: ShouldDisabled;
	/**
	 * It marks a specific cell month disabled or not.
	 */
	shouldDisableDay?: ShouldDisabled;

	/**
	 * The list of views to support. By default it supports all of them: day, year and month
	 */
	views?: DatePickerViews[];
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
