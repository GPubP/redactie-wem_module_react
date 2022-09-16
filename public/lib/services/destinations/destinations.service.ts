import { DEFAULT_PAGINATION } from '../../events.const';
import { EVENT_DESTINATIONS_OVERVIEW_MOCK_DATA } from '../../views/EventsOverview/EventsOverview.mock.data';
import { api } from '../api';

import { DestinationsResponseSchema } from './destinations.service.types';

export const DESTINATIONS_PATH = 'events/v1/destinations';

export class DestinationsAPIService {
	public async fetchAllDestinations(
		page = DEFAULT_PAGINATION.number,
		pagesize = DEFAULT_PAGINATION.size,
		sort = ''
	): Promise<DestinationsResponseSchema> {
		console.log(`Mocking fetch to "${DESTINATIONS_PATH}" - with values:`);
		console.log({ page, pagesize, sort });
		return new Promise(resolve =>
			setTimeout(() => resolve(EVENT_DESTINATIONS_OVERVIEW_MOCK_DATA), 3000)
		);
		// return api.get(DESTINATIONS_PATH).json();
	}
}

export const destinationsAPIService = new DestinationsAPIService();
