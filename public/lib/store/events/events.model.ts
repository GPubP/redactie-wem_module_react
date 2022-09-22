import { BaseEntityState } from '@redactie/utils';

import { EventOptionSchema } from '../../services/events/events.service.types';

export type EventModel = EventOptionSchema;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EventsState extends BaseEntityState<EventModel, string> {}
