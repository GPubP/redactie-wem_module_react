import { DEFAULT_PAGINATION } from '../../events.const';
import { DestinationsModel } from '../../store/destinations/destinations.model';
import { api } from '../api';
import { ModelCreateResponseSchema } from '../services.types';

import { EVENT_DESTINATIONS_OVERVIEW_MOCK_DATA } from './destinations.service.mock';
import { DestinationsResponseSchema } from './destinations.service.types';

export const DESTINATIONS_PATH = 'events/v1/destinations';

export class DestinationsAPIService {
	// TODO-NT REMOVE MOCK
	public async fetchAll(
		page = DEFAULT_PAGINATION.number,
		pagesize = DEFAULT_PAGINATION.size,
		sort = ''
	): Promise<DestinationsResponseSchema> {
		console.log(`Mocking fetch to "${DESTINATIONS_PATH}" - with values:`);
		console.log({ page, pagesize, sort });
		return new Promise(resolve =>
			setTimeout(() => resolve(EVENT_DESTINATIONS_OVERVIEW_MOCK_DATA), 1500)
		);
		// return api.get(DESTINATIONS_PATH).json();
	}

	public async create(body: DestinationsModel | undefined): Promise<ModelCreateResponseSchema> {
		console.log(`Mocking post to "${DESTINATIONS_PATH}" - with body:`);
		console.log({ body });
		return new Promise(resolve =>
			setTimeout(() => resolve({ id: '4c7af0f8-38f5-11ed-a261-0242ac120002' }), 1500)
		);
		// return api.post(DESTINATIONS_PATH, { body }).json();
	}
}

export const destinationsAPIService = new DestinationsAPIService();
