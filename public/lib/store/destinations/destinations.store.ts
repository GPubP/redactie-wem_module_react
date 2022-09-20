import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { DestinationsModel, DestinationsState } from './destinations.model';

export const generateNewDestinationForm = (): DestinationsModel => ({
	id: '',
	name: '',
	description: '',
	ownerKey: '',
	namespace: '',
	createdAt: '',
	updatedAt: '',
});

@StoreConfig({ name: 'destinations', idKey: 'id' })
export class DestinationsStore extends BaseEntityStore<DestinationsState> {}

export const destinationsStore = new DestinationsStore([]);
