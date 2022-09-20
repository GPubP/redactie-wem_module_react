import { BaseEntityFacade } from '@redactie/utils';

import {
	destinationsAPIService,
	DestinationsAPIService,
} from '../../services/destinations/destinations.service';
import { DestinationsResponseSchema } from '../../services/destinations/destinations.service.types';
import { sortAndDirectionToAPIQuery } from '../../services/query.helpers';

import { destinationsQuery, DestinationsQuery } from './destinations.query';
import {
	DestinationsStore,
	destinationsStore,
	generateNewDestinationForm,
} from './destinations.store';

export class DestinationsFacade extends BaseEntityFacade<
	DestinationsStore,
	DestinationsAPIService,
	DestinationsQuery
> {
	public readonly destinations$ = this.query.destinations$;
	public readonly pagination$ = this.query.pagination$;
	public readonly formData$ = this.query.formData$;

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
			.then((destinations: DestinationsResponseSchema) => {
				this.store.set(destinations.data);
				this.store.update({ pagination: destinations.pagination, isFetching: false });
			})
			.catch(error => {
				this.store.setError(error);
			});
	}

	public updateField(value: string, field: string): void {
		this.store.update(state => ({
			formData: {
				...(state.formData || generateNewDestinationForm()),
				[field]: value,
			},
		}));
	}

	public resetForm(): void {
		this.store.update(() => ({
			formData: generateNewDestinationForm(),
		}));
	}
}

export const destinationsFacade = new DestinationsFacade(
	destinationsStore,
	destinationsAPIService,
	destinationsQuery
);
