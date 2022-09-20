/* eslint-disable import/no-unresolved */
import { Button } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import translationsConnector from '../../connectors/translations';

import { DestinationsFormActionsProps } from './DestinationsCreate.types';

const DestinationsFormActions: FC<DestinationsFormActionsProps> = ({
	onCancel,
	onSubmit,
	isLoading,
}) => {
	const [t] = translationsConnector.useCoreTranslation();

	return (
		<div className="u-wrapper row end-xs">
			<Button
				className="u-margin-right-xs"
				onClick={onCancel}
				type="primary"
				negative
				disabled={isLoading}
			>
				{t(translationsConnector.CORE_TRANSLATIONS.BUTTON_CANCEL)}
			</Button>
			<Button
				iconLeft={isLoading ? 'circle-o-notch fa-spin' : null}
				disabled={isLoading}
				className="u-margin-right-xs"
				onClick={onSubmit}
				htmlType="submit"
				type="success"
			>
				{t(translationsConnector.CORE_TRANSLATIONS.BUTTON_SAVE)}
			</Button>
		</div>
	);
};

export default DestinationsFormActions;
