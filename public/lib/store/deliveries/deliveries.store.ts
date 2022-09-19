import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { DeliveriesState } from './deliveries.model';

@StoreConfig({ name: 'deliveries', idKey: 'id' })
export class DeliveriesStore extends BaseEntityStore<DeliveriesState> {}

export const deliveriesStore = new DeliveriesStore([]);
