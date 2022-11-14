/* eslint-disable import/no-unresolved */
import { Button } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import {
	AlertContainer,
	alertService,
	ContextHeaderBadge,
	DataLoader,
	LoadingState,
	TenantContext,
	useNavigate,
	useRoutes,
} from '@redactie/utils';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';

import rolesRightsConnector from '../../connectors/rolesRights';
import translationsConnector from '../../connectors/translations';
import {
	ALERT_IDS,
	EVENT_DELIVERIES_TABS,
	EVENT_DELIVERY_TEST_TAB,
	EVENTS_MODULE_PATHS,
} from '../../events.const';
import useDeliveriesForm from '../../hooks/store/useDeliveriesForm';
import useDestinations from '../../hooks/store/useDestinations';
import useEvents from '../../hooks/store/useEvents';
import useTopics from '../../hooks/store/useTopics';
import useActiveTabs from '../../hooks/useActiveTabs/useActiveTabs';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { DeliverySchema } from '../../services/deliveries/deliveries.service.types';
import { deliveriesFacade } from '../../store/deliveries/deliveries.facade';
import { destinationsFacade } from '../../store/destinations/destinations.facade';
import { eventsFacade } from '../../store/events/events.facade';
import { topicsFacade } from '../../store/topics/topics.facade';
import FormActions from '../Components/FormActions';
import {
	breadcrumbsOptions,
	ExtendedContextHeaderTabLinkProps,
	linkProps,
} from '../utils/navigation.utils';

import { DeliveriesCrudProps } from './DeliveriesCrud.types';
import DeliveriesForm from './DeliveriesForm';

import './DeliveriesCrud.scss';

