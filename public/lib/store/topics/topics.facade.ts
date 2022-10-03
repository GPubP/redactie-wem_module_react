import { alertService, BaseEntityFacade } from '@redactie/utils';

import { ALERT_IDS } from '../../events.const';
import { ALERT_TEXTS } from '../../i18next/alerts.text';
import { ModelCreateResponseSchema } from '../../services/services.types';
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

	public async submit(
		destinationId: string | undefined,
		body: TopicOptionSchema | undefined,
		translator: (a: string) => string,
		onSuccess: (id: string) => void
	): Promise<void> {
		this.store.setIsCreating(true);
		if (body?.name) {
			return this.service
				.create(destinationId, body)
				.then((response: ModelCreateResponseSchema) => {
					onSuccess(response.id);
					setTimeout(() => {
						alertService.success(ALERT_TEXTS(translator).TOPICS.createOk, {
							containerId: ALERT_IDS.TOPICS_CRUD,
						});
					}, 500);
				});
		}
		this.store.setIsCreating(false);
	}
}

export const topicsFacade = new TopicsFacade();
