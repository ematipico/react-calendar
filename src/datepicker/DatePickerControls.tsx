import React from 'react';
import { useDatePickerContext } from './DatePickerProvider';
import { DatePickerViews } from './index';
import { changeView, nextMonth, previousMonth } from './datePickerActions';
import { Formats } from '../constants';
import format from 'date-fns/format';
import { useNextView } from './hooks';

export function DatePickerControls() {
	const { currentView, dispatch, currentDate } = useDatePickerContext();
	const nextView = useNextView();

	let nextLabel: string;
	let previousLabel: string;
	let onClickNext;
	let onClickPrevious;
	let mainControl: string;
	// TODO: make it dynamic
	let mainControlLabel: string = 'Go to the next view';
	switch (currentView) {
		case DatePickerViews.Days: {
			nextLabel = 'Go to the next month';
			previousLabel = 'Go to the previous month';
			onClickNext = () => dispatch(nextMonth());
			onClickPrevious = () => dispatch(previousMonth());
			mainControl = format(currentDate, Formats.MMMM);
			break;
		}
		case DatePickerViews.Months: {
			nextLabel = 'Go to the next year';
			previousLabel = 'Go to the previous year';
			onClickNext = () => dispatch(nextMonth());
			onClickPrevious = () => dispatch(previousMonth());
			mainControl = format(currentDate, Formats.MMMM);

			break;
		}
		case DatePickerViews.Years: {
			nextLabel = 'Go to the next set of years';
			previousLabel = 'Go to the previous set of years';
			onClickNext = () => dispatch(nextMonth());
			onClickPrevious = () => dispatch(previousMonth());
			mainControl = format(currentDate, Formats.MMMM);

			break;
		}
		default:
			nextLabel = 'Next';
			previousLabel = 'Previous';
			onClickNext = () => dispatch(nextMonth());
			onClickPrevious = () => dispatch(previousMonth());
			mainControl = format(currentDate, Formats.MMMM);
	}

	return (
		<div className="DatePicker__Controls">
			<div>
				<button
					type="button"
					aria-label={mainControlLabel}
					className="DatePicker__Control DatePicker__ViewControl"
					onClick={() => dispatch(changeView(nextView))}
				>
					{mainControl}
				</button>
			</div>
			<div>
				<button
					type="button"
					className="DatePicker__Control DatePicker__Arrows DatePicker__Previous"
					aria-label={previousLabel}
					onClick={onClickPrevious}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-chevron-left"
					>
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</button>
				<button
					type="button"
					className="DatePicker__Control DatePicker__Arrows DatePicker__Next"
					aria-label={nextLabel}
					onClick={onClickNext}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-chevron-right"
					>
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>
			</div>
		</div>
	);
}
