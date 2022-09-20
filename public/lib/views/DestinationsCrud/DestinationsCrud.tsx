/* eslint-disable import/no-unresolved */
import {
	ActionBar,
	ActionBarContentSection,
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import { DataLoader, LoadingState, useNavigate, useRoutes } from '@redactie/utils';
import React, { FC, useEffect } from 'react';

import translationsConnector from '../../connectors/translations';
import { EVENTS_MODULE_PATHS } from '../../events.const';
import useDestinationsForm from '../../hooks/store/useDestinationsForm';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { destinationsFacade } from '../../store/destinations/destinations.facade';
import { breadcrumbsOptions, linkProps } from '../utils/navigation.utils';

import { DestinationsCrudProps } from './DestinationsCrud.types';
import DestinationsForm from './DestinationsForm';
import DestinationsFormActions from './DestinationsFormActions';

const DestinationsCrud: FC<DestinationsCrudProps> = ({ match }) => {
	/**
	 * INITIALIZE
	 */
	const modelId = match.params.destinationId;
	console.log(modelId);

	const routes = useRoutes();
	const { navigate, generatePath } = useNavigate();
	const [t] = translationsConnector.useModuleTranslation();
	const [formData, isCreating, formValidation, isFetching] = useDestinationsForm();

	const breadcrumbs = useBreadcrumbs(
		routes as ModuleRouteConfig[],
		breadcrumbsOptions(generatePath, [
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
	const navigateToDetails = (id: string): void =>
		navigate(`${EVENTS_MODULE_PATHS.DESTINATIONS.details.replace(':destinationId', id)}`);

	const onFieldChange = (value: string, name: string): void => {
		destinationsFacade.updateField(value, name);
	};
	const onCancel = (): void => {
		destinationsFacade.resetForm();
		navigate(EVENTS_MODULE_PATHS.DESTINATIONS.index);
	};
	const onSubmit = (): void => {
		destinationsFacade.submit(formData, navigateToDetails);
	};

	/**
	 * RENDER FORM
	 */
	return (
		<>
			<ContextHeader
				title={
					modelId
						? `"${formData?.name || '...'}" ${t(TRANSLATIONS.TO_EDIT)}`
						: t(TRANSLATIONS.DESTINATION_NEW)
				}
				linkProps={linkProps}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				{isFetching === LoadingState.Loading ? (
					<DataLoader loadingState={isFetching} render={() => null} />
				) : (
					<DestinationsForm
						isLoading={isCreating === LoadingState.Loading}
						data={formData}
						onChange={onFieldChange}
						validations={formValidation?.feedback}
					/>
				)}
				<ActionBar className="o-action-bar--fixed" isOpen>
					<ActionBarContentSection>
						<DestinationsFormActions
							isLoading={isCreating === LoadingState.Loading}
							onSubmit={onSubmit}
							onCancel={onCancel}
						/>
					</ActionBarContentSection>
				</ActionBar>
			</Container>
		</>
	);
};

export default DestinationsCrud;
