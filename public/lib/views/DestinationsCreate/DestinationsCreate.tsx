/* eslint-disable import/no-unresolved */
import {
	ActionBar,
	ActionBarContentSection,
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import { LoadingState, useNavigate, useRoutes } from '@redactie/utils';
import React, { FC } from 'react';

import translationsConnector from '../../connectors/translations';
import { EVENTS_MODULE_PATHS } from '../../events.const';
import useDestinationsForm from '../../hooks/store/useDestinationsForm';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { destinationsFacade } from '../../store/destinations/destinations.facade';
import { breadcrumbsOptions, linkProps } from '../utils/navigation.utils';

import DestinationsForm from './DestinationsForm';
import DestinationsFormActions from './DestinationsFormActions';

const DestinationsCreate: FC = () => {
	/**
	 * INITIALIZE
	 */
	const routes = useRoutes();
	const { navigate, generatePath } = useNavigate();
	const [t] = translationsConnector.useModuleTranslation();
	const breadcrumbs = useBreadcrumbs(
		routes as ModuleRouteConfig[],
		breadcrumbsOptions(generatePath, [
			{
				name: t(TRANSLATIONS.DESTINATIONS),
				target: generatePath(EVENTS_MODULE_PATHS.DESTINATIONS.index),
			},
			{
				name: t(TRANSLATIONS.DESTINATION_NEW),
				target: '',
			},
		])
	);

	/**
	 * STORE
	 */
	const [formData, loadingState, formValidation] = useDestinationsForm();

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
			<ContextHeader title={t(TRANSLATIONS.DESTINATION_NEW)} linkProps={linkProps}>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<DestinationsForm
					isLoading={loadingState === LoadingState.Loading}
					data={formData}
					onChange={onFieldChange}
					validations={formValidation?.feedback}
				/>
				<ActionBar className="o-action-bar--fixed" isOpen>
					<ActionBarContentSection>
						<DestinationsFormActions
							isLoading={loadingState === LoadingState.Loading}
							onSubmit={onSubmit}
							onCancel={onCancel}
						/>
					</ActionBarContentSection>
				</ActionBar>
			</Container>
		</>
	);
};

export default DestinationsCreate;
