import './lib/api';
import { translations } from './lib/i18next';
import { EventsModuleRouteProps } from './lib/events.types';
import { RenderChildRoutes, TenantContext } from '@redactie/utils';
import React, { FC, useMemo } from 'react';
import Core from '@redactie/redactie-core';
import { MODULE_PATHS } from './lib/events.const';
import { registerEventsModule } from './lib/api';
import EventsOverview from './lib/views/DestinationsOverview/DestinationsOverview';
import DestinationsOverview from './lib/views/DestinationsOverview/DestinationsOverview';

translations.registerTranslations();

const EventsRoot: FC<EventsModuleRouteProps> = ({ route, tenantId }) => {
	const guardsMeta = useMemo(() => ({ tenantId }), [tenantId]);

	return (
		<TenantContext.Provider value={{ tenantId }}>
			<RenderChildRoutes routes={route.routes} guardsMeta={guardsMeta} />
		</TenantContext.Provider>
	);
};

Core.routes.register({
	path: MODULE_PATHS.eventsOverview,
	breadcrumb: false,
	component: EventsRoot,
	redirect: MODULE_PATHS.eventsOverviewDestinations,
	navigation: {
		label: 'Events',
		order: 7,
	},
	routes: [
		{
			path: MODULE_PATHS.eventsOverviewDestinations,
			breadcrumb: false,
			component: DestinationsOverview,
		},
		{
			path: MODULE_PATHS.eventsOverviewEpisodes,
			breadcrumb: false,
			component: DestinationsOverview,
		},
	],
});

registerEventsModule();

export * from './lib/api/api.types';
