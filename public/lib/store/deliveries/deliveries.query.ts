import { isNil } from '@datorama/akita';
import { BaseEntityQuery } from '@redactie/utils';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { DeliveriesState } from './deliveries.model';
import { deliveriesStore } from './deliveries.store';

export class DeliveriesQuery extends BaseEntityQuery<DeliveriesState> {
	public deliveries$ = this.selectAll();
	public pagination$ = this.select(state => state.pagination).pipe(
		filter(pagination => !isNil(pagination), distinctUntilChanged())
	);
}

export const deliveriesQuery = new DeliveriesQuery(deliveriesStore);
