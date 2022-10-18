import _ from 'lodash';

import { EventOptionSchema } from '../../services/events/events.service.types';

export const getTestEventFromEventData = (
	eventData: EventOptionSchema | undefined
): Record<string, unknown> => {
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
		data: eventData?.data?.dataSchema?.definitions?.datadef?.examples?.[0] ?? {},
	};
};
