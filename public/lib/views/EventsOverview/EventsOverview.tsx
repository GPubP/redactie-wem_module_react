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
	DataLoader,
	LoadingState,
	OrderBy,
	parseObjToOrderBy,
	parseOrderByToObj,
	useAPIQueryParams,
	useNavigate,
	useRoutes,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect } from 'react';

import translationsConnector from '../../connectors/translations';
import { DEFAULT_SEARCH_PARAMS, EVENTS_MODULE_PATHS, MODULE_TABS } from '../../events.const';
import useDestinations from '../../hooks/store/useDestinations';
import useTabs from '../../hooks/useTabs';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { destinationsFacade } from '../../store/destinations/destinations.facade';
import { breadcrumbsOptions, linkProps } from '../utils/navigation.utils';

import { destinationDataToRows, destinationsColumns } from './EventsOverview.resources';

const DestinationsOverview: FC = () => {
	/**
	 * INITIALIZE
	 */
	const routes = useRoutes();
	const { navigate, generatePath } = useNavigate();
	const breadcrumbs = useBreadcrumbs(
		routes as ModuleRouteConfig[],
		breadcrumbsOptions(generatePath)
	);

	const [t] = translationsConnector.useModuleTranslation();
	const tabs = useTabs(MODULE_TABS, generatePath, t, location.pathname);

	/**
	 * QUERIES
	 */
	const [destinations, pagination, isFetching] = useDestinations();
	const [query, setQuery] = useAPIQueryParams(DEFAULT_SEARCH_PARAMS);
	const activeSorting = parseObjToOrderBy({
		sort: query.sort ?? '',
		direction: query.direction ?? 1,
	});

	useEffect(() => {
		destinationsFacade.fetchAllDestinations(query);
	}, [query]);

	const handlePageChange = (page: number): void => {
		setQuery({ page });
	};

	const handleOrderBy = (orderBy: OrderBy): void => {
		setQuery(
			parseOrderByToObj({
				...orderBy,
				key: `meta.${orderBy.key}`,
			})
		);
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
				columns={destinationsColumns(t)}
				rows={destinationDataToRows(navigate, destinations)}
				currentPage={query.page}
				itemsPerPage={DEFAULT_SEARCH_PARAMS.pagesize.defaultValue}
				onPageChange={handlePageChange}
				orderBy={handleOrderBy}
				activeSorting={activeSorting}
				totalValues={pagination?.totalElements || 0}
				loading={false}
				loadDataMessage={t(TRANSLATIONS.LOAD_DESTINATIONS)}
				noDataMessage={t(TRANSLATIONS.NO_DESTINATIONS)}
			/>
		);
	};

	return (
		<>
			<ContextHeader title={t(TRANSLATIONS.EVENTS)} linkProps={linkProps} tabs={tabs}>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
				<ContextHeaderActionsSection>
					<Button
						iconLeft="plus"
						onClick={() => navigate(`${EVENTS_MODULE_PATHS.DESTINATIONS.create}`)}
					>
						{t(TRANSLATIONS.NEW_BUTTON)}
					</Button>
				</ContextHeaderActionsSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={isFetching} render={renderTable} />
			</Container>
		</>
	);
};

export default DestinationsOverview;
