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
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { BREADCRUMB_OPTIONS, EVENTS_ROOT, MODULE_PATHS } from '../../events.const';
import useActiveTabs from '../../hooks/useActiveTabs/useActiveTabs';
import useHomeBreadcrumb from '../../hooks/useHomeBreadcrumb/useHomeBreadcrumb';
import { Link } from 'react-router-dom';
import { EVENT_OVERVIEW_TABS } from './EventsOverview.const';

const EVENT_DESTINATIONS_OVERVIEW_MOCK_DATA = {
	_embedded: [
		{
			id: '023bd97e-24e3-4236-a2c2-45733b386148',
			tenantId: '2bd295d9-48d7-4c2a-9de5-c5539f2d6281',
			name: 'Test Event',
			description: '',
			ownerKey: 'owner1',
			namespace: 'namespace1',
			createdAt: '2022-09-08T06:29:37.503Z',
			updatedAt: '2022-09-08T06:29:37.503Z',
		},
		{
			id: '461e750c-12a4-485d-9c0f-f02051578245',
			tenantId: '2bd295d9-48d7-4c2a-9de5-c5539f2d6281',
			name: 'Test Event 2',
			description: 'This is only a test event with fake ownerkey and namespace',
			ownerKey: 'owner1',
			namespace: 'namespace1',
			createdAt: '2022-09-09T08:35:18.715Z',
			updatedAt: '2022-09-09T08:35:18.715Z',
		},
	],
	_page: {
		pagesize: 20,
		page: 1,
		totalElements: 2,
		totalPages: 1,
	},
};

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

	/**
	 * Render destinations overview
	 */
	const renderOverview = (): ReactElement | null => {
		return isEpisodesView ? (
			// TODO
			<p>TODO EPISODES SCREEN</p>
		) : (
			<PaginatedTable
				fixed
				className="u-margin-top"
				tableClassName="a-table--fixed--xs"
				columns={USERS_OVERVIEW_COLUMNS(t, mySecurityRights)}
				rows={usersRows}
				currentPage={query.page}
				itemsPerPage={DEFAULT_USERS_SEARCH_PARAMS.pagesize}
				onPageChange={handlePageChange}
				orderBy={handleOrderBy}
				activeSorting={activeSorting}
				totalValues={usersMeta?.totalElements || 0}
				loading={loadingState === LoadingState.Loading}
				loadDataMessage="Gebruikers ophalen"
				noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-RESULT'])}
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
