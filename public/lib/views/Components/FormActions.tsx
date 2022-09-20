/* eslint-disable import/no-unresolved */
import { Button } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import translationsConnector from '../../connectors/translations';

import { FormActionsProps } from './components.types';

const FormActions: FC<FormActionsProps> = ({ onCancel, onSubmit, isLoading, submitLabel }) => {
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
				{submitLabel || t(translationsConnector.CORE_TRANSLATIONS.BUTTON_SAVE)}
			</Button>
		</div>
	);
};

export default FormActions;
