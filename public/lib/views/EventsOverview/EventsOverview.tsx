import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
	ContextHeaderActionsSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import { Button } from '@acpaas-ui/react-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import {
	ContextHeaderTabLinkProps,
	DataLoader,
	useNavigate,
	useRoutes,
	LoadingState,
	useAPIQueryParams,
	parseOrderByToObj,
	OrderBy,
	parseObjToOrderBy,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { BREADCRUMB_OPTIONS, EVENTS_ROOT, MODULE_PATHS } from '../../events.const';
import useActiveTabs from '../../hooks/useActiveTabs/useActiveTabs';
import useHomeBreadcrumb from '../../hooks/useHomeBreadcrumb/useHomeBreadcrumb';
import { Link } from 'react-router-dom';
import {
	DEFAULT_DESTINATIONS_SEARCH_PARAMS,
	DESTINATIONS_OVERVIEW_COLUMNS,
	DESTINATIONS_QUERY_PARAMS_CONFIG,
	EVENT_OVERVIEW_TABS,
} from './EventsOverview.const';
import { DestinationsOverviewTableRow } from './EventsOverview.types';
import { EVENT_DESTINATIONS_OVERVIEW_MOCK_DATA } from './EventsOverview.mock.data';

const EventsOverview: FC = () => {
	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(routes as ModuleRouteConfig[], {
		...BREADCRUMB_OPTIONS,
		extraBreadcrumbs: [useHomeBreadcrumb()],
	});
	const activeTabs = useActiveTabs(EVENT_OVERVIEW_TABS, location.pathname);
	const { navigate, generatePath } = useNavigate(EVENTS_ROOT);
	const isEpisodesView = useMemo(
		() => activeTabs.find(tab => tab.active)?.target === 'afleveringen',
		[activeTabs]
	);
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [query, setQuery] = useAPIQueryParams(DESTINATIONS_QUERY_PARAMS_CONFIG);
	const activeSorting = parseObjToOrderBy({
		sort: query.sort ?? '',
		direction: query.direction ?? 1,
	});

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
	 * Render destinations overview
	 */
	const renderOverview = (): ReactElement | null => {
		const destinationRows: DestinationsOverviewTableRow[] = EVENT_DESTINATIONS_OVERVIEW_MOCK_DATA._embedded.map(
			destination => ({
				uuid: destination.id,
				name: destination.name,
				description: destination.description,
				namespace: destination.namespace,
				ownerKey: destination.ownerKey,
				navigate: () =>
					navigate(MODULE_PATHS.eventsCreateDestinationEdit, {
						destinationUuid: destination.id,
					}),
			})
		);

		return isEpisodesView ? (
			// TODO
			<p>TODO EPISODES SCREEN</p>
		) : (
			<PaginatedTable
				fixed
				className="u-margin-top"
				tableClassName="a-table--fixed--xs"
				columns={DESTINATIONS_OVERVIEW_COLUMNS()}
				rows={destinationRows}
				currentPage={query.page}
				itemsPerPage={DEFAULT_DESTINATIONS_SEARCH_PARAMS.pagesize}
				onPageChange={handlePageChange}
				orderBy={handleOrderBy}
				activeSorting={activeSorting}
				totalValues={EVENT_DESTINATIONS_OVERVIEW_MOCK_DATA._embedded.length || 0}
				loading={false}
				loadDataMessage="Gebruikers ophalen"
				noDataMessage={'Geen bestemmingen'}
			/>
		);
	};

	useEffect(() => {
		// TODO REMOVE TIMOUT
		// ONLY FOR LOADING DEMO PURPOSE
		setTimeout(() => setInitialLoading(LoadingState.Loaded), 2000);
	}, []);

	return (
		<>
			<ContextHeader
				title="Events"
				linkProps={(props: ContextHeaderTabLinkProps) => {
					return {
						...props,
						to: generatePath(`/overzicht/${props.href}`),
						component: Link,
					};
				}}
				tabs={activeTabs}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
				<ContextHeaderActionsSection>
					<Button
						iconLeft="plus"
						onClick={() => navigate(`${MODULE_PATHS.eventsCreateDestination}`)}
					>
						Nieuw aanmaken
					</Button>
				</ContextHeaderActionsSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default EventsOverview;
