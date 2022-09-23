import { Icon } from '@acpaas-ui/react-components';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { EVENT_DELIVERY_INPUT_TAB, EVENT_DELIVERY_SETTINGS_TAB } from '../../events.const';
import { ValidationState } from '../../services/validation.helpers';

import { LinkWithValidationProps } from './LinkWithValidation.types';

import './LinkWithValidation.scss';

const LinkWithValidation: FC<LinkWithValidationProps> = ({ validationFeedback, ...props }) => {
	const renderWarning: () => JSX.Element | null = () => {
		if (!validationFeedback) {
			return null;
		}

		const hasSettingsErrors =
			props.to === EVENT_DELIVERY_SETTINGS_TAB &&
			(validationFeedback?.name !== ValidationState.Ok ||
				validationFeedback?.description !== ValidationState.Ok);
		const hasInputErrors =
			props.to === EVENT_DELIVERY_INPUT_TAB &&
			(validationFeedback?.event !== ValidationState.Ok ||
				validationFeedback?.eventDescription !== ValidationState.Ok ||
				validationFeedback?.eventVersion !== ValidationState.Ok);

		if (hasSettingsErrors || hasInputErrors) {
			return (
				<div className="icon-wrapper">
					<Icon name="exclamation-triangle" />
				</div>
			);
		}

		return null;
	};

	return (
		<>
			{renderWarning()}
			<Link {...props} />
		</>
	);
};

export default LinkWithValidation;
