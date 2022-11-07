import React, { FC } from 'react';

import { TestEventNoFilterMatchMessageProps } from './TestEventNoFilterMatchMessage.types';

const TestEventNoFilterMatchMessage: FC<TestEventNoFilterMatchMessageProps> = ({
	message = '',
	filters = [],
}) => {
	return (
		<>
			<p className="u-margin-bottom-xs">{message}</p>
			<p>
				{filters?.map(f => (
					<>
						<span key={f} className="u-bg-light">
							{f}
						</span>
						<br></br>
					</>
				))}
			</p>
		</>
	);
};

export default TestEventNoFilterMatchMessage;
