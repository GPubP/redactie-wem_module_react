import { Textarea, TextField } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import translationsConnector from '../../../connectors/translations';
import { TRANSLATIONS } from '../../../i18next/translations.const';
import { DeliveriesFormProps } from '../DeliveriesCrud.types';

const DeliveriesFormEventInfo: FC<DeliveriesFormProps> = props => {
	const [t] = translationsConnector.useModuleTranslation();

	if (!props.data?.event) {
		return null;
	}

	return (
		<>
			<div className="col-lg-6 col-xs-12">
				<TextField
					required
					label={t(TRANSLATIONS.SOURCE)}
					name={'eventSource'}
					readOnly
					value={props?.data?.eventSource ?? ''}
					disabled
				/>
			</div>
			<div className="col-lg-6 col-xs-12">
				<TextField
					label={t(TRANSLATIONS.VERSION)}
					name={'eventVersion'}
					readOnly
					value={props?.data?.eventVersion ?? ''}
					disabled
				/>
			</div>
			<div className="col-xs-12 u-margin-top u-margin-bottom">
				<Textarea
					label={t(TRANSLATIONS.DESCRIPTION)}
					name={'eventDescription'}
					readOnly
					value={props?.data?.eventDescription ?? ''}
					disabled
				/>
			</div>
		</>
	);
};

export default DeliveriesFormEventInfo;
