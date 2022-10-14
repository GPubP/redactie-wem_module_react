import { alertService, BaseEntityFacade } from '@redactie/utils';

import { ALERT_IDS } from '../../events.const';
import { ALERT_TEXTS } from '../../i18next/alerts.text';
import {
	destinationsAPIService,
	DestinationsAPIService,
} from '../../services/destinations/destinations.service';
import {
	DestinationSchema,
	DestinationsResponseSchema,
	DestinationValidationSchema,
} from '../../services/destinations/destinations.service.types';
import { validateDestination } from '../../services/destinations/destinations.validations';
import { sortAndDirectionToAPIQuery } from '../../services/query.helpers';
import { ModelCreateResponseSchema } from '../../services/services.types';
import { ValidationState } from '../../services/validation.helpers';
import { FormUtils } from '../form.utils';

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
	private formUtils: FormUtils;
	public readonly destinations$ = this.query.destinations$;
	public readonly pagination$ = this.query.pagination$;
	public readonly formData$ = this.query.formData$;
	public readonly formValidation$ = this.query.formValidation$;

	constructor() {
		super(destinationsStore, destinationsAPIService, destinationsQuery);
		this.formUtils = new FormUtils(
			this.store,
			this.query,
			this.service,
			generateNewDestinationForm,
			validateDestination
		);
	}

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
				this.store.set(destinations._embedded);
				this.store.update({ pagination: destinations._page, isFetching: false });
			})
			.catch(error => {
				this.store.setError(error);
			});
	}

	public async fetchOne(id: string): Promise<void> {
		return this.formUtils.fetchOne(id);
	}

	public updateField(value: string, field: string): void {
		this.formUtils.updateField(value, field);
	}

	public resetForm(): void {
		this.formUtils.resetForm();
	}

	public async submit(
		body: DestinationSchema | undefined,
		translator: (a: string) => string,
		onSuccess: (id: string) => void
	): Promise<void> {
		this.store.setIsCreating(true);
		const validation = this.formUtils.preSubmit(body) as DestinationValidationSchema;

		if (body?.namespace) {
			const namespaceValidation = await this.service.validateNamespace(body.namespace);
			if (!namespaceValidation.valid) {
				validation.valid = false;
				validation.feedback = {
					...validation.feedback,
					namespace: ValidationState.Incorrect,
				};
				this.store.update(() => ({
					formValidation: validation,
				}));
			}
		}

		if (!validation.valid) {
			this.store.setIsCreating(false);
			return;
		}

		if (!body?.id) {
			return this.service.create(body).then((response: ModelCreateResponseSchema) => {
				this.resetForm();
				onSuccess(response.id);
				this.store.setIsCreating(false);
				setTimeout(() => {
					alertService.success(ALERT_TEXTS(translator).DESTINATIONS.createOk, {
						containerId: ALERT_IDS.EVENTS_INDEX,
					});
				}, 500);
			});
		}
		if (body?.id) {
			return this.service.update(body.id, body).then(() => {
				this.store.setIsCreating(false);
				alertService.success(ALERT_TEXTS(translator).DESTINATIONS.updateOk, {
					containerId: ALERT_IDS.EVENTS_INDEX,
				});
			});
		}
	}

	public async delete(
		id: string | undefined,
		translator: (a: string) => string,
		onSuccess: () => void
	): Promise<void> {
		this.store.setIsCreating(true);
		return this.service.delete(id).then(() => {
			this.resetForm();
			onSuccess();
			setTimeout(() => {
				alertService.success(ALERT_TEXTS(translator).DESTINATIONS.deleteOk, {
					containerId: ALERT_IDS.EVENTS_INDEX,
				});
			}, 500);
		});
	}
}

export const destinationsFacade = new DestinationsFacade();
