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
import React, { FC, useEffect } from 'react';

import rolesRightsConnector from '../../connectors/rolesRights';
import translationsConnector from '../../connectors/translations';
import { ALERT_IDS, EVENTS_MODULE_PATHS } from '../../events.const';
import useDestinationsForm from '../../hooks/store/useDestinationsForm';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { destinationsFacade } from '../../store/destinations/destinations.facade';
import FormActions from '../Components/FormActions';
import { breadcrumbsOptions, linkProps } from '../utils/navigation.utils';

import { DestinationsCrudProps } from './DestinationsCrud.types';
import DestinationsForm from './DestinationsForm';

const DestinationsCrud: FC<DestinationsCrudProps> = ({ match }) => {
	/**
	 * INITIALIZE
	 */
	const modelId = match.params.destinationId;

	const routes = useRoutes();
	const { navigate, generatePath } = useNavigate();
	const [t] = translationsConnector.useModuleTranslation();
	const [formData, isCreating, formValidation, isFetching] = useDestinationsForm();

	const [
		mySecurityRightsLoadingState,
		mySecurityRights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForTenant(true);
	const canUpdate = rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityRights, [
		rolesRightsConnector.securityRights.destinationUpdate,
	]);
	const canDelete = rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityRights, [
		rolesRightsConnector.securityRights.destinationDelete,
	]);

	const breadcrumbs = useBreadcrumbs(
		routes as ModuleRouteConfig[],
		breadcrumbsOptions(generatePath, [
			{
				name: t(TRANSLATIONS.EVENTS),
				target: generatePath(EVENTS_MODULE_PATHS.ROOT),
			},
			{
				name: t(TRANSLATIONS.DESTINATIONS),
				target: generatePath(EVENTS_MODULE_PATHS.DESTINATIONS.index),
			},
			{
				name: modelId ? `${formData?.name || '...'}` : t(TRANSLATIONS.DESTINATION_NEW),
				target: '',
			},
		])
	);

	/**
	 * STORE
	 */
	useEffect(() => {
		destinationsFacade.resetForm();
	}, []);
	useEffect(() => {
		if (modelId) {
			destinationsFacade.fetchOne(modelId);
		}
	}, [modelId]);

	/**
	 * ACTIONS
	 */
	const navigateToIndex = (): void => navigate(EVENTS_MODULE_PATHS.DESTINATIONS.index);

	const onFieldChange = (value: string, name: string): void => {
		destinationsFacade.updateField(value, name);
	};
	const onCancel = (): void => {
		destinationsFacade.resetForm();
		navigate(EVENTS_MODULE_PATHS.DESTINATIONS.index);
	};
	const onSubmit = (): void => {
		destinationsFacade.submit(formData, t, navigateToIndex);
	};

	const onDelete = (): void => {
		destinationsFacade.delete(formData?.id, t, navigateToIndex);
	};

	/**
	 * RENDER FORM
	 */
	return (
		<>
			<ContextHeader
				title={
					modelId
						? `'${formData?.name || '...'}' ${t(TRANSLATIONS.TO_EDIT)}`
						: t(TRANSLATIONS.DESTINATION_NEW)
				}
				linkProps={linkProps}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={ALERT_IDS.DESTINATIONS_CRUD}
				/>
				{mySecurityRightsLoadingState === LoadingState.Loading ||
				isFetching === LoadingState.Loading ? (
					<DataLoader loadingState={isFetching} render={() => null} />
				) : (
					<DestinationsForm
						canDelete={canDelete}
						canUpdate={canUpdate}
						isLoading={isCreating === LoadingState.Loading}
						data={formData}
						onChange={onFieldChange}
						validations={formValidation?.feedback}
						onDelete={onDelete}
					/>
				)}
				<ActionBar className="o-action-bar--fixed" isOpen>
					<ActionBarContentSection>
						<FormActions
							isLoading={isCreating === LoadingState.Loading}
							onSubmit={canUpdate ? onSubmit : undefined}
							onCancel={onCancel}
						/>
					</ActionBarContentSection>
				</ActionBar>
			</Container>
		</>
	);
};

export default DestinationsCrud;
