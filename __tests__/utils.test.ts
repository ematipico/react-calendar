import { getNextView } from "../src/utils";
import { DatePickerViews } from "../src/datepicker";

describe("Utils", () => {
	describe("getNextView", () => {
		it("should return then next view", () => {
			const views = [DatePickerViews.Days, DatePickerViews.Months];
			const nextView = getNextView(views, DatePickerViews.Days);
			expect(nextView).toEqual(DatePickerViews.Months);
		});
	});
});
