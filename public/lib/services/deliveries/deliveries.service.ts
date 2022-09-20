import { DEFAULT_PAGINATION } from '../../events.const';
import { api } from '../api';
import { ModelCreateResponseSchema } from '../services.types';

import { EVENT_DELIVERIES_OVERVIEW_MOCK_DATA } from './deliveries.service.mock';
import { DeliveriesResponseSchema, DeliverySchema } from './deliveries.service.types';

export const DELIVERIES_PATH = 'events/v1/deliveries';

export class DeliveriesAPIService {
	// TODO-NT REMOVE MOCK
	public async fetchAll(
		page = DEFAULT_PAGINATION.number,
		pagesize = DEFAULT_PAGINATION.size,
		sort = ''
	): Promise<DeliveriesResponseSchema> {
		console.log(`Mocking fetch to "${DELIVERIES_PATH}" - with values:`);
		console.log({ page, pagesize, sort });
		return new Promise(resolve =>
			setTimeout(() => resolve(EVENT_DELIVERIES_OVERVIEW_MOCK_DATA), 1500)
		);
		// return api.get(DELIVERIES_PATH).json();
	}

	public async create(body: DeliverySchema | undefined): Promise<ModelCreateResponseSchema> {
		console.log(`Mocking post to "${DELIVERIES_PATH}" - with body:`);
		console.log({ body });
		return new Promise(resolve =>
			setTimeout(() => resolve({ id: '123af0f8-38f5-1ffw-a261-3522ac120llm' }), 1500)
		);
		// return api.post(DESTINATIONS_PATH, { body }).json();
	}

	public async fetchOne(id: string): Promise<DeliverySchema> {
		console.log(`Mocking fetch to "${`${DELIVERIES_PATH}/${id}`}"`);
		return new Promise(resolve =>
			setTimeout(() => resolve(EVENT_DELIVERIES_OVERVIEW_MOCK_DATA.data[0]), 1500)
		);
		// return api.get(`DESTINATIONS_PATH/${id}`).json();
	}
}

export const deliveriesAPIService = new DeliveriesAPIService();
