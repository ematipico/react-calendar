import { render } from '@testing-library/react';
import { DatePicker } from './index';
import React from 'react';
import { format } from 'date-fns';

describe('Datepicker', () => {
	it('should render a default calendar', () => {
		const { getByText } = render(<DatePicker />);

		expect(getByText(format(new Date(), 'MMMM'))).toBeTruthy();
	});
});
