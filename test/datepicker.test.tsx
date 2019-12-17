import { render } from '@testing-library/react';
import * as React from 'react';
import { DatePicker } from '../src';
import { format } from 'date-fns';

describe('Datepicker', () => {
	it('should render the day view by default', () => {
		const { getByText } = render(<DatePicker />);

		const month = format(new Date(), 'MMMM');

		expect(getByText(month)).toBeTruthy();
	});
});
