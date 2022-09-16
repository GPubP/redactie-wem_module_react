import { BaseEntityFacade } from '@redactie/utils';
import { DEFAULT_PAGINATION } from '../../events.const';

import {
	destinationsAPIService,
	DestinationsAPIService,
} from '../../services/destinations/destinations.service';
import { DestinationsResponseSchema } from '../../services/destinations/destinations.service.types';
import { sortAndDirectionToAPIQuery } from '../../services/helpers/query.helpers';

import { destinationsQuery, DestinationsQuery } from './destinations.query';
import { DestinationsStore, destinationsStore } from './destinations.store';

export class DestinationsFacade extends BaseEntityFacade<
	DestinationsStore,
	DestinationsAPIService,
	DestinationsQuery
> {
	public readonly destinations$ = this.query.destinations$;
	public readonly pagination$ = this.query.pagination$;

	public async fetchAllDestinations(query: any): Promise<void> {
		const { isFetching } = this.query.getValue();

		if (isFetching) {
			return;
		}

		this.store.setIsFetching(true);

		console.log(query);

		return this.service
			.fetchAllDestinations(
				query.page,
				query.pagesize,
				sortAndDirectionToAPIQuery(query.sort, query.direction)
			)
			.then((destinations: DestinationsResponseSchema) => {
				this.store.set(destinations.data);
				this.store.update({ pagination: destinations.pagination, isFetching: false });
			})
			.catch(error => {
				this.store.setError(error);
			});
	}
}

export const destinationsFacade = new DestinationsFacade(
	destinationsStore,
	destinationsAPIService,
	destinationsQuery
);
