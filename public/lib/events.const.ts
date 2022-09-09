export const MODULE_NAME = 'events';
export const DASHBOARD_ROOT = `/dashboard`;
export const TENANT_ROOT = '/:tenantId';
export const EVENTS_ROOT = `events`;
export const OVERVIEW = '/overzicht';
const eventsOverview = `/${EVENTS_ROOT}/overzicht`;
const eventsOverviewDestinations = `${eventsOverview}/bestemmingen`;
const eventsCreateDestination = `${eventsOverviewDestinations}/aanmaken`;
const eventsOverviewEpisodes = `${eventsOverview}/afleveringen`;

export const MODULE_PATHS = {
	root: EVENTS_ROOT,
	dashboardRoot: DASHBOARD_ROOT,
	eventsOverview,
	eventsOverviewDestinations,
	eventsCreateDestination,
	eventsOverviewEpisodes,
};

export const BREADCRUMB_OPTIONS = {
	excludePaths: ['/', '/:tenantId', '/:tenantId/sites/:siteId/bewerken'],
};
