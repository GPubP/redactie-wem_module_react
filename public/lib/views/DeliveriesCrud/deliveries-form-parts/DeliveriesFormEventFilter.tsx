import { Validator } from 'jsonschema';
import React, { FC, useEffect, useState } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

import Modal from '../../../components/Modals/Modal';
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

const DeliveriesFormEventFilter: FC<DeliveriesFormProps> = props => {
	const [t] = translationsConnector.useModuleTranslation();
	const [startedInput, setStartedInput] = useState(false);
	const [error, setError] = useState('');
	const [showSchemaModal, setShowSchemaModal] = useState(false);

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
		if (!value.error) {
			let newFilter = {};
			try {
				newFilter = JSON.parse(value?.json);
			} catch {
				newFilter = DEFAULT_DELIVERY_FILTER;
			}
			const validated = new Validator().validate(newFilter, DELIVERY_FILTER_SCHEMA);
			if (validated.valid) {
				setError('');
				props.onChange(newFilter, 'filter');
			} else {
				setError(t(TRANSLATIONS.DELIVERY_FILTER_SCHEMA_VALIDATION_MESSAGE));
			}
		}
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
						theme={JSON_INPUT_THEME}
						colors={JSON_INPUT_COLORS}
						style={JSON_INPUT_STYLE}
						locale={locale}
						error={error ? { reason: error, line: 1 } : undefined}
						// TODO: see if we translate to dutch or not
						// locale={JSON_INPUT_THEME_BE_LOCALE}
						height="400px"
						onChange={handleChange}
					/>
				</div>
				<div className="a-input">
					<small>
						{t(TRANSLATIONS.DELIVERY_FILTER_FIELD_DESCRIPTION)}{' '}
						<a role="button" onClick={() => setShowSchemaModal(true)}>
							{t(TRANSLATIONS.SCHEMA)}
						</a>
						.
					</small>
				</div>
			</div>
			<Modal
				show={showSchemaModal}
				onClose={() => setShowSchemaModal(false)}
				size="large"
				title={t(TRANSLATIONS.DELIVERY_SCHEMA_MODAL_TITLE)}
				body={
					<JSONInput
						id="delivery-schema"
						placeholder={DELIVERY_FILTER_SCHEMA}
						theme={JSON_INPUT_THEME}
						colors={JSON_INPUT_COLORS}
						style={JSON_INPUT_STYLE}
						locale={locale}
						viewOnly
						height="700px"
					/>
				}
				actions={[
					{
						title: t(TRANSLATIONS.CANCEL),
						onClick: () => setShowSchemaModal(false),
						negative: true,
					},
				]}
			/>
		</>
	);
};

export default DeliveriesFormEventFilter;
