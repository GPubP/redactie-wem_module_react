import { api } from '../api';

import { TopicOptionSchema } from './topics.service.types';

export const TOPICS_PATH = 'wem/v1/event-destinations';

export class TopicsAPIService {
	public async fetchAll(destinationId: string): Promise<TopicOptionSchema[]> {
		return api.get(`${TOPICS_PATH}/${destinationId}/topics`).json();
	}
}

export const topicsAPIService = new TopicsAPIService();
