import { Validator } from 'jsonschema';
import React, { FC, useEffect, useState } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

import translationsConnector from '../../../connectors/translations';
import { EVENT_DELIVERY_INPUT_TAB } from '../../../events.const';
import { TRANSLATIONS } from '../../../i18next/translations.const';
import {
	DEFAULT_DELIVERY_FILTER,
	DELIVERY_FILTER_SCHEMA,
} from '../../../store/deliveries/deliveries.store';
import { DeliveriesFormProps } from '../DeliveriesCrud.types';

import { JSON_INPUT_COLORS, JSON_INPUT_STYLE, JSON_INPUT_THEME } from './DeliveriesFormTest.const';
import { JSONInputOnChangeValue } from './DeliveriesFormTest.types';

import './DeliveriesFormEventFilter.scss';
// import JSONEditor from '../../../components/Fields/JSONEditor/JSONEditor';

const DeliveriesFormEventFilter: FC<DeliveriesFormProps> = props => {
	const [t] = translationsConnector.useModuleTranslation();
	const [startedInput, setStartedInput] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		// remove line indicator when is not valid with the schema
		// cannot do this with this library's props
		if (error) {
			const errorMessage = document
				.getElementById('delivery-filter-warning-box')
				?.getElementsByTagName('p')?.[0];
			if (errorMessage?.textContent) {
				errorMessage.textContent = errorMessage.textContent.replace('at line 1', '');
			}
		}
	}, [error]);

	if (props.activeTab !== EVENT_DELIVERY_INPUT_TAB) {
		if (startedInput) {
			setStartedInput(false);
		}
		return null;
	}

	const handleChange = (value: JSONInputOnChangeValue): void => {
		if (!startedInput) {
			setStartedInput(true);
		}
		// if (!value.error) {
		let newFilter = {};
		console.log(value);
		debugger;
		try {
			newFilter = JSON.parse(value?.json);
		} catch {
			newFilter = DEFAULT_DELIVERY_FILTER;
		}
		const validated = new Validator().validate(newFilter, DELIVERY_FILTER_SCHEMA);
		props.onChange(newFilter, 'filter');
		if (!validated.valid) {
			setError(t(TRANSLATIONS.DELIVERY_FILTER_SCHEMA_VALIDATION_MESSAGE));
			// setError('');
		}
		// }
	};

	return (
		<>
			<div className="DeliveriesFormEventFilter">
				<div className="a-input">
					<label className="a-input__label">
						{t(TRANSLATIONS.DELIVERY_FILTER_FIELD_LABEL)}
					</label>
					<JSONInput
						id="delivery-filter"
						placeholder={
							startedInput ? undefined : props.data?.filter || DEFAULT_DELIVERY_FILTER
						}
						// onKeyPressUpdate={false}
						theme={JSON_INPUT_THEME}
						colors={JSON_INPUT_COLORS}
						style={JSON_INPUT_STYLE}
						locale={locale}
						error={error ? { reason: error, line: 1 } : undefined}
						height="400px"
						onChange={handleChange}
					/>
					{/* <JSONEditor value={{}} /> */}
				</div>
				<div className="a-input">
					<small>
						{t(TRANSLATIONS.DELIVERY_FILTER_FIELD_DESCRIPTION)}{' '}
						<a href="https://google.com" rel="noreferrer" target="_blank">
							{t(TRANSLATIONS.SCHEMA)}
						</a>
						.
					</small>
				</div>
			</div>
		</>
	);
};

export default DeliveriesFormEventFilter;
