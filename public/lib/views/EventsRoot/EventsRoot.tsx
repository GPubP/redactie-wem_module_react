import { RenderChildRoutes, TenantContext } from '@redactie/utils';
import React, { FC, useMemo } from 'react';

import { EventsModuleRouteProps } from '../../events.types';

const EventsRoot: FC<EventsModuleRouteProps> = ({ route, tenantId }) => {
	const guardsMeta = useMemo(() => ({ tenantId }), [tenantId]);

	return (
		<TenantContext.Provider value={{ tenantId }}>
			<RenderChildRoutes routes={route.routes} guardsMeta={guardsMeta} />
		</TenantContext.Provider>
	);
};

export default EventsRoot;
