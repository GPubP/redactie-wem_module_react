import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { DestinationsState } from './destinations.model';

@StoreConfig({ name: 'destinations', idKey: 'id' })
export class DestinationsStore extends BaseEntityStore<DestinationsState> {}

export const destinationsStore = new DestinationsStore([]);
