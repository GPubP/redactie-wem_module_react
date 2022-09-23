import { BaseEntityState } from '@redactie/utils';

import { TopicOptionSchema } from '../../services/topics/topics.service.types';

export type TopicModel = TopicOptionSchema;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TopicsState extends BaseEntityState<TopicModel, string> {}
