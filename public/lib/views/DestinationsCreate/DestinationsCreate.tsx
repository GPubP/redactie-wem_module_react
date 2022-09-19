/* eslint-disable import/no-unresolved */
import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import { useNavigate, useRoutes } from '@redactie/utils';
import React, { FC } from 'react';

import translationsConnector from '../../connectors/translations';
import { EVENTS_MODULE_PATHS } from '../../events.const';
import useDestinationsForm from '../../hooks/store/useDestinationsForm';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { breadcrumbsOptions, linkProps } from '../utils/navigation.utils';

import DestinationsForm from './DestinationsForm';

// import DestinationsForm from './DestinationsForm';

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
	const [formData] = useDestinationsForm();

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
					data={formData}
					onChange={() => {
						console.log('changes'); // TODO-NT
					}}
				/>
			</Container>
		</>
	);
};

export default DestinationsCreate;
