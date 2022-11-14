/* eslint-disable import/no-unresolved */
import { Textarea } from '@acpaas-ui/react-components';
import React, { FC, FormEvent, useEffect, useMemo, useState } from 'react';

import FieldDescription from '../../../components/forms/FieldDescription';
import translationsConnector from '../../../connectors/translations';
import { ERROR_STATE, EVENT_DELIVERY_TEST_TAB } from '../../../events.const';
import { TRANSLATIONS } from '../../../i18next/translations.const';
import { deliveriesFacade } from '../../../store/deliveries/deliveries.facade';
import { getTestEventFromEventData } from '../../utils/deliveries.utils';
import { DeliveriesFormProps } from '../DeliveriesCrud.types';

import './DeliveriesFormTest.scss';

const DeliveriesFormTest: FC<DeliveriesFormProps> = props => {
	const [t] = translationsConnector.useModuleTranslation();
	const [error, setError] = useState('');

	const eventDataExample = useMemo(() => {
		const eventData = props.eventOptions?.find(e => e.uuid === props.data?.eventId);
		const example = getTestEventFromEventData(eventData, props.tenantId);

		if (props.data?.testEvent) {
			return props.data?.testEvent;
		}

		return JSON.stringify(example, null, 4);
	}, [props.data?.testEvent, props.data?.eventId, props.tenantId, props.eventOptions]);

	const handleChange = (e: FormEvent<HTMLInputElement>): void => {
		props.onChange(e.currentTarget.value, 'testEvent');
	};

	useEffect(() => {
		try {
			JSON.parse(eventDataExample);
			deliveriesFacade.setCanSendTestEvent(true);
			setError('');
		} catch (error) {
			setError((error as any).message);
			deliveriesFacade.setCanSendTestEvent(false);
		}
	}, [eventDataExample]);

	if (props.activeTab !== EVENT_DELIVERY_TEST_TAB) {
		return null;
	}

	return (
		<div className="DeliveriesFormTest">
			<div className="row">
				<div className="col-xs-12">
					<Textarea
						label={t(TRANSLATIONS.EVENT)}
						value={eventDataExample}
						name="testEvent"
						onChange={handleChange}
						spellcheck={false}
						state={error ? ERROR_STATE : ''}
					/>
					<FieldDescription
						message={error || 'JSON code.'}
						state={error ? ERROR_STATE : ''}
					/>
				</div>
			</div>
		</div>
	);
};

export default DeliveriesFormTest;
