import { BaseEntityQuery } from '@redactie/utils';

import { TopicsState } from './topics.model';
import { topicsStore } from './topics.store';

export class TopicsQuery extends BaseEntityQuery<TopicsState> {
	public topics$ = this.selectAll();
}

export const topicsQuery = new TopicsQuery(topicsStore);
