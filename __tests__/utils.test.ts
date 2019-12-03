import { getNextView } from "../src/utils/utils";
import { DatePickerViews } from "../src/datepicker";

describe("Utils", () => {
	describe("getNextView", () => {
		it("should return then next view", () => {
			const views = [DatePickerViews.Days, DatePickerViews.Months];
			const nextView = getNextView(views, DatePickerViews.Days);
			expect(nextView).toEqual(DatePickerViews.Months);
		});

		it("should return then next view when current view is the last one", () => {
			const views = [DatePickerViews.Days, DatePickerViews.Months];
			const nextView = getNextView(views, DatePickerViews.Months);
			expect(nextView).toEqual(DatePickerViews.Days);
		});
	});
});
