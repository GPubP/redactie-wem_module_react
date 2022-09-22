import { DEFAULT_PAGINATION } from '../../events.const';
import { api } from '../api';
import { ModelCreateResponseSchema, ModelUpdateResponseSchema } from '../services.types';

import { DeliveriesResponseSchema, DeliverySchema } from './deliveries.service.types';

export const DELIVERIES_PATH = 'wem/v1/event-episodes';

export class DeliveriesAPIService {
	// TODO-NT REMOVE MOCK
	public async fetchAll(
		page = DEFAULT_PAGINATION.number,
		pagesize = DEFAULT_PAGINATION.size,
		sort = 'name'
	): Promise<DeliveriesResponseSchema> {
		return api
			.get(`${DELIVERIES_PATH}?page=${page}&pagesize=${pagesize}&sort=${sort || 'name'}`)
			.json();
	}

	public async create(body: DeliverySchema | undefined): Promise<ModelCreateResponseSchema> {
		console.log(`Mocking post to "${DELIVERIES_PATH}" - with body:`);
		console.log({ body });

		return api
			.post(DELIVERIES_PATH, {
				json: { name: body?.name, description: body?.description ?? '' },
			})
			.json();
	}

	public async update(
		id: string,
		body: DeliverySchema | undefined
	): Promise<ModelUpdateResponseSchema> {
		console.log(`Mocking patch to "${`${DELIVERIES_PATH}/${id}`}" - with body:`);
		console.log({ body });
		return new Promise(resolve => setTimeout(() => resolve({ message: 'Update OK!' }), 1500));
		// return api.patch(`${DELIVERIES_PATH}/${id}`, { body }).json();
	}

	public async fetchOne(id: string): Promise<DeliverySchema> {
		console.log(`Mocking fetch to "${`${DELIVERIES_PATH}/${id}`}"`);

		return api.get(`${DELIVERIES_PATH}/${id}`).json();
	}

	public async delete(id: string | undefined): Promise<ModelUpdateResponseSchema> {
		console.log(`Mocking DELETE  "${`${DELIVERIES_PATH}/${id}`}"`);
		return new Promise(resolve => setTimeout(() => resolve({ message: 'Delete OK!' }), 1500));
		// return delete.get(`${DELIVERIES_PATH}/${id}`).json();
	}
}

export const deliveriesAPIService = new DeliveriesAPIService();
