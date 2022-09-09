export const MODULE_NAME = 'events';
export const DASHBOARD_ROOT = `/dashboard`;
export const TENANT_ROOT = '/:tenantId';
export const EVENTS_ROOT = `events`;
export const OVERVIEW = '/overzicht';
const eventsOverview = `/${EVENTS_ROOT}/overzicht`;
const eventsOverviewDestinations = `${eventsOverview}/bestemmingen`;
const eventsOverviewEpisodes = `${eventsOverview}/afleveringen`;

export const MODULE_PATHS = {
	root: EVENTS_ROOT,
	dashboardRoot: DASHBOARD_ROOT,
	eventsOverview,
	eventsOverviewDestinations,
	eventsOverviewEpisodes,
};

export const BREADCRUMB_OPTIONS = {
	excludePaths: ['/', '/:tenantId', '/:tenantId/sites/:siteId/bewerken'],
};

export const EVENT_OVERVIEW_TABS = [
	{
		name: 'Bestemmingen',
		target: 'bestemmingen',
		active: true,
		disabled: false,
		// containerId: ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE,
	},
	{
		name: 'Afleveringen',
		target: 'afleveringen',
		active: false,
		disabled: false,
		// containerId: ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE,
	},
];
