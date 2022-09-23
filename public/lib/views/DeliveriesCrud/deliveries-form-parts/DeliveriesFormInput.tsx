/* eslint-disable import/no-unresolved */
import React, { FC } from 'react';

import AdvancedSelect from '../../../components/Fields/AdvancedSelect/AdvancedSelect';
import FieldDescription from '../../../components/forms/FieldDescription';
import translationsConnector from '../../../connectors/translations';
import { EVENT_DELIVERY_INPUT_TAB } from '../../../events.const';
import { TRANSLATIONS } from '../../../i18next/translations.const';
import { errorState, errorText } from '../../utils/form.utils';
import { DeliveriesFormProps } from '../DeliveriesCrud.types';

import DeliveriesFormEventInfo from './DeliveriesFormEventInfo';

import './DeliveriesFormInput.scss';

const DeliveriesFormInput: FC<DeliveriesFormProps> = props => {
	const [t] = translationsConnector.useModuleTranslation();

	if (props.activeTab !== EVENT_DELIVERY_INPUT_TAB) {
		return null;
	}

	return (
		<div className="DeliveriesFormInput">
			<div className="row">
				<div className="col-lg-6 col-xs-12">
					<div className="u-margin-bottom">
						<AdvancedSelect
							disabled={props.isLoading || props.isFetchingEvents}
							onChange={(selected: any) => {
								const event = props.eventOptions?.find(e => e.uuid === selected);
								props.onChange(selected, 'event');
								props.onChange(event?.source, 'eventSource');
								props.onChange(event?.description, 'eventDescription');
								props.onChange(event?.version, 'eventVersion');
							}}
							value={props.data?.event}
							name="event"
							label={t(TRANSLATIONS.EVENT)}
							required={true}
							options={
								props.eventOptions?.map(e => ({
									value: e.uuid,
									label: `${e.event} ver:${e.version}`,
								})) ?? []
							}
							state={errorState(props.validations, 'event')}
						/>
						<FieldDescription
							message={errorText(
								t,
								props.validations,
								'event',
								TRANSLATIONS.DELIVERY_EVENT_HELP
							)}
							state={errorState(props.validations, 'event')}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<DeliveriesFormEventInfo {...props} />
			</div>
			<div className="row">
				<div className="col-lg-6 col-xs-12">
					<div className="u-margin-bottom">
						<AdvancedSelect
							disabled={props.isLoading || props.isFetchingDestinations}
							onChange={(selected: any) => {
								const destination = props.destinationsOptions?.find(
									e => e.id === selected
								);
								props.onChange(selected, 'destinationId');
								props.onChange(destination?.namespace, 'namespace');
							}}
							value={props.data?.destinationId}
							name="destinationId"
							label={t(TRANSLATIONS.DESTINATION)}
							required={true}
							options={props.destinationsOptions.map(e => ({
								value: e.id,
								label: e.name,
							}))}
							state={errorState(props.validations, 'destinationId')}
						/>
						<FieldDescription
							message={errorText(
								t,
								props.validations,
								'destinationId',
								TRANSLATIONS.DELIVERY_DESTINATION_HELP
							)}
							state={errorState(props.validations, 'destinationId')}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-6 col-xs-12">
					<div className="topic-input-group">
						<AdvancedSelect
							disabled={props.isLoading || props.isFetchingTopics}
							onChange={(selected: any) => {
								props.onChange(selected, 'topic');
							}}
							value={props.data?.topic}
							name="topic"
							label={t(TRANSLATIONS.TOPIC)}
							required={true}
							options={props.topicOptions.map(t => ({
								value: t.name,
								label: t.name,
							}))}
							state={errorState(props.validations, 'topic')}
						/>
						<FieldDescription
							message={errorText(
								t,
								props.validations,
								'topic',
								TRANSLATIONS.DELIVERY_TOPIC_HELP
							)}
							state={errorState(props.validations, 'topic')}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeliveriesFormInput;
