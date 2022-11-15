import { AlertProps, alertService, BaseEntityFacade } from '@redactie/utils';
import React from 'react';

import { ALERT_IDS, ERROR_RESPONSES } from '../../events.const';
import { ALERT_TEXTS } from '../../i18next/alerts.text';
import {
	deliveriesAPIService,
	DeliveriesAPIService,
} from '../../services/deliveries/deliveries.service';
import {
	DeliveriesResponseSchema,
	DeliverySchema,
	TestEventSchema,
} from '../../services/deliveries/deliveries.service.types';
import { validateDelivery } from '../../services/deliveries/deliveries.validations';
import { sortAndDirectionToAPIQuery } from '../../services/query.helpers';
import { ModelCreateResponseSchema } from '../../services/services.types';
import TestEventNoFilterMatchMessage from '../../views/DeliveriesCrud/test-event-no-filter-match-message/TestEventNoFilterMatchMessage';
import { FormUtils } from '../form.utils';

import { deliveriesQuery, DeliveriesQuery } from './deliveries.query';
import {
	deliveriesStore,
	DeliveriesStore,
	generateNewDeliveryForm,
	mapDeliveryToStore,
} from './deliveries.store';

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
	public readonly isSendingTestEvent$ = this.query.isSendingTestEvent$;
	public readonly canSendTestEvent$ = this.query.canSendTestEvent$;

	constructor() {
		super(deliveriesStore, deliveriesAPIService, deliveriesQuery);
		this.formUtils = new FormUtils(
			this.store,
			this.query,
			this.service,
			generateNewDeliveryForm,
			validateDelivery,
			mapDeliveryToStore
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

	public async fetchOne(id: string): Promise<DeliverySchema | undefined> {
		return this.formUtils.fetchOne(id);
	}

	public async submit(
		body: DeliverySchema | undefined,
		translator: (a: string) => string,
		onSuccess: (id: string) => void,
		update: Partial<DeliverySchema>
	): Promise<void> {
		const bodyToSubmit = { ...body, ...update };
		const validation = this.formUtils.preSubmit(bodyToSubmit);
		if (validation.valid && !bodyToSubmit?.id) {
			return this.service
				.create(bodyToSubmit as DeliverySchema)
				.then((response: ModelCreateResponseSchema) => {
					this.resetForm();
					this.store.setIsCreating(false);
					onSuccess(response.id);
					setTimeout(() => {
						alertService.success(ALERT_TEXTS(translator).DELIVERIES.createOk, {
							containerId: ALERT_IDS.DELIVERIES_CRUD,
						});
					}, 500);
					setTimeout(() => {
						alertService.dismiss();
					}, 2000);
				});
		}
		if (validation.valid && bodyToSubmit?.id) {
			const updateBody = {
				...bodyToSubmit,
				filter: bodyToSubmit.filter ? JSON.parse(bodyToSubmit.filter) : undefined,
			};
			if (bodyToSubmit.testEvent) {
				try {
					updateBody.testEvent = JSON.stringify(
						JSON.parse(bodyToSubmit.testEvent),
						null,
						4
					);
				} catch {
					updateBody.testEvent = bodyToSubmit.testEvent;
				}
			}
			return this.service.update(bodyToSubmit.id, updateBody as DeliverySchema).then(() => {
				this.store.setIsCreating(false);
				this.updateField(
					JSON.stringify(JSON.parse(bodyToSubmit.filter as string), null, 4),
					'filter'
				);
				this.updateField(updateBody.testEvent as string, 'testEvent');
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
			this.resetForm();
			onSuccess();
			setTimeout(() => {
				alertService.success(ALERT_TEXTS(translator).DELIVERIES.deleteOk, {
					containerId: ALERT_IDS.EVENTS_INDEX,
				});
			}, 500);
		});
	}

	public async validateForm(body: DeliverySchema | undefined): Promise<void> {
		this.formUtils.validate(body);
	}

	public setCanSendTestEvent(value: boolean): void {
		this.store.update({ canSendTestEvent: value });
	}

	public async sendTestEvent(
		body: TestEventSchema,
		translator: (a: string) => string
	): Promise<void> {
		this.store.update({ isSendingTestEvent: true });
		return this.service.sendTestEvent(body).then(response => {
			this.store.update({ isSendingTestEvent: false });
			if (response?.error) {
				setTimeout(() => {
					const errorAlertProps: AlertProps = ALERT_TEXTS(translator, body).DELIVERIES
						.testEventError;
					const alertProps = {
						...errorAlertProps,
						message: response?.message ?? errorAlertProps.message,
					};
					alertService.warning(
						{
							...alertProps,
							message:
								response.error === ERROR_RESPONSES.NO_FILTER_MATCH ? (
									<TestEventNoFilterMatchMessage
										message={alertProps.message}
										filters={response.filters || []}
									/>
								) : (
									alertProps.message
								),
						},
						{
							containerId: ALERT_IDS.DELIVERIES_CRUD,
						}
					);
				});
				return;
			}

			setTimeout(() => {
				alertService.success(ALERT_TEXTS(translator, body).DELIVERIES.testEventOk, {
					containerId: ALERT_IDS.DELIVERIES_CRUD,
				});
			}, 500);
		});
	}
}

export const deliveriesFacade = new DeliveriesFacade();
