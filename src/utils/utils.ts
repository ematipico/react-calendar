import {
	addMonths,
	addYears,
	endOfMonth,
	endOfYear,
	isAfter,
	isBefore,
	isSameDay,
	isSameMonth,
	isSameYear,
	isWithinInterval,
	setDate,
	setMonth,
	setYear
} from "date-fns";
import { DatePickerViews } from "../datepicker";

/**
 * It calculates the next view to render in the date picker
 * @param views
 * @param currentView
 */
export function getNextView(views: DatePickerViews[], currentView: DatePickerViews): DatePickerViews {
	let nextView = currentView;

	views.forEach((value, index) => {
		if (value === currentView) {
			if (index + 1 === views.length) {
				nextView = views[0];
			} else {
				nextView = views[index + 1];
			}
		}
	});
	return nextView;
}

/**
 * Given a current date and an interval/array of dates, it returns a boolean
 * saying if that date should be disabled
 * @param currentDate
 * @param disabledDates
 * @param toCheck
 */
export function getDisabledDates(currentDate: Date, disabledDates?: Array<Date | Interval>, toCheck?: "day" | "month" | "year"): boolean {
	let disabled = false;

	if (!disabledDates) return disabled;

	disabled = disabledDates.some(value => {
		if (value instanceof Date) {
			if (toCheck === "day") return isSameDay(value, currentDate);
			if (toCheck === "month") return isSameMonth(value, currentDate);
			if (toCheck === "year") return isSameYear(value, currentDate);
			return false;
		} else {
			return isWithinInterval(currentDate, value);
		}
	});
	return disabled;
}

export function calculateIfDateIsSet(views: DatePickerViews[], day?: number, month?: number, year?: number): boolean {
	return views.every(view => {
		if (view == DatePickerViews.Years) {
			return !!year;
		} else if (view == DatePickerViews.Months) {
			// months starts from zero, so 0 can't be used
			return typeof month !== "undefined";
		} else if (view == DatePickerViews.Days) {
			return !!day;
		} else {
			return false;
		}
	});
}

/**
 * This function makes sure that the first year is always the same inside a
 * matrix of 20 years.
 *
 * The calendar window is created using the "Today" date => 2010 - 2029
 * If current date is 2011, the years window is still 2010 - 2029
 *
 * If the current date is 1999, the years window will shift of 20 years backwards
 *
 * @param currentDate
 * @param today
 */
export function calculateFirstYearWindow(currentDate: Date, today: Date) {
	const firstYearWindow = addYears(today, -9);
	const lastYearWindow = addYears(firstYearWindow, 20);

	if (
		isWithinInterval(currentDate, {
			start: firstYearWindow,
			end: lastYearWindow
		})
	) {
		return firstYearWindow;
	} else {
		if (isAfter(currentDate, lastYearWindow)) {
			return addYears(firstYearWindow, 20);
		} else {
			return addYears(firstYearWindow, -20);
		}
	}
}

/**
 * Like the function {@link calculateFirstYearWindow}, but the gives the last year of the
 * calendar window
 * @param currentDate
 * @param today
 */
export function calculateLastYearWindow(currentDate: Date, today: Date) {
	const firstYearWindow = addYears(today, -9);
	const lastYearWindow = addYears(firstYearWindow, 20);

	if (
		isWithinInterval(currentDate, {
			start: firstYearWindow,
			end: lastYearWindow
		})
	) {
		return firstYearWindow;
	} else {
		if (isBefore(currentDate, lastYearWindow)) {
			return addYears(lastYearWindow, -21);
		} else {
			return addYears(lastYearWindow, 21);
		}
	}
}

export function calculateChosenDate(day?: number, month?: number, year?: number): Date | undefined {
	if (day && typeof month !== "undefined" && year) {
		return new Date(year, month, day);
	} else if (year && typeof month !== "undefined") {
		return new Date(year, month);
	} else if (year) {
		return new Date(year);
	}
	return undefined;
}

/**
 * It says if the current date is before a given max date
 * by checking its day
 * @param currentDate
 * @param minDate
 */
export function isBeforeDay(currentDate: Date, minDate: Date): boolean {
	return isBefore(currentDate, setYear(setMonth(setDate(currentDate, minDate.getDate()), minDate.getMonth()), minDate.getFullYear()));
}

/**
 * It says if the current date is after a given max date
 * by checking its day
 * @param currentDate
 * @param maxDate
 */
export function isAfterDay(currentDate: Date, maxDate: Date): boolean {
	return isAfter(currentDate, setYear(setMonth(setDate(currentDate, maxDate.getDate()), maxDate.getMonth()), maxDate.getFullYear()));
}

interface CanMoveForward {
	currentView: DatePickerViews;
	currentDate: Date;
	maxDate: Date;
	today: Date;
}

export function canMoveForward({ currentDate, currentView, today, maxDate }: CanMoveForward): boolean {
	switch (currentView) {
		case DatePickerViews.Days: {
			// create a new date as: first day of the next month from the current date
			const newDate = addMonths(setDate(currentDate, 1), 1);
			// after that we check if this new date is after or not the max date
			return !isAfterDay(newDate, maxDate);
		}
		case DatePickerViews.Months: {
			// create a new date: month of the next year from the current date
			const newDate = addYears(setMonth(currentDate, 1), 1);
			// after that we check if this new date is after or not the max date
			return !isAfter(newDate, maxDate);
		}

		case DatePickerViews.Years: {
			// create a new date: as the year view contains 20 years
			// the new date has to have, as year, the year after the last one inside the calendar view
			// example, calendar year view: from 2009 got 2029
			// current date has 2017
			// the new date should be 2030
			const newDate = calculateFirstYearWindow(addYears(today, 20), currentDate);
			// after that we check if this new date is after or not the max date
			return !isAfter(newDate, maxDate);
		}
		default:
			return true;
	}
}

interface CanMoveBackwards {
	currentView: DatePickerViews;
	currentDate: Date;
	minDate: Date;
	today: Date;
}

export function canMoveBackwards({ currentDate, currentView, today, minDate }: CanMoveBackwards): boolean {
	switch (currentView) {
		case DatePickerViews.Days: {
			// create a new date as: last day of the previous month from the current date
			const newDate = endOfMonth(addMonths(currentDate, -1));
			// after that we check if this new date is after or not the max date
			return !isBeforeDay(newDate, minDate);
		}
		case DatePickerViews.Months: {
			// create a new date: the last month of the previous year from the current date
			// 2019-09-10 => 2018-12-31
			const newDate = endOfYear(addYears(currentDate, -1));
			// after that we check if this new date is after or not the max date
			return !isBefore(newDate, minDate);
		}

		case DatePickerViews.Years: {
			// create a new date: as the year view contains 20 years
			// the new date has to have, as year, the year after the last one inside the calendar view
			// example, calendar year view: from 2009 got 2029
			// current date has 2017
			// the new date should be 20
			const newDate = calculateLastYearWindow(addYears(today, -20), currentDate);
			// after that we check if this new date is after or not the max date
			return !isBefore(newDate, minDate);
		}
		default:
			return true;
	}
}
