import { Textarea } from '@acpaas-ui/react-components';
import React, { FC, FormEvent, useMemo } from 'react';

import FieldDescription from '../../../components/forms/FieldDescription';
import translationsConnector from '../../../connectors/translations';
import { ERROR_STATE, EVENTS_FILTER_DOCUMENTATION_URL } from '../../../events.const';
import { TRANSLATIONS } from '../../../i18next/translations.const';
import { DeliveriesFormProps } from '../DeliveriesCrud.types';

import './DeliveriesFormEventFilter.scss';

const DeliveriesFormEventFilter: FC<DeliveriesFormProps> = props => {
	const [t] = translationsConnector.useModuleTranslation();
	const hasError = useMemo(() => props.validations?.filter.valid === false, [
		props.validations?.filter.valid,
	]);

	return (
		<>
			<div className="DeliveriesFormEventFilter">
				<Textarea
					label={t(TRANSLATIONS.DELIVERY_FILTER_FIELD_LABEL)}
					value={props.data?.filter}
					name="filter"
					onChange={(e: FormEvent<HTMLInputElement>) => {
						props.onChange(e.currentTarget.value, 'filter');
					}}
					state={hasError ? ERROR_STATE : ''}
					spellcheck={false}
				/>
				<div className="a-input">
					<small>
						<a href={EVENTS_FILTER_DOCUMENTATION_URL} target="_blank" rel="noreferrer">
							{t(TRANSLATIONS.DELIVERY_FILTER_FIELD_DESCRIPTION)}
						</a>
					</small>
				</div>
				{hasError && (
					<FieldDescription
						message={props.validations?.filter.error ?? ''}
						state={ERROR_STATE}
					/>
				)}
			</div>
		</>
	);
};

export default DeliveriesFormEventFilter;
