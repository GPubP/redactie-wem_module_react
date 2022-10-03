/* eslint-disable import/no-unresolved */
import { TextField } from '@acpaas-ui/react-components';
import React, { ChangeEvent, FC, useState } from 'react';

import AdvancedSelect from '../../../components/Fields/AdvancedSelect/AdvancedSelect';
import Modal from '../../../components/Modals/Modal';
import FieldDescription from '../../../components/forms/FieldDescription';
import translationsConnector from '../../../connectors/translations';
import { EVENT_DELIVERY_INPUT_TAB } from '../../../events.const';
import { TRANSLATIONS } from '../../../i18next/translations.const';
import { TopicValidationSchema } from '../../../services/topics/topics.service.types';
import { validateTopic } from '../../../services/topics/topics.validations';
import { ValidationState } from '../../../services/validation.helpers';
import { errorState, errorText } from '../../utils/form.utils';
import { DeliveriesFormProps } from '../DeliveriesCrud.types';

import DeliveriesFormEventInfo from './DeliveriesFormEventInfo';

import './DeliveriesFormInput.scss';

const DeliveriesFormInput: FC<DeliveriesFormProps> = props => {
	const [t] = translationsConnector.useModuleTranslation();
	const [showCreateTopicModal, setShowCreateTopicModal] = useState(false);
	const [newTopicName, setNewTopicName] = useState('');
	const [topicValidation, setTopicValidation] = useState<TopicValidationSchema>({
		valid: false,
		feedback: { name: ValidationState.Required },
	});

	console.log(topicValidation);

	const onOpenCreateTopicModal = (): void => {
		const prefilledName = `${props.data?.name?.replace(/ /, '-')}.` ?? '';
		setNewTopicName(prefilledName);
		setTopicValidation(validateTopic({ name: prefilledName }));
		setShowCreateTopicModal(true);
	};

	const onCloseCreateTopicModal = (): void => {
		setShowCreateTopicModal(false);
		setNewTopicName('');
	};

	const onCreateTopic = (): void => {
		props.onAddTopic(newTopicName, () => {
			setShowCreateTopicModal(false);
			setNewTopicName('');
		});
	};

	const onInputModal = (value: string): void => {
		setTopicValidation(validateTopic({ name: value }));
		setNewTopicName(value);
	};

	if (props.activeTab !== EVENT_DELIVERY_INPUT_TAB) {
		return null;
	}

	return (
		<>
			<div className="DeliveriesFormInput">
				<div className="row">
					<div className="col-lg-6 col-xs-12">
						<div className="u-margin-bottom">
							<AdvancedSelect
								disabled={
									props.isLoading || props.isFetchingEvents || !props.canUpdate
								}
								onChange={(selected: any) => {
									const event = props.eventOptions?.find(
										e => e.uuid === selected
									);
									props.onChange(event?.data?.event, 'event');
									props.onChange(selected, 'eventId');
									props.onChange(event?.data?.source, 'eventSource');
									props.onChange(event?.data?.description, 'eventDescription');
									props.onChange(event?.data?.version, 'eventVersion');
									props.onChange(
										JSON.stringify(
											props.eventOptions?.find(e => e.uuid === selected)?.data
												?.dataSchema?.definitions?.datadef?.examples?.[0] ??
												{}
										),
										'testEvent'
									);
								}}
								value={props.data?.eventId}
								name="eventId"
								label={t(TRANSLATIONS.EVENT)}
								required={true}
								options={
									props.eventOptions?.map(e => ({
										value: e.uuid,
										label: `${e?.data?.source} - ${e?.data?.event} - ${e?.data?.version}`,
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
								disabled={
									props.isLoading ||
									props.isFetchingDestinations ||
									!props.canUpdate
								}
								onChange={(selected: any) => {
									const destination = props.destinationsOptions?.find(
										e => e.id === selected
									);
									props.onChange(selected, 'destinationId');
									props.onChange(destination?.namespace, 'destinationNamespace');
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
								disabled={
									props.isLoading || props.isFetchingTopics || !props.canUpdate
								}
								onChange={(selected: any) => {
									props.onChange(selected, 'topic');
								}}
								topContent={
									props?.data?.destinationNamespace ? (
										<span
											className={`m-selectable-list__item wem-m-flyout-menu__select-item`}
											onClick={onOpenCreateTopicModal}
										>
											{t(TRANSLATIONS.DELIVERY_TOPIC_CREATE)}
										</span>
									) : null
								}
								value={props.data?.topic}
								name="topic"
								label={t(TRANSLATIONS.TOPIC)}
								required={true}
								options={[
									...props.topicOptions.map(t => ({
										value: t.name,
										label: t.name,
									})),
								]}
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
			<Modal
				show={showCreateTopicModal}
				onClose={onCloseCreateTopicModal}
				size="large"
				title={t(TRANSLATIONS.CREATE_TOPIC_MODAL_TITLE)}
				body={
					<>
						<div className="">
							<p>
								{t(TRANSLATIONS.CREATE_TOPIC_MODAL_BODY)}
								<b>{props?.data?.destinationNamespace}</b>
							</p>
						</div>
						<div className="u-margin-top">
							<TextField
								label={t(TRANSLATIONS.NAME)}
								name={'name'}
								required={true}
								value={newTopicName}
								onChange={(e: ChangeEvent<HTMLInputElement>): void =>
									onInputModal(e?.target?.value)
								}
								loading={props.isCreatingTopic}
								disabled={props.isCreatingTopic}
								state={errorState(topicValidation.feedback, 'name')}
							/>
							<FieldDescription
								message={errorText(
									t,
									topicValidation.feedback,
									'name',
									TRANSLATIONS.DELIVERY_TOPIC_CREATE_ERROR_MESSAGE
								)}
								state={errorState(topicValidation.feedback, 'name')}
							/>
						</div>
					</>
				}
				actions={[
					{
						title: t(TRANSLATIONS.CANCEL),
						onClick: onCloseCreateTopicModal,
						negative: true,
					},
					{
						title: t(TRANSLATIONS.CREATE),
						disabled: props.isCreatingTopic || !topicValidation.valid,
						onClick: onCreateTopic,
					},
				]}
			/>
		</>
	);
};

export default DeliveriesFormInput;
