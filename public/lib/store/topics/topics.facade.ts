import { BaseEntityFacade } from '@redactie/utils';

import { topicsAPIService, TopicsAPIService } from '../../services/topics/topics.service';
import { TopicOptionSchema } from '../../services/topics/topics.service.types';

import { topicsQuery, TopicsQuery } from './topics.query';
import { topicsStore, TopicsStore } from './topics.store';

export class TopicsFacade extends BaseEntityFacade<TopicsStore, TopicsAPIService, TopicsQuery> {
	public readonly topics$ = this.query.topics$;

	constructor() {
		super(topicsStore, topicsAPIService, topicsQuery);
	}

	public async fetchAll(destinationId: string): Promise<void> {
		const { isFetching } = this.query.getValue();
		if (isFetching) {
			return;
		}
		this.store.setIsFetching(true);
		return this.service
			.fetchAll(destinationId)
			.then((topics: TopicOptionSchema[]) => {
				this.store.set(topics);
				this.store.update({ isFetching: false });
			})
			.catch(error => {
				this.store.setError(error);
			});
	}
}

export const topicsFacade = new TopicsFacade();
