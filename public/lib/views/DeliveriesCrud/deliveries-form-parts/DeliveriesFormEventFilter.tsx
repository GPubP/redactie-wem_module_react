import React, { FC, useState } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

import FieldDescription from '../../../components/forms/FieldDescription';
import { EVENT_DELIVERY_INPUT_TAB } from '../../../events.const';
import { DEFAULT_DELIVERY_FILTER } from '../../../store/deliveries/deliveries.store';
import { DeliveriesFormProps } from '../DeliveriesCrud.types';

import { JSON_INPUT_COLORS, JSON_INPUT_STYLE, JSON_INPUT_THEME } from './DeliveriesFormTest.const';
import { JSONInputOnChangeValue } from './DeliveriesFormTest.types';

const DeliveriesFormEventFilter: FC<DeliveriesFormProps> = props => {
	const [startedInput, setStartedInput] = useState(false);

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
			let newFilter = [];
			try {
				newFilter = JSON.parse(value?.json);
			} catch {
				newFilter = DEFAULT_DELIVERY_FILTER;
			}
			props.onChange(newFilter, 'filter');
		}
	};

	return (
		<div className="DeliveriesFormEventFilter">
			<div className="a-input">
				<label className="a-input__label">Filter</label>
				<JSONInput
					id="delivery-filter"
					placeholder={
						startedInput ? undefined : props.data?.filter || DEFAULT_DELIVERY_FILTER
					}
					theme={JSON_INPUT_THEME}
					colors={JSON_INPUT_COLORS}
					style={JSON_INPUT_STYLE}
					locale={locale}
					// TODO: see if we translate to dutch or not
					// locale={JSON_INPUT_THEME_BE_LOCALE}
					height="400px"
					onChange={handleChange}
				/>
			</div>
			<FieldDescription message={'JSON code.'} state="" />
		</div>
	);
};

export default DeliveriesFormEventFilter;
