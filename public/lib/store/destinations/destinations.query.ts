import { isNil } from '@datorama/akita';
import { BaseEntityQuery } from '@redactie/utils';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { DestinationsState } from './destinations.model';
import { destinationsStore } from './destinations.store';

export class DestinationsQuery extends BaseEntityQuery<DestinationsState> {
	public destinations$ = this.selectAll();
	public pagination$ = this.select(state => state.pagination).pipe(
		filter(pagination => !isNil(pagination), distinctUntilChanged())
	);
	public formData$ = this.select(state => state.formData).pipe(
		filter(formData => !isNil(formData), distinctUntilChanged())
	);
}

export const destinationsQuery = new DestinationsQuery(destinationsStore);
