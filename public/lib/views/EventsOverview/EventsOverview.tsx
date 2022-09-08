import {
	Container,
	ContextHeader,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import { useRoutes } from '@redactie/utils';
import React, { FC } from 'react';
import { BREADCRUMB_OPTIONS } from '../../events.const';
import useHomeBreadcrumb from '../../hooks/useHomeBreadcrumb/useHomeBreadcrumb';

const EventsOverview: FC = () => {
	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(routes as ModuleRouteConfig[], {
		...BREADCRUMB_OPTIONS,
		extraBreadcrumbs: [useHomeBreadcrumb()],
	});

	return (
		<>
			<ContextHeader title="Events">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<Container>
				<p>TEST</p>
			</Container>
		</>
	);
};

export default EventsOverview;
