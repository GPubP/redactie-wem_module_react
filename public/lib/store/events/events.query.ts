import { BaseEntityQuery } from '@redactie/utils';

import { EventsState } from './events.model';
import { eventsStore } from './events.store';

export class EventsQuery extends BaseEntityQuery<EventsState> {
	public events$ = this.selectAll();
}

export const eventsQuery = new EventsQuery(eventsStore);
