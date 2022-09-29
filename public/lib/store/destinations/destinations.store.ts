import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { DestinationSchema } from '../../services/destinations/destinations.service.types';

import { DestinationsState } from './destinations.model';

export const generateNewDestinationForm = (): DestinationSchema => ({
	id: '',
	name: '',
	description: '',
	ownerKey: '',
	usedInCount: 0,
	namespace: '',
	createdAt: '',
	updatedAt: '',
});

@StoreConfig({ name: 'destinations', idKey: 'id' })
export class DestinationsStore extends BaseEntityStore<DestinationsState> {}

export const destinationsStore = new DestinationsStore([]);
