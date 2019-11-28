import React from "react";
import {useDatePickerContext} from "./DatePickerProvider";

export function DatePickerBody() {
	const { currentView } = useDatePickerContext()
	return <main className="DatePicker__Body">


	</main>;
}
