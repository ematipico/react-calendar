import React from "react";
import { useDatePickerContext } from "./DatePickerProvider";
import { DatePickerViews, Days } from "./index";
import { DatePickerControls } from "./DatePickerControls";

export function DatePickerHead() {
	const { currentView } = useDatePickerContext();
	return (
		<header className="DatePicker__Head">
			<DatePickerControls />
			{currentView === DatePickerViews.Days && (
				<div className="DatePicker__Days">
					{Object.keys(Days).map((dayName: string) => {
						return (
							<div key={dayName} className="DatePicker__DayName">
								{dayName.substr(0, 3)}
							</div>
						);
					})}
				</div>
			)}
		</header>
	);
}
