import { api } from '../api';

import { EventsResponseSchema } from './events.service.types';

export const EVENTS_PATH = 'event-registry/v1/event-registry';

export class EventsAPIService {
	// TODO-KS REMOVE MOCK
	public async fetchAll(sort?: string): Promise<EventsResponseSchema> {
		console.log('Getting MOCK events');
		// return new Promise(res =>
		// 	setTimeout(
		// 		() =>
		// 			res([
		// 				{
		// 					uuid: '1bdb8b3f-8843-4e64-bb31-a20c0be85019',
		// 					version: '1',
		// 					type: 'Type',
		// 					event: 'Mock event 1',
		// 					source: 'Mock source 1',
		// 					description:
		// 						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lorem eu arcu tincidunt pharetra non a mauris. Curabitur sit amet lorem tortor. Integer consequat vehicula rutrum.',
		// 				},
		// 				{
		// 					uuid: '261d568f-6938-42e6-98bd-ba765b6f7227',
		// 					version: '1',
		// 					type: 'Type',
		// 					event: 'Mock event 2',
		// 					source: 'Mock source 1',
		// 					description:
		// 						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lorem eu arcu tincidunt pharetra non a mauris. Curabitur sit amet lorem tortor. Integer consequat vehicula rutrum.',
		// 				},
		// 				{
		// 					uuid: '261d568f-6938-42e6-98bd-ba765b6f7297',
		// 					version: '2',
		// 					type: 'Type',
		// 					event: 'Mock event 2',
		// 					source: 'Mock source 1',
		// 					description:
		// 						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lorem eu arcu tincidunt pharetra non a mauris. Curabitur sit amet lorem tortor. Integer consequat vehicula rutrum.',
		// 				},
		// 			]),
		// 		1500
		// 	)
		// );
		return api.get(`${EVENTS_PATH}?page=${1}&pagesize=${999}&sort=${sort || 'event'}`).json();
	}
}

export const eventsAPIService = new EventsAPIService();
