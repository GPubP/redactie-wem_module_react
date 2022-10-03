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
	public formData$ = this.select(state => state.formData).pipe(
		filter(formData => !isNil(formData), distinctUntilChanged())
	);
	public formValidation$ = this.select(state => state.formValidation).pipe(
		filter(validation => !isNil(validation), distinctUntilChanged())
	);
	public isSendingTestEvent$ = this.select(state => state.isSendingTestEvent);
	public canSendTestEvent$ = this.select(state =>
		state.canSendTestEvent === undefined ? true : state.canSendTestEvent
	);
}

export const deliveriesQuery = new DeliveriesQuery(deliveriesStore);