const DeliveriesCrud: FC<DeliveriesCrudProps> = ({ match }) => {
	/**
	 * INITIALIZE
	 */
	const modelId = match.params.deliveryId;
	const tenantContext = useContext(TenantContext);

	const routes = useRoutes();
	const { navigate, generatePath } = useNavigate();
	const [t] = translationsConnector.useModuleTranslation();

	const [
		formData,
		isCreating,
		formValidation,
		isFetching,
		isSendingTestEvent,
		canSendTestEvent,
	] = useDeliveriesForm();
	const [destinationsOptions, page, isFetchingDestinations] = useDestinations();
	const [eventOptions, isFetchingEvents] = useEvents();
	const [topicOptions, isFetchingTopics, isCreatingTopic] = useTopics();
	const [alertContainerReset, setAlertContainerReset] = useState(false);

	const currentDestination = useMemo(
		() => destinationsOptions.find(d => d.id === formData?.destinationId),
		[formData?.destinationId, destinationsOptions]
	);

	const activeTabs = useActiveTabs(EVENT_DELIVERIES_TABS, location.pathname);
	const activeTab = activeTabs?.find(tab => tab.active)?.target;

	const [
		mySecurityRightsLoadingState,
		mySecurityRights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForTenant(true);
	const canUpdate = rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityRights, [
		rolesRightsConnector.securityRights.deliveryUpdate,
	]);
	const canDelete = rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityRights, [
		rolesRightsConnector.securityRights.deliveryDelete,
	]);

	const breadcrumbs = useBreadcrumbs(
		routes as ModuleRouteConfig[],
		breadcrumbsOptions(generatePath, [
			{
				name: t(TRANSLATIONS.EVENTS),
				target: generatePath(EVENTS_MODULE_PATHS.ROOT),
			},
			{
				name: t(TRANSLATIONS.DELIVERIES),
				target: generatePath(EVENTS_MODULE_PATHS.DELIVERIES.index),
			},
			{
				name: modelId ? `${formData?.name || '...'}` : t(TRANSLATIONS.DELIVERY_NEW),
				target: '',
			},
		])
	);

	const verifyEventExists = (delivery: DeliverySchema | undefined): void => {
		if (!delivery?.eventId) {
			return;
		}

		eventsFacade.checkIfEventExists(delivery.eventId, t);
	};

	/**
	 * STORE
	 */
	useEffect(() => {
		deliveriesFacade.resetForm();
	}, []);
	// for some reason alertService.dismiss() does not work here
	// so as a workaround we force rerender of AlertContainer
	useEffect(() => {
		setAlertContainerReset(true);
	}, [activeTab]);
	useEffect(() => {
		if (alertContainerReset) {
			setAlertContainerReset(false);
		}
	}, [alertContainerReset]);
	useEffect(() => {
		if (modelId) {
			deliveriesFacade.fetchOne(modelId).then(verifyEventExists);
			eventsFacade.fetchAll();
			destinationsFacade.fetchAll({ page: 1, pagesize: 999, sort: 'name', direction: 1 });
		}
		// we do not want to run on verifyEventExists change, it triggers endless rerender loop
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modelId]);
	useEffect(() => {
		if (currentDestination?.id) {
			topicsFacade.fetchAll(currentDestination.id);
		}
	}, [currentDestination?.id]);

	/**
	 * ACTIONS
	 */
	const navigateToDetails = (id: string): void =>
		navigate(`${EVENTS_MODULE_PATHS.DELIVERIES.details.replace(':deliveryId', id)}`);

	const navigateToIndex = (): void => navigate(`${EVENTS_MODULE_PATHS.DELIVERIES.index}`);

	const onFieldChange = (value: string, name: string): void => {
		deliveriesFacade.updateField(value, name);
	};
	const onCancel = (): void => {
		deliveriesFacade.resetForm();
		navigate(EVENTS_MODULE_PATHS.DELIVERIES.index);
	};
	const onSubmit = (): void => {
		deliveriesFacade.submit(formData, t, navigateToDetails, {});
	};
	const onSendTestEvent = (): void => {
		const testEvent = formData?.testEvent
			? JSON.parse(formData?.testEvent ?? '')
			: eventOptions?.find(e => e.uuid === formData?.eventId)?.data?.dataSchema?.definitions
					?.datadef?.examples?.[0] ?? {};

		deliveriesFacade.sendTestEvent(
			{
				eventBody: testEvent,
				ownerKey: formData?.destinationOwnerKey ?? '',
				namespace: formData?.destinationNamespace ?? '',
				topic: formData?.topic ?? '',
				filter: formData?.filter ? JSON.parse(formData?.filter ?? '{}') : {},
				deliveryId: formData?.id ?? '',
			},
			t
		);
	};
	const changeActiveState = (): void => {
		deliveriesFacade.updateField(!formData?.isActive, 'isActive');
		deliveriesFacade.submit(formData, t, navigateToDetails, { isActive: !formData?.isActive });
	};
	const onDelete = (): void => {
		deliveriesFacade.delete(formData?.id, t, navigateToIndex);
	};

	const onTopicSubmit = (
		name: string,
		onSuccess: (topicName: string) => void,
		onError: () => void
	): void => {
		topicsFacade.submit(
			formData?.destinationId ?? '',
			{ name },
			t,
			createdTopic => {
				onFieldChange(createdTopic, 'topic');
				onSuccess(createdTopic);
			},
			onError
		);
	};

	/**
	 * RENDER FORM
	 */
	return (
		<div className="DeliveriesCrud">
			<ContextHeader
				tabs={modelId ? activeTabs : undefined}
				title={
					modelId
						? `'${formData?.name || '...'}' ${t(TRANSLATIONS.TO_EDIT)}`
						: t(TRANSLATIONS.DELIVERY_NEW)
				}
				linkProps={(props: ExtendedContextHeaderTabLinkProps) =>
					linkProps(props, formValidation?.feedback, activeTabs)
				}
				badges={
					[
						{ name: t(TRANSLATIONS.DELIVERY), type: 'primary' },
						{
							name: formData?.isActive
								? t(TRANSLATIONS.ACTIVE)
								: t(TRANSLATIONS.NOT_ACTIVE),
							type: formData?.isActive ? 'success' : 'danger',
						},
					] as ContextHeaderBadge[]
				}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				{!alertContainerReset && (
					<AlertContainer
						toastClassName="u-margin-bottom"
						containerId={ALERT_IDS.DELIVERIES_CRUD}
					/>
				)}
				{mySecurityRightsLoadingState === LoadingState.Loading ||
				isFetching === LoadingState.Loading ? (
					<DataLoader loadingState={isFetching} render={() => null} />
				) : (
					<DeliveriesForm
						canUpdate={canUpdate}
						canDelete={canDelete}
						activeTab={activeTab}
						data={formData}
						onDelete={onDelete}
						changeActiveState={changeActiveState}
						onChange={onFieldChange}
						isLoading={isCreating === LoadingState.Loading}
						validations={formValidation?.feedback}
						eventOptions={eventOptions}
						isFetchingEvents={isFetchingEvents === LoadingState.Loading}
						destinationsOptions={destinationsOptions}
						isFetchingDestinations={isFetchingDestinations === LoadingState.Loading}
						topicOptions={topicOptions}
						isFetchingTopics={isFetchingTopics === LoadingState.Loading}
						fetchingTopicsError={isFetchingTopics === LoadingState.Error}
						onAddTopic={onTopicSubmit}
						isCreatingTopic={isCreatingTopic === LoadingState.Loading}
						tenantId={tenantContext.tenantId}
					/>
				)}
				<ActionBar className="o-action-bar--fixed" isOpen>
					<ActionBarContentSection>
						<FormActions
							isLoading={isCreating === LoadingState.Loading}
							onSubmit={canUpdate ? onSubmit : undefined}
							onCancel={onCancel}
							submitLabel={modelId ? '' : t(TRANSLATIONS.SAVE_AND_CONTINUE)}
							extraActions={
								activeTab === EVENT_DELIVERY_TEST_TAB
									? [
											<Button
												key="delivery-test-action"
												iconLeft={
													isSendingTestEvent
														? 'circle-o-notch fa-spin'
														: null
												}
												outline
												disabled={!canSendTestEvent || isSendingTestEvent}
												className="u-margin-right-xs"
												onClick={onSendTestEvent}
											>
												{t(TRANSLATIONS.DELIVERY_SEND_TEST_EVENT)}
											</Button>,
									  ]
									: []
							}
						/>
					</ActionBarContentSection>
				</ActionBar>
			</Container>
		</div>
	);
};

export default DeliveriesCrud;
