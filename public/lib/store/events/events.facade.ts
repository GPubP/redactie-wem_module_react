import { BaseEntityFacade } from '@redactie/utils';

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
}

export const eventsFacade = new EventsFacade();
