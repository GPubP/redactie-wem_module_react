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

import translationsConnector from '../../connectors/translations';
import { ALERT_IDS, EVENTS_MODULE_PATHS } from '../../events.const';
import useDeliveriesForm from '../../hooks/store/useDeliveriesForm';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { deliveriesFacade } from '../../store/deliveries/deliveries.facade';
import FormActions from '../Components/FormActions';
import { breadcrumbsOptions, linkProps } from '../utils/navigation.utils';

import { DeliveriesCrudProps } from './DeliveriesCrud.types';
import DeliveriesForm from './DeliveriesForm';

const DeliveriesCrud: FC<DeliveriesCrudProps> = ({ match }) => {
	/**
	 * INITIALIZE
	 */
	const modelId = match.params.deliveryId;

	const routes = useRoutes();
	const { navigate, generatePath } = useNavigate();
	const [t] = translationsConnector.useModuleTranslation();

	const [formData, isCreating, formValidation, isFetching] = useDeliveriesForm();

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
		}
	}, [modelId]);

	/**
	 * ACTIONS
	 */
	const navigateToDetails = (id: string): void =>
		navigate(`${EVENTS_MODULE_PATHS.DELIVERIES.details.replace(':deliveryId', id)}`);

	const onFieldChange = (value: string, name: string): void => {
		deliveriesFacade.updateField(value, name);
	};
	const onCancel = (): void => {
		deliveriesFacade.resetForm();
		navigate(EVENTS_MODULE_PATHS.DELIVERIES.index);
	};
	const onSubmit = (): void => {
		deliveriesFacade.submit(formData, t, navigateToDetails);
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
						: t(TRANSLATIONS.DELIVERY_NEW)
				}
				linkProps={linkProps}
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
						data={formData}
						onChange={onFieldChange}
						isLoading={isCreating === LoadingState.Loading}
						validations={formValidation?.feedback}
					/>
				)}
				<ActionBar className="o-action-bar--fixed" isOpen>
					<ActionBarContentSection>
						<FormActions
							isLoading={isCreating === LoadingState.Loading}
							onSubmit={onSubmit}
							onCancel={onCancel}
							submitLabel={t(TRANSLATIONS.SAVE_AND_CONTINUE)}
						/>
					</ActionBarContentSection>
				</ActionBar>
			</Container>
		</>
	);
};

export default DeliveriesCrud;
