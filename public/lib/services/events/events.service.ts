import { api } from '../api';

import { EventOptionSchema, EventsResponseSchema } from './events.service.types';

export const EVENTS_PATH = 'event-registry/v1/events';

export class EventsAPIService {
	public async fetchAll(sort?: string): Promise<EventsResponseSchema> {
		return api.get(`${EVENTS_PATH}?page=${1}&pagesize=${999}&sort=${sort || 'event'}`).json();
	}

	public async fetchById(id: string): Promise<EventOptionSchema> {
		return api.get(`${EVENTS_PATH}/${id}`).json();
	}
}

export const eventsAPIService = new EventsAPIService();
