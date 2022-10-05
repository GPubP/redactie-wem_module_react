/* eslint-disable import/no-unresolved */
import React, { FC, useMemo, useState } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

import FieldDescription from '../../../components/forms/FieldDescription';
import { EVENT_DELIVERY_TEST_TAB } from '../../../events.const';
import { deliveriesFacade } from '../../../store/deliveries/deliveries.facade';
import { DeliveriesFormProps } from '../DeliveriesCrud.types';

import { JSON_INPUT_COLORS, JSON_INPUT_STYLE, JSON_INPUT_THEME } from './DeliveriesFormTest.const';
import { JSONInputOnChangeValue } from './DeliveriesFormTest.types';

const DeliveriesFormTest: FC<DeliveriesFormProps> = props => {
	const [startedInput, setStartedInput] = useState(false);

	const eventDataExample = useMemo(() => {
		const example =
			props.eventOptions?.find(e => e.uuid === props.data?.eventId)?.data?.dataSchema
				?.definitions?.datadef?.examples?.[0] ?? {};

		if (props.data?.testEvent) {
			try {
				return JSON.parse(props.data.testEvent);
			} catch (error) {
				return example;
			}
		}

		return example;
	}, [props.data?.testEvent, props.data?.eventId, props.eventOptions]);

	if (props.activeTab !== EVENT_DELIVERY_TEST_TAB) {
		if (startedInput) {
			setStartedInput(false);
		}
		return null;
	}

	const handleChange = (value: JSONInputOnChangeValue): void => {
		if (!startedInput) {
			setStartedInput(true);
		}
		if (!value.error) {
			props.onChange(value?.json ?? '', 'testEvent');
			deliveriesFacade.setCanSendTestEvent(true);
		} else {
			deliveriesFacade.setCanSendTestEvent(false);
		}
	};

	return (
		<div>
			<div className="row">
				<div className="col-xs-12">
					<div className="a-input">
						<label className="a-input__label">Event</label>
						<JSONInput
							id="delivery-event-test"
							placeholder={startedInput ? undefined : eventDataExample}
							theme={JSON_INPUT_THEME}
							colors={JSON_INPUT_COLORS}
							style={JSON_INPUT_STYLE}
							locale={locale}
							waitAfterKeyPress={500}
							// TODO: see if we translate to dutch or not
							// locale={JSON_INPUT_THEME_BE_LOCALE}
							height="550px"
							onChange={handleChange}
						/>
					</div>
					<FieldDescription message={'JSON code.'} state="" />
				</div>
			</div>
		</div>
	);
};

export default DeliveriesFormTest;
