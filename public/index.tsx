import Core from '@redactie/redactie-core';

import { registerEventsModule } from './lib/api';
import rolesRightsConnector from './lib/connectors/rolesRights';
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
			guardOptions: {
				guards: [
					rolesRightsConnector.api.guards.securityRightsTenantGuard([
						rolesRightsConnector.securityRights.destinationCreate,
					]),
				],
			},
		},
		{
			path: EVENTS_MODULE_PATHS.DESTINATIONS.details,
			breadcrumb: false,
			component: DestinationsCrud,
			guardOptions: {
				guards: [
					rolesRightsConnector.api.guards.securityRightsTenantGuard([
						rolesRightsConnector.securityRights.destinationRead,
					]),
				],
			},
		},
		{
			path: EVENTS_MODULE_PATHS.DESTINATIONS.index,
			breadcrumb: false,
			component: EventsOverview,
			guardOptions: {
				guards: [
					rolesRightsConnector.api.guards.securityRightsTenantGuard([
						rolesRightsConnector.securityRights.destinationRead,
					]),
				],
			},
		},
		{
			path: EVENTS_MODULE_PATHS.DELIVERIES.create,
			breadcrumb: false,
			component: DeliveriesCrud,
			guardOptions: {
				guards: [
					rolesRightsConnector.api.guards.securityRightsTenantGuard([
						rolesRightsConnector.securityRights.deliveryCreate,
					]),
				],
			},
		},
		{
			path: EVENTS_MODULE_PATHS.DELIVERIES.details,
			breadcrumb: false,
			component: DeliveriesCrud,
			redirect: EVENTS_MODULE_PATHS.DELIVERIES.detailsSettings,
			guardOptions: {
				guards: [
					rolesRightsConnector.api.guards.securityRightsTenantGuard([
						rolesRightsConnector.securityRights.deliveryRead,
					]),
				],
			},
			routes: [
				{
					path: EVENTS_MODULE_PATHS.DELIVERIES.detailsSettings,
					breadcrumb: false,
					component: DeliveriesCrud,
				},
				{
					path: EVENTS_MODULE_PATHS.DELIVERIES.detailsInput,
					breadcrumb: false,
					component: DeliveriesCrud,
				},
				{
					path: EVENTS_MODULE_PATHS.DELIVERIES.detailsTest,
					breadcrumb: false,
					component: DeliveriesCrud,
				},
			],
		},

		{
			path: EVENTS_MODULE_PATHS.DELIVERIES.index,
			breadcrumb: false,
			component: EventsOverview,
			guardOptions: {
				guards: [
					rolesRightsConnector.api.guards.securityRightsTenantGuard([
						rolesRightsConnector.securityRights.deliveryRead,
					]),
				],
			},
		},
	],
});

translations.registerTranslations();
registerEventsModule();
