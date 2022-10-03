// import { TRANSLATIONS } from './i18next/translations.const';

import { Page } from '@redactie/utils';

export const MODULE_NAME = 'events';
export const ROOT_PATH = '/events';

export const EVENTS_MODULE_PATHS = {
	ROOT: ROOT_PATH,
	DESTINATIONS: {
		base: '/bestemmingen',
		index: `${ROOT_PATH}/bestemmingen`,
		create: `${ROOT_PATH}/bestemmingen/nieuw`,
		details: `${ROOT_PATH}/bestemmingen/:destinationId`,
	},
	DELIVERIES: {
		base: '/afleveringen',
		index: `${ROOT_PATH}/afleveringen`,
		create: `${ROOT_PATH}/afleveringen/nieuw`,
		details: `${ROOT_PATH}/afleveringen/:deliveryId`,
		detailsSettings: `${ROOT_PATH}/afleveringen/:deliveryId/instellingen`,
		detailsInput: `${ROOT_PATH}/afleveringen/:deliveryId/inhoud`,
		detailsTest: `${ROOT_PATH}/afleveringen/:deliveryId/test`,
	},
};

export const EVENT_DELIVERY_SETTINGS_TAB = 'instellingen';
export const EVENT_DELIVERY_INPUT_TAB = 'inhoud';
export const EVENT_DELIVERY_TEST_TAB = 'test';
export const EVENT_DELIVERIES_TABS = [
	{ name: 'Instellingen', target: EVENT_DELIVERY_SETTINGS_TAB },
	{ name: 'Inhoud', target: EVENT_DELIVERY_INPUT_TAB },
	{ name: 'Test', target: EVENT_DELIVERY_TEST_TAB },
];

export const MODULE_TABS = [
	{
		name: 'DESTINATIONS',
		target: EVENTS_MODULE_PATHS.DESTINATIONS.index,
		active: true,
		disabled: false,
	},
	{
		name: 'DELIVERIES',
		target: EVENTS_MODULE_PATHS.DELIVERIES.index,
		active: false,
		disabled: false,
	},
];

export const DEFAULT_SEARCH_PARAMS = {
	page: { defaultValue: 1, type: 'number' },
	pagesize: { defaultValue: 20, type: 'number' },
	sparse: { defaultValue: true, type: 'number' },
	search: { type: 'string' },
} as const;

export const DEFAULT_PAGINATION: Page = {
	size: DEFAULT_SEARCH_PARAMS.pagesize.defaultValue,
	totalElements: 0,
	totalPages: 0,
	number: DEFAULT_SEARCH_PARAMS.page.defaultValue,
};

export const ERROR_STATE = 'error';

export const ALERT_IDS = {
	EVENTS_INDEX: 'events-index',
	DESTINATIONS_CRUD: 'destinations-crud',
	DELIVERIES_CRUD: 'deliveries-crud',
};
