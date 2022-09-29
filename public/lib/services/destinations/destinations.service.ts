import { DEFAULT_PAGINATION } from '../../events.const';
import { api } from '../api';
import { ModelCreateResponseSchema, ModelUpdateResponseSchema } from '../services.types';

import { DestinationSchema, DestinationsResponseSchema } from './destinations.service.types';

export const DESTINATIONS_PATH = 'wem/v1/event-destinations';

export class DestinationsAPIService {
	public async fetchAll(
		page = DEFAULT_PAGINATION.number,
		pagesize = DEFAULT_PAGINATION.size,
		sort = 'name'
	): Promise<DestinationsResponseSchema> {
		return api
			.get(`${DESTINATIONS_PATH}?page=${page}&pagesize=${pagesize}&sort=${sort || 'name'}`)
			.json();
	}

	public async create(body: DestinationSchema | undefined): Promise<ModelCreateResponseSchema> {
		return api.post(DESTINATIONS_PATH, { json: body }).json();
	}

	public async update(
		id: string,
		body: DestinationSchema | undefined
	): Promise<ModelUpdateResponseSchema> {
		return api.patch(`${DESTINATIONS_PATH}/${id}`, { json: body }).json();
	}

	public async fetchOne(id: string): Promise<DestinationSchema> {
		return api.get(`${DESTINATIONS_PATH}/${id}`).json();
	}

	public async delete(id: string | undefined): Promise<void> {
		return api.delete(`${DESTINATIONS_PATH}/${id}`).then();
	}
}

export const destinationsAPIService = new DestinationsAPIService();
