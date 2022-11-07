import _ from 'lodash';

import { EventOptionSchema } from '../../services/events/events.service.types';

export const getTestEventFromEventData = (
	eventData: EventOptionSchema | undefined,
	tenantId: string
): Record<string, unknown> => {
	const data = { ...(eventData?.data?.dataSchema?.definitions?.datadef?.examples?.[0] ?? {}) };

	return {
		..._.pick(eventData?.data, [
			'version',
			'specVersion',
			'type',
			'dataContentType',
			'source',
			'event',
		]),
		time: new Date().toISOString(),
		subject: '',
		dataSchema: eventData?.data?.dataSchema?.$schema,
		data: {
			...data,
			...(data?.tenant?.id ? { tenant: { ...data.tenant, id: tenantId } } : {}),
		},
	};
};
