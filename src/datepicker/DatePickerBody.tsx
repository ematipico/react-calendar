import React from 'react';
import { DatePickerCurrentView } from './DatePickerCurrentView';

export function DatePickerBody() {
	return (
		<main className="DatePicker__Body" role="grid">
			<DatePickerCurrentView />
		</main>
	);
}
