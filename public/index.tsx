import Core from '@redactie/redactie-core';

import { registerEventsModule } from './lib/api';
import { EVENTS_MODULE_PATHS } from './lib/events.const';
import { translations } from './lib/i18next';
import DestinationsCreate from './lib/views/DestinationsCreate/DestinationsCreate';
import EventsOverview from './lib/views/EventsOverview/EventsOverview';
import EventsRoot from './lib/views/EventsRoot/EventsRoot';

Core.routes.register({
	path: EVENTS_MODULE_PATHS.ROOT,
	breadcrumb: false,
	component: EventsRoot,
	redirect: EVENTS_MODULE_PATHS.DESTINATIONS.index,
	navigation: {
		label: 'Events',
		order: 7,
	},
	routes: [
		{
			path: EVENTS_MODULE_PATHS.DESTINATIONS.create,
			breadcrumb: false,
			component: DestinationsCreate,
		},
		{
			path: EVENTS_MODULE_PATHS.DESTINATIONS.index,
			breadcrumb: false,
			component: EventsOverview,
		},
		{
			path: EVENTS_MODULE_PATHS.DELIVERIES.index,
			breadcrumb: false,
			component: EventsOverview,
		},
		{
			path: EVENTS_MODULE_PATHS.DESTINATIONS.create,
			breadcrumb: false,
			component: DestinationsCreate,
		},
	],
});

translations.registerTranslations();
registerEventsModule();
