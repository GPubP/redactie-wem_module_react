export const MODULE_NAME = 'events';
export const root = '/events';
export const dashboardRoot = `/dashboard`;

export const TENANT_ROOT = '/:tenantId';

export const MODULE_PATHS = {
	root,
	dashboardRoot,
	overview: `${root}/overzicht`,
};

export const BREADCRUMB_OPTIONS = {
	excludePaths: ['/', '/:tenantId', '/:tenantId/sites/:siteId/bewerken'],
};
