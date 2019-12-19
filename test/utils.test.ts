import { calculateChosenDate, calculateIfDateIsSet, getNextView, isSameCalendarDate, shouldDateBeDisabled } from '../src/utils/utils';
import { DatePickerViews } from '../src/datepicker';

describe('Utils', () => {
	describe('getNextView', () => {
		it('should return then next view', () => {
			const views = [DatePickerViews.Days, DatePickerViews.Months];
			const nextView = getNextView(views, DatePickerViews.Days);
			expect(nextView).toEqual(DatePickerViews.Months);
		});

		it('should return then next view when current view is the last one', () => {
			const views = [DatePickerViews.Days, DatePickerViews.Months];
			const nextView = getNextView(views, DatePickerViews.Months);
			expect(nextView).toEqual(DatePickerViews.Days);
		});
	});

	describe('calculateChosenDate', () => {
		it('should calculate a correct date based on input', () => {
			expect(calculateChosenDate()).toBeUndefined();
			expect(calculateChosenDate(2019)).toEqual(new Date(2019));
			expect(calculateChosenDate(2019, 0)).toEqual(new Date(2019, 0));
			expect(calculateChosenDate(2019, 0, 31)).toEqual(new Date(2019, 0, 31));
		});
	});

	describe('shouldDateBeDisabled', () => {
		it('should mark a date disabled if has the same day', () => {
			const currentDate = new Date();
			const dates = [new Date()];

			expect(shouldDateBeDisabled(currentDate, dates, 'day')).toBeTruthy();
		});

		it('should mark a date disabled if  they are in the same month', () => {
			const currentDate = new Date(2019, 2, 23);
			const dates = [new Date(2019, 2, 11), new Date()];

			expect(shouldDateBeDisabled(currentDate, dates, 'month')).toBeTruthy();
		});

		it('should mark a date disabled if they are in the same year', () => {
			const currentDate = new Date(2019, 2, 23);
			const dates = [new Date(2019, 6, 11), new Date()];

			expect(shouldDateBeDisabled(currentDate, dates, 'year')).toBeTruthy();
		});

		it('should mark a date not disabled by default', () => {
			expect(shouldDateBeDisabled(new Date())).toBeFalsy();
		});

		it('should mark a date disabled if it is inside the given intervals', () => {
			const intervals = [
				{
					start: new Date(2019, 2, 5),
					end: new Date(2019, 2, 18)
				}
			];
			expect(shouldDateBeDisabled(new Date(2019, 2, 9), intervals)).toBeTruthy();
		});

		it('should mark a date not disabled if it is not inside the given intervals', () => {
			const intervals = [
				{
					start: new Date(2019, 2, 5),
					end: new Date(2019, 2, 18)
				},
				{
					start: new Date(2019, 3, 5),
					end: new Date(2019, 3, 18)
				}
			];
			expect(shouldDateBeDisabled(new Date(2019, 2, 19), intervals)).toBeFalsy();
		});
	});

	describe('isSameCalendarDate', () => {
		it('should return true for dates that are equals on the calendar', () => {
			expect(isSameCalendarDate(new Date(), new Date())).toBeTruthy();
		});

		it('should return false for dates that are not equals on the calendar', () => {
			expect(isSameCalendarDate(new Date(2019, 1, 1), new Date(2019, 1, 2))).toBeFalsy();
			expect(isSameCalendarDate(new Date(2019, 1, 1), new Date(2019, 2, 1))).toBeFalsy();
			expect(isSameCalendarDate(new Date(2019, 1, 1), new Date(2020, 1, 1))).toBeFalsy();
		});
	});

	describe('calculateIfDateIsSet', () => {
		const oneView = [DatePickerViews.Days];
		const twoViews = [DatePickerViews.Months, DatePickerViews.Days];
		const threeViews = [DatePickerViews.Days, DatePickerViews.Months, DatePickerViews.Years];
		it('should return false if the information are note set', () => {
			expect(calculateIfDateIsSet(oneView)).toBeFalsy();
			expect(calculateIfDateIsSet(twoViews)).toBeFalsy();
			expect(calculateIfDateIsSet(threeViews)).toBeFalsy();
		});
	});
});
