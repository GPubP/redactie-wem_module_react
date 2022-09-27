import { alertService, BaseEntityFacade } from '@redactie/utils';

import { ALERT_IDS } from '../../events.const';
import { ALERT_TEXTS } from '../../i18next/alerts.text';
import { eventsAPIService, EventsAPIService } from '../../services/events/events.service';
import { EventsResponseSchema } from '../../services/events/events.service.types';

import { eventsQuery, EventsQuery } from './events.query';
import { eventsStore, EventsStore } from './events.store';

export class EventsFacade extends BaseEntityFacade<EventsStore, EventsAPIService, EventsQuery> {
	public readonly events$ = this.query.events$;

	constructor() {
		super(eventsStore, eventsAPIService, eventsQuery);
	}

	public async fetchAll(): Promise<void> {
		const { isFetching } = this.query.getValue();
		if (isFetching) {
			return;
		}
		this.store.setIsFetching(true);
		return this.service
			.fetchAll()
			.then((events: EventsResponseSchema) => {
				this.store.set(events?._embedded?.events ?? []);
				this.store.update({ pagination: events._page, isFetching: false });
			})
			.catch(error => {
				this.store.setError(error);
			});
	}

	public async checkIfEventExists(
		eventId: string,
		translator: (a: string) => string
	): Promise<void> {
		await this.service.fetchById(eventId).catch(() => {
			alertService.warning(ALERT_TEXTS(translator).DELIVERIES.eventDoesNotExist, {
				containerId: ALERT_IDS.DELIVERIES_CRUD,
			});
		});
	}
}

export const eventsFacade = new EventsFacade();
