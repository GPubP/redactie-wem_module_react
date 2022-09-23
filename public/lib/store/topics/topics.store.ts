import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { TopicsState } from './topics.model';

@StoreConfig({ name: 'topics', idKey: 'name' })
export class TopicsStore extends BaseEntityStore<TopicsState> {}

export const topicsStore = new TopicsStore([]);
