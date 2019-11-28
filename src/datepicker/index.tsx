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
