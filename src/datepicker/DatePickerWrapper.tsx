import React from 'react';

interface Props {
	children: React.ReactNode;
}

export const DatePickerWrapper = (props: Props) => {
	return <div className="DatePicker">{props.children}</div>;
};
