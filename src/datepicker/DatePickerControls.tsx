import React from 'react';
import { useDatePickerContext } from './DatePickerProvider';
import { DatePickerViews } from './index';
import {changeView, nextMonth, previousMonth} from './datePickerActions';
import { Formats } from '../constants';
import format from 'date-fns/format';
import {useNextView} from "./hooks";

export function DatePickerControls() {
	const { currentView, dispatch, currentDate } = useDatePickerContext();
	const nextView = useNextView();

	let nextLabel: string;
	let previousLabel: string;
	let onClickNext;
	let onClickPrevious;
	let mainControl: string;
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
				<button type="button" className="DatePicker__Control" onClick={() => dispatch(changeView(nextView))}>{mainControl}</button>
			</div>
			<div>
				<button type="button" className="DatePicker__Control DatePicker__Previous" aria-label={previousLabel} onClick={onClickPrevious}>
					{'<-'}
				</button>
				<button type="button" className="DatePicker__Control DatePicker__Next" aria-label={nextLabel} onClick={onClickNext}>
					{'->'}
				</button>
			</div>
		</div>
	);
}
