import { alertService, BaseEntityFacade } from '@redactie/utils';

import { ALERT_IDS } from '../../events.const';
import { ALERT_TEXTS } from '../../i18next/alerts.text';
import {
	deliveriesAPIService,
	DeliveriesAPIService,
} from '../../services/deliveries/deliveries.service';
import {
	DeliveriesResponseSchema,
	DeliverySchema,
} from '../../services/deliveries/deliveries.service.types';
import { validateDelivery } from '../../services/deliveries/deliveries.validations';
import { sortAndDirectionToAPIQuery } from '../../services/query.helpers';
import { ModelCreateResponseSchema } from '../../services/services.types';
import { FormUtils } from '../form.utils';

import { deliveriesQuery, DeliveriesQuery } from './deliveries.query';
import { deliveriesStore, DeliveriesStore, generateNewDeliveryForm } from './deliveries.store';

export class DeliveriesFacade extends BaseEntityFacade<
	DeliveriesStore,
	DeliveriesAPIService,
	DeliveriesQuery
> {
	private formUtils: FormUtils;
	public readonly deliveries$ = this.query.deliveries$;
	public readonly pagination$ = this.query.pagination$;
	public readonly formData$ = this.query.formData$;
	public readonly formValidation$ = this.query.formValidation$;

	constructor() {
		super(deliveriesStore, deliveriesAPIService, deliveriesQuery);
		this.formUtils = new FormUtils(
			this.store,
			this.query,
			this.service,
			generateNewDeliveryForm,
			validateDelivery
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
			.then((deliveries: DeliveriesResponseSchema) => {
				this.store.set(deliveries._embedded);
				this.store.update({ pagination: deliveries._page, isFetching: false });
			})
			.catch(error => {
				this.store.setError(error);
			});
	}

	public updateField(value: string | boolean, field: string): void {
		this.formUtils.updateField(value, field);
	}

	public resetForm(): void {
		this.formUtils.resetForm();
	}

	public async fetchOne(id: string): Promise<void> {
		return this.formUtils.fetchOne(id);
	}

	public async submit(
		body: DeliverySchema | undefined,
		translator: (a: string) => string,
		onSuccess: (id: string) => void,
		update: any
	): Promise<void> {
		const bodyToSubmit = { ...body, ...update };
		const validation = this.formUtils.preSubmit(bodyToSubmit);
		if (validation.valid && !bodyToSubmit?.id) {
			return this.service.create(bodyToSubmit).then((response: ModelCreateResponseSchema) => {
				this.resetForm();
				onSuccess(response.id);
				setTimeout(() => {
					alertService.success(ALERT_TEXTS(translator).DELIVERIES.createOk, {
						containerId: ALERT_IDS.DELIVERIES_CRUD,
					});
				}, 500);
			});
		}
		if (validation.valid && bodyToSubmit?.id) {
			return this.service.update(bodyToSubmit.id, bodyToSubmit).then(() => {
				this.store.setIsCreating(false);
				alertService.success(ALERT_TEXTS(translator).DELIVERIES.updateOk, {
					containerId: ALERT_IDS.DELIVERIES_CRUD,
				});
			});
		}
		this.store.setIsCreating(false);
	}

	public async delete(
		id: string | undefined,
		translator: (a: string) => string,
		onSuccess: () => void
	): Promise<void> {
		this.store.setIsCreating(true);
		return this.service.delete(id).then(() => {
			console.log('deleted');
			this.resetForm();
			onSuccess();
			setTimeout(() => {
				alertService.success(ALERT_TEXTS(translator).DELIVERIES.deleteOk, {
					containerId: ALERT_IDS.EVENTS_INDEX,
				});
			}, 500);
		});
	}
}

export const deliveriesFacade = new DeliveriesFacade();
