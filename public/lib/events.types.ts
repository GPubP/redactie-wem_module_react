import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

export interface EventsModuleRouteProps extends RouteConfigComponentProps {
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export type ChangeHandlerFn = (value: any, name: string) => void;
