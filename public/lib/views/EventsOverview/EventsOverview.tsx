/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import {
	AlertContainer,
	DataLoader,
	LoadingState,
	OrderBy,
	parseObjToOrderBy,
	parseOrderByToObj,
	useAPIQueryParams,
	useNavigate,
	useRoutes,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import rolesRightsConnector from '../../connectors/rolesRights';
import translationsConnector from '../../connectors/translations';
import {
	ALERT_IDS,
	DEFAULT_SEARCH_PARAMS,
	EVENTS_MODULE_PATHS,
	MODULE_TABS,
} from '../../events.const';
import useTabs from '../../hooks/useTabs';
import { TRANSLATIONS } from '../../i18next/translations.const';
import {
	breadcrumbsOptions,
	ExtendedContextHeaderTabLinkProps,
	linkProps,
} from '../utils/navigation.utils';

import deliveriesConfig from './deliveries.overview.config';
import destinationsConfig from './destinations.overview.config';
import './EventsOverview.scss';

const EventsOverview: FC = () => {
	/**
	 * INITIALIZE
	 */
	const routes = useRoutes();
	const { navigate, generatePath } = useNavigate();
	const breadcrumbs = useBreadcrumbs(
		routes as ModuleRouteConfig[],
		breadcrumbsOptions(generatePath)
	);

	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [t] = translationsConnector.useModuleTranslation();
	const [
		mySecurityRightsLoadingState,
		mySecurityRights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForTenant(true);
	const tabs = useTabs(MODULE_TABS, generatePath, t, location.pathname);

	/**
	 * LOAD OVERVIEW CONFIG
	 */
	const isDestinations = location.pathname.includes(EVENTS_MODULE_PATHS.DESTINATIONS.base);
	const config = isDestinations ? destinationsConfig : deliveriesConfig;
	const canCreate = rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityRights, [
		isDestinations
			? rolesRightsConnector.securityRights.destinationCreate
			: rolesRightsConnector.securityRights.deliveryCreate,
	]);

	/**
	 * QUERIES
	 */
	const [items, pagination, isFetching] = config.fetchHook();
	const [query, setQuery] = useAPIQueryParams(DEFAULT_SEARCH_PARAMS);
	const activeSorting = parseObjToOrderBy({
		sort: query.sort ?? '',
		direction: query.direction ?? 1,
	});

	useEffect(() => {
		if (
			isFetching !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading
		) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [isFetching, mySecurityRightsLoadingState]);

	useEffect(() => {
		config.facade.fetchAll(query);
	}, [query]);

	const handlePageChange = (page: number): void => {
		setQuery({ page });
	};

	const handleOrderBy = (orderBy: OrderBy): void => {
		setQuery(parseOrderByToObj(orderBy));
	};

	/**
	 * RENDER TABLE
	 */
	const renderTable = (): ReactElement | null => {
		return (
			<PaginatedTable
				fixed
				className="u-margin-top"
				tableClassName="a-table--fixed--xs"
				columns={config.columnsConfig(t)}
				rows={config.dataToRows(navigate, items)}
				currentPage={query.page}
				itemsPerPage={DEFAULT_SEARCH_PARAMS.pagesize.defaultValue}
				onPageChange={handlePageChange}
				orderBy={handleOrderBy}
				activeSorting={activeSorting}
				totalValues={pagination?.totalElements || 0}
				loading={false}
				loadDataMessage={t(TRANSLATIONS.LOAD_TABLE)}
				noDataMessage={t(TRANSLATIONS.EMPTY_TABLE)}
			/>
		);
	};

	return (
		<>
			<ContextHeader
				title={t(TRANSLATIONS.EVENTS)}
				linkProps={(props: ExtendedContextHeaderTabLinkProps) =>
					linkProps(props, undefined, tabs)
				}
				tabs={tabs}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
				{canCreate && (
					<ContextHeaderActionsSection>
						<Button iconLeft="plus" onClick={() => navigate(config.urls.create)}>
							{t(TRANSLATIONS.NEW_BUTTON)}
						</Button>
					</ContextHeaderActionsSection>
				)}
			</ContextHeader>
			<Container>
				<AlertContainer
					toastClassName="u-margin-bottom"
					containerId={ALERT_IDS.EVENTS_INDEX}
				/>
				<DataLoader loadingState={initialLoading} render={renderTable} />
			</Container>
		</>
	);
};

export default EventsOverview;
