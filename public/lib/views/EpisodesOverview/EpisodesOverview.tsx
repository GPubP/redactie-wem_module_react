import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import { ContextHeaderTabLinkProps, useNavigate, useRoutes } from '@redactie/utils';
import React, { FC } from 'react';
import {
	BREADCRUMB_OPTIONS,
	EVENTS_ROOT,
	EVENT_OVERVIEW_TABS,
	MODULE_PATHS,
} from '../../events.const';
import useActiveTabs from '../../hooks/useActiveTabs/useActiveTabs';
import useHomeBreadcrumb from '../../hooks/useHomeBreadcrumb/useHomeBreadcrumb';
import { Link } from 'react-router-dom';

const EpisodesOverview: FC = () => {
	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(routes as ModuleRouteConfig[], {
		...BREADCRUMB_OPTIONS,
		extraBreadcrumbs: [useHomeBreadcrumb()],
	});
	const activeTabs = useActiveTabs(EVENT_OVERVIEW_TABS, location.pathname);
	const { navigate, generatePath } = useNavigate(EVENTS_ROOT);

	return (
		<>
			<ContextHeader
				title="Events"
				linkProps={(props: ContextHeaderTabLinkProps) => ({
					...props,
					to: generatePath(`${MODULE_PATHS.eventsOverview}/${props.href}`),
					component: Link,
				})}
				tabs={activeTabs}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<p>TODO AFLEVERINGEN OVERZICHT</p>
			</Container>
		</>
	);
};

export default EpisodesOverview;
