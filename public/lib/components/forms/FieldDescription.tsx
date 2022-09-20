import React, { FC } from 'react';

interface FieldDescriptionProps {
	message: string;
	state: string;
}

const FieldDescription: FC<FieldDescriptionProps> = ({ message, state }) => {
	return (
		<div className="a-input">
			<small className={state === 'error' ? 'u-text-danger' : ''}>{message}</small>
		</div>
	);
};

export default FieldDescription;
