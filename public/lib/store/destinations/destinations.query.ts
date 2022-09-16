import { BaseEntityQuery } from '@redactie/utils';

import { DestinationsState } from './destinations.model';
import { destinationsStore } from './destinations.store';

export class DestinationsQuery extends BaseEntityQuery<DestinationsState> {
	public destinations$ = this.selectAll();
	public pagination$ = this.select(state => state.pagination);
}

export const destinationsQuery = new DestinationsQuery(destinationsStore);
