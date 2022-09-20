import { BaseEntityFacade } from '@redactie/utils';

import {
	destinationsAPIService,
	DestinationsAPIService,
} from '../../services/destinations/destinations.service';
import { DestinationsResponseSchema } from '../../services/destinations/destinations.service.types';
import { validateDestination } from '../../services/destinations/destinations.validations';
import { sortAndDirectionToAPIQuery } from '../../services/query.helpers';
import { ModelCreateResponseSchema } from '../../services/services.types';

import { DestinationsModel } from './destinations.model';
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
	public readonly formValidation$ = this.query.formValidation$;

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
		this.store.setIsFetching(false);
		this.store.update(() => ({
			formData: generateNewDestinationForm(),
		}));
	}

	public async submit(
		body: DestinationsModel | undefined,
		onSuccess: (id: string) => void
	): Promise<void> {
		const bodyToSubmit = body;
		const { isFetching } = this.query.getValue();

		if (isFetching) {
			return;
		}
		this.store.setIsFetching(true);
		const validation = validateDestination(bodyToSubmit);
		this.store.update(() => ({
			formValidation: validation,
		}));
		if (validation.valid) {
			return this.service.create(bodyToSubmit).then((response: ModelCreateResponseSchema) => {
				this.resetForm();
				onSuccess(response.id);
			});
		} else {
			this.store.setIsFetching(false);
		}
	}
}

export const destinationsFacade = new DestinationsFacade(
	destinationsStore,
	destinationsAPIService,
	destinationsQuery
);
