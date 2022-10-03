import { api } from '../api';
import { ModelCreateResponseSchema } from '../services.types';

import { TopicOptionSchema } from './topics.service.types';

export const TOPICS_PATH = 'wem/v1/event-destinations';

export class TopicsAPIService {
	public async fetchAll(destinationId: string): Promise<TopicOptionSchema[]> {
		return api.get(`${TOPICS_PATH}/${destinationId}/topics`).json();
	}

	public async create(
		destinationId: string | undefined,
		body: TopicOptionSchema | undefined
	): Promise<ModelCreateResponseSchema> {
		return api
			.post(`${TOPICS_PATH}/${destinationId}/topics`, {
				json: { name: body?.name, namespace: body?.namespace },
			})
			.json();
	}
}

export const topicsAPIService = new TopicsAPIService();
