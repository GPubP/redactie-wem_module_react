import { BaseEntityQuery } from '@redactie/utils';

import { DeliveriesState } from './deliveries.model';
import { deliveriesStore } from './deliveries.store';

export class DeliveriesQuery extends BaseEntityQuery<DeliveriesState> {
	public deliveries$ = this.selectAll();
	public pagination$ = this.select(state => state.pagination);
}

export const deliveriesQuery = new DeliveriesQuery(deliveriesStore);
