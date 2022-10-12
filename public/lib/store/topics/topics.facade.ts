import { alertService, BaseEntityFacade } from '@redactie/utils';

import { ALERT_IDS } from '../../events.const';
import { ALERT_TEXTS } from '../../i18next/alerts.text';
import { topicsAPIService, TopicsAPIService } from '../../services/topics/topics.service';
import {
	TopicCreateResponseSchema,
	TopicOptionSchema,
} from '../../services/topics/topics.service.types';

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
				this.store.setError('');
				this.store.set(topics);
				this.store.setIsFetching(false);
			})
			.catch(error => {
				this.store.set([]);
				this.store.setIsFetching(false);
				this.store.setError(error);
			});
	}

	public async submit(
		destinationId: string,
		body: TopicOptionSchema,
		translator: (a: string) => string,
		onSuccess: (id: string) => void,
		onError: () => void
	): Promise<void> {
		this.store.setIsCreating(true);
		return this.service
			.create(destinationId, body)
			.then((response: TopicCreateResponseSchema) => {
				this.store.setIsCreating(false);
				this.fetchAll(destinationId);
				onSuccess(response.name);
				setTimeout(() => {
					alertService.success(ALERT_TEXTS(translator).TOPICS.createOk, {
						containerId: ALERT_IDS.DELIVERIES_CRUD,
					});
				}, 500);
			})
			.catch(() => {
				this.store.setIsCreating(false);
				onError();
			});
	}
}

export const topicsFacade = new TopicsFacade();
