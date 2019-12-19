import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { DatePicker } from '../src';
import { format } from 'date-fns';

describe('Datepicker', () => {
	it('should render the day view by default', () => {
		const { queryByText } = render(<DatePicker />);

		const month = format(new Date(), 'MMMM');

		expect(queryByText(month)).toBeTruthy();
	});

	it('should render when a current date is passed', () => {
		const date = new Date(2018, 11, 11);
		const { getByText, queryByText, container } = render(<DatePicker currentDate={date} />);

		expect(queryByText('December')).toBeTruthy();
		const control = getByText('December');
		expect(container.firstChild).toMatchSnapshot();

		fireEvent.click(control);
		expect(queryByText('2010 - 2029')).toBeTruthy();
	});

	it('should correctly render the control label', () => {
		const date = new Date(2019, 11, 11);
		const { getByText, queryByText } = render(<DatePicker currentDate={date} />);

		expect(queryByText('December')).toBeTruthy();
		let control = getByText('December');
		fireEvent.click(control);
		expect(queryByText('2010 - 2029')).toBeTruthy();
		control = getByText('2010 - 2029');
		fireEvent.click(control);
		expect(queryByText('2019')).toBeTruthy();
	});
});
