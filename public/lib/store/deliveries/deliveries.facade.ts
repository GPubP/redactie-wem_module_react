import { BaseEntityFacade } from '@redactie/utils';

import {
	deliveriesAPIService,
	DeliveriesAPIService,
} from '../../services/deliveries/deliveries.service';
import { DeliveriesResponseSchema } from '../../services/deliveries/deliveries.service.types';
import { sortAndDirectionToAPIQuery } from '../../services/query.helpers';

import { deliveriesQuery, DeliveriesQuery } from './deliveries.query';
import { deliveriesStore, DeliveriesStore } from './deliveries.store';

export class DeliveriesFacade extends BaseEntityFacade<
	DeliveriesStore,
	DeliveriesAPIService,
	DeliveriesQuery
> {
	public readonly deliveries$ = this.query.deliveries$;
	public readonly pagination$ = this.query.pagination$;

	public async fetchAll(query: any): Promise<void> {
		const { isFetching } = this.query.getValue();

		if (isFetching) {
			return;
		}

		this.store.setIsFetching(true);

		return this.service
			.fetchAll(
				query.page,
				query.pagesize,
				sortAndDirectionToAPIQuery(query.sort, query.direction)
			)
			.then((deliveries: DeliveriesResponseSchema) => {
				this.store.set(deliveries.data);
				this.store.update({ pagination: deliveries.pagination, isFetching: false });
			})
			.catch(error => {
				this.store.setError(error);
			});
	}
}

export const deliveriesFacade = new DeliveriesFacade(
	deliveriesStore,
	deliveriesAPIService,
	deliveriesQuery
);
