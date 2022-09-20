import Core from '@redactie/redactie-core';

import { registerEventsModule } from './lib/api';
import { EVENTS_MODULE_PATHS } from './lib/events.const';
import { translations } from './lib/i18next';
import DeliveriesCrud from './lib/views/DeliveriesCrud/DeliveriesCrud';
import DestinationsCrud from './lib/views/DestinationsCrud/DestinationsCrud';
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
			component: DestinationsCrud,
		},
		{
			path: EVENTS_MODULE_PATHS.DESTINATIONS.details,
			breadcrumb: false,
			component: DestinationsCrud,
		},
		{
			path: EVENTS_MODULE_PATHS.DESTINATIONS.index,
			breadcrumb: false,
			component: EventsOverview,
		},
		{
			path: EVENTS_MODULE_PATHS.DELIVERIES.create,
			breadcrumb: false,
			component: DeliveriesCrud,
		},
		{
			path: EVENTS_MODULE_PATHS.DELIVERIES.details,
			breadcrumb: false,
			component: DeliveriesCrud,
		},
		{
			path: EVENTS_MODULE_PATHS.DELIVERIES.index,
			breadcrumb: false,
			component: EventsOverview,
		},
	],
});

translations.registerTranslations();
registerEventsModule();
