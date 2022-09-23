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
		return api.patch(`${DELIVERIES_PATH}/${id}`, { json: body }).json();
	}

	public async fetchOne(id: string): Promise<DeliverySchema> {
		return api.get(`${DELIVERIES_PATH}/${id}`).json();
	}

	public async delete(id: string | undefined): Promise<void> {
		return api.delete(`${DELIVERIES_PATH}/${id}`).then();
	}
}

export const deliveriesAPIService = new DeliveriesAPIService();
