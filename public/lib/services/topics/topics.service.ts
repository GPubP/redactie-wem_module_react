import { api } from '../api';

import { TopicOptionSchema } from './topics.service.types';

export const TOPICS_PATH = 'wem/v1/event-handler';

export class TopicsAPIService {
	public async fetchAll(ownerKey: string, namespace: string): Promise<TopicOptionSchema[]> {
		return api.get(`${TOPICS_PATH}/${ownerKey}/namespaces/${namespace}/topics`).json();
	}
}

export const topicsAPIService = new TopicsAPIService();
