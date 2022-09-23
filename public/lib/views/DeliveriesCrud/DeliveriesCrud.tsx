/* eslint-disable import/no-unresolved */
import {
	ActionBar,
	ActionBarContentSection,
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import { AlertContainer, DataLoader, LoadingState, useNavigate, useRoutes } from '@redactie/utils';
import React, { FC, useEffect, useMemo } from 'react';

import translationsConnector from '../../connectors/translations';
import { ALERT_IDS, EVENT_DELIVERIES_TABS, EVENTS_MODULE_PATHS } from '../../events.const';
import useDeliveriesForm from '../../hooks/store/useDeliveriesForm';
import useDestinations from '../../hooks/store/useDestinations';
import useEvents from '../../hooks/store/useEvents';
import useTopics from '../../hooks/store/useTopics';
import useActiveTabs from '../../hooks/useActiveTabs/useActiveTabs';
import { TRANSLATIONS } from '../../i18next/translations.const';
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

	const routes = useRoutes();
	const { navigate, generatePath } = useNavigate();
	const [t] = translationsConnector.useModuleTranslation();

	const [formData, isCreating, formValidation, isFetching] = useDeliveriesForm();
	const [destinationsOptions, page, isFetchingDestinations] = useDestinations();
	const [eventOptions, isFetchingEvents] = useEvents();
	const [topicOptions, isFetchingTopics] = useTopics();

	const currentDestination = useMemo(
		() => destinationsOptions.find(d => d.id === formData?.destinationId),
		[formData?.destinationId, destinationsOptions]
	);

	const activeTabs = useActiveTabs(EVENT_DELIVERIES_TABS, location.pathname);

	const breadcrumbs = useBreadcrumbs(
		routes as ModuleRouteConfig[],
		breadcrumbsOptions(generatePath, [
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

	/**
	 * STORE
	 */
	useEffect(() => {
		deliveriesFacade.resetForm();
	}, []);
	useEffect(() => {
		if (modelId) {
			deliveriesFacade.fetchOne(modelId);
			eventsFacade.fetchAll();
			destinationsFacade.fetchAll({ page: 1, pagesize: 999, sort: 'name', direction: 1 });
		}
	}, [modelId]);
	useEffect(() => {
		if (currentDestination?.namespace && currentDestination?.ownerKey) {
			topicsFacade.fetchAll(currentDestination?.ownerKey, currentDestination?.namespace);
		}
	}, [currentDestination?.namespace, currentDestination?.ownerKey]);

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
	const changeActiveState = (): void => {
		deliveriesFacade.updateField(!formData?.isActive, 'isActive');
		deliveriesFacade.submit(formData, t, navigateToDetails, { isActive: !formData?.isActive });
	};
	const onDelete = (): void => {
		deliveriesFacade.delete(formData?.id, t, navigateToIndex);
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
						? `"${formData?.name || '...'}" ${t(TRANSLATIONS.TO_EDIT)}`
						: t(TRANSLATIONS.DELIVERY_NEW)
				}
				linkProps={(props: ExtendedContextHeaderTabLinkProps) =>
					linkProps(props, formValidation?.feedback, activeTabs)
				}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={ALERT_IDS.DELIVERIES_CRUD}
				/>
				{isFetching === LoadingState.Loading ? (
					<DataLoader loadingState={isFetching} render={() => null} />
				) : (
					<DeliveriesForm
						activeTab={activeTabs?.find(tab => tab.active)?.target}
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
					/>
				)}
				<ActionBar className="o-action-bar--fixed" isOpen>
					<ActionBarContentSection>
						<FormActions
							isLoading={isCreating === LoadingState.Loading}
							onSubmit={onSubmit}
							onCancel={onCancel}
							submitLabel={modelId ? '' : t(TRANSLATIONS.SAVE_AND_CONTINUE)}
						/>
					</ActionBarContentSection>
				</ActionBar>
			</Container>
		</div>
	);
};

export default DeliveriesCrud;
