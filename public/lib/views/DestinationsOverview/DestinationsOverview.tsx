import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import { ContextHeaderTabLinkProps, useNavigate, useRoutes } from '@redactie/utils';
import React, { FC, useMemo } from 'react';
import {
	BREADCRUMB_OPTIONS,
	EVENTS_ROOT,
	EVENT_OVERVIEW_TABS,
	MODULE_PATHS,
	OVERVIEW,
} from '../../events.const';
import useActiveTabs from '../../hooks/useActiveTabs/useActiveTabs';
import useHomeBreadcrumb from '../../hooks/useHomeBreadcrumb/useHomeBreadcrumb';
import { Link } from 'react-router-dom';

const DESTINATIONS_OVERVIEW_MOCK_DATA = {
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

const DestinationsOverview: FC = () => {
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
			</ContextHeader>
			<Container>
				<p>TODO BESTEMMINGEN OVERZICHT</p>
			</Container>
		</>
	);
};

export default DestinationsOverview;
