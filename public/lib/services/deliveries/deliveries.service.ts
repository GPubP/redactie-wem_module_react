import { DEFAULT_PAGINATION } from '../../events.const';
import { api } from '../api';

import { EVENT_DELIVERIES_OVERVIEW_MOCK_DATA } from './deliveries.service.mock';
import { DeliveriesResponseSchema } from './deliveries.service.types';

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
}

export const deliveriesAPIService = new DeliveriesAPIService();
