import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { DeliverySchema } from '../../services/deliveries/deliveries.service.types';

import { DeliveriesState } from './deliveries.model';

export const generateNewDeliveryForm = (): DeliverySchema => ({
	id: '',
	name: '',
	description: '',
	source: '',
	event: '',
	eventDescription: '',
	eventVersion: '',
	destinationId: '',
	topic: '',
	isActive: false,
	createdAt: '',
	updatedAt: '',
});

@StoreConfig({ name: 'deliveries', idKey: 'id' })
export class DeliveriesStore extends BaseEntityStore<DeliveriesState> {}

export const deliveriesStore = new DeliveriesStore([]);
