import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';
import { Schema } from 'jsonschema';

import { DeliverySchema } from '../../services/deliveries/deliveries.service.types';

import { DeliveriesState } from './deliveries.model';

export const DEFAULT_DELIVERY_FILTER = {
	operator: 'AND',
	conditions: [],
};

export const DELIVERY_FILTER_SCHEMA: Schema = {
	oneOf: [
		{
			type: 'object',
			properties: {
				operator: {
					type: 'string',
					enum: ['AND', 'OR'],
				},
				conditions: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							operator: {
								type: 'string',
								enum: ['='],
							},
							path: {
								type: 'string',
							},
							value: {
								type: 'string',
							},
						},
						required: ['operator', 'path', 'value'],
						additionalProperties: false,
					},
				},
			},
			required: ['operator', 'conditions'],
			additionalProperties: false,
		},
		{
			type: 'object',
			properties: {
				operator: {
					type: 'string',
					enum: ['='],
				},
				path: {
					type: 'string',
				},
				value: {
					type: 'string',
				},
			},
			required: ['operator', 'path', 'value'],
			additionalProperties: false,
		},
	],
};

export const generateNewDeliveryForm = (): DeliverySchema => ({
	id: '',
	name: '',
	description: '',
	event: '',
	eventId: '',
	eventSource: '',
	eventType: '',
	eventDescription: '',
	eventVersion: '',
	destinationId: '',
	destinationName: '',
	topic: '',
	testEvent: '',
	filter: DEFAULT_DELIVERY_FILTER,
	isActive: false,
	createdAt: '',
	updatedAt: '',
});

@StoreConfig({ name: 'deliveries', idKey: 'id' })
export class DeliveriesStore extends BaseEntityStore<DeliveriesState> {}

export const deliveriesStore = new DeliveriesStore([]);
