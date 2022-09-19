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
	},
};

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
