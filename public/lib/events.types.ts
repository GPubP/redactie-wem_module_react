import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

export interface EventsModuleRouteProps extends RouteConfigComponentProps {
	routes: ModuleRouteConfig[];
	tenantId: string;
}
