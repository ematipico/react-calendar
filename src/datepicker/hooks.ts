import { isAfter, isBefore, setMonth, setYear } from 'date-fns';
import { useMemo } from 'react';
import { useDatePickerContext } from './DatePickerProvider';
import {
	calculateChosenDate,
	calculateFirstYearWindow,
	calculateIfDateIsSet,
	canMoveBackwards,
	canMoveForward,
	getDisabledDates,
	getNextView,
	isAfterDay,
	isBeforeDay
} from '../utils/utils';

export const useNextView = () => {
	const { views, currentView } = useDatePickerContext();
	return useMemo(() => getNextView(views, currentView), [currentView, views]);
};

/**
 * This hook tells to a component if the current day should be disabled or not.
 * It uses: minDate, maxDate, disabledDates and the shouldDisableDay callback
 * @param currentDate
 * @returns {boolean}
 */
export const useDisabledDay = (currentDate: Date): boolean => {
	const { disabledDates, minDate, maxDate, shouldDisableDay } = useDatePickerContext();

	return useMemo(() => {
		return (
			(minDate && isBeforeDay(currentDate, minDate)) ||
			(maxDate && isAfterDay(currentDate, maxDate)) ||
			getDisabledDates(currentDate, disabledDates, 'day') ||
			(shouldDisableDay ? shouldDisableDay(currentDate) : false)
		);
	}, [currentDate, disabledDates, maxDate, minDate, shouldDisableDay]);
};

/**
 * This hook tells to a component if the current month should be disabled or not.
 * It uses: minDate, maxDate, disabledDates and the shouldDisabledMonth callback
 * @param currentDate
 * @returns {boolean}
 */
export const useDisabledMonth = (currentDate: Date): boolean => {
	const { disabledDates, minDate, maxDate, shouldDisableMonth } = useDatePickerContext();

	return useMemo(() => {
		return (
			(minDate && isBefore(currentDate, setYear(setMonth(currentDate, minDate.getMonth()), minDate.getFullYear()))) ||
			(maxDate && isAfter(currentDate, setYear(setMonth(currentDate, maxDate.getMonth()), maxDate.getFullYear()))) ||
			getDisabledDates(currentDate, disabledDates, 'month') ||
			(shouldDisableMonth ? shouldDisableMonth(currentDate) : false)
		);
	}, [currentDate, disabledDates, maxDate, minDate, shouldDisableMonth]);
};

/**
 * This hook tells to a component if the current month should be disabled or not.
 * It uses: minDate, maxDate, disabledDates and the shouldDisabledMonth callback
 * @param currentDate
 * @returns {boolean}
 */
export const useDisabledYear = (currentDate: Date): boolean => {
	const { disabledDates, minDate, maxDate, shouldDisableYear } = useDatePickerContext();

	return useMemo(() => {
		return (
			(minDate && isBefore(currentDate, setYear(currentDate, minDate.getFullYear()))) ||
			(maxDate && isAfter(currentDate, setYear(currentDate, maxDate.getFullYear()))) ||
			getDisabledDates(currentDate, disabledDates, 'year') ||
			(shouldDisableYear ? shouldDisableYear(currentDate) : false)
		);
	}, [currentDate, disabledDates, maxDate, minDate, shouldDisableYear]);
};

/**
 * This hook tells to a component if the date picker is ready to set a value to a field
 */
export const useShouldSetDateValue = (): boolean => {
	const { views, day, month, year } = useDatePickerContext();
	return useMemo(() => calculateIfDateIsSet(views, day, month, year), [views, day, month, year]);
};

/**
 * This hook returns the date by composing the day, month and year that have been chosen
 */
export const useChosenDate = () => {
	const { day, month, year } = useDatePickerContext();
	return useMemo(() => calculateChosenDate(day, month, year), [day, month, year]);
};

/**
 * This hook returns the first year that should be shown inside the calendar year view
 */
export const useFirstYear = () => {
	const { currentDate, today } = useDatePickerContext();
	return useMemo(() => calculateFirstYearWindow(currentDate, today), [currentDate, today]);
};

/**
 * This hooks tells to the controls if it's possible to move forward based on the current view
 */
export const useCanMoveForward = () => {
	const { currentView, currentDate, maxDate, today } = useDatePickerContext();

	return useMemo(() => {
		if (!maxDate) {
			return true;
		}
		return canMoveForward({ currentView, currentDate, maxDate, today });
	}, [currentDate, currentView, maxDate, today]);
};

/**
 * This hooks tells to the controls if it's possible to move backwards based on the current view
 */
export const useCanMoveBackwards = () => {
	const { currentView, currentDate, minDate, today } = useDatePickerContext();

	return useMemo(() => {
		if (!minDate) {
			return true;
		}
		return canMoveBackwards({ currentView, currentDate, minDate, today });
	}, [currentDate, currentView, minDate, today]);
};
