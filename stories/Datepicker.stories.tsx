import React from "react";
import { DatePicker } from "../src";
import "../src/index.css";
import {addDays, subDays} from "date-fns";

export default {
	title: "Components|Datepicker"
};

export const DefaultView = () => {
	return <DatePicker />;
};


export const WithMinDate = () => {
	return <DatePicker minDate={subDays(new Date(), 8)} />;
};


export const WithMaxDate = () => {
	return <DatePicker maxDate={addDays(new Date(), 8)} />;
};
