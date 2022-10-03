import { api } from '../api';

import { TopicCreateResponseSchema, TopicOptionSchema } from './topics.service.types';

export const TOPICS_PATH = 'wem/v1/event-destinations';

export class TopicsAPIService {
	public async fetchAll(destinationId: string): Promise<TopicOptionSchema[]> {
		return api.get(`${TOPICS_PATH}/${destinationId}/topics`).json();
	}

	public async create(
		destinationId: string | undefined,
		body: TopicOptionSchema
	): Promise<TopicCreateResponseSchema> {
		return api
			.post(`${TOPICS_PATH}/${destinationId}/topics`, {
				json: { name: body?.name },
			})
			.json();
	}
}

export const topicsAPIService = new TopicsAPIService();
