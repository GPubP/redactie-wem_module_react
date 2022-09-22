import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { EventsState } from './events.model';

@StoreConfig({ name: 'events', idKey: 'uuid' })
export class EventsStore extends BaseEntityStore<EventsState> {}

export const eventsStore = new EventsStore([]);
