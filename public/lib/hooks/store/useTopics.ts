import { LoadingState, useObservable } from '@redactie/utils';

import { TopicOptionSchema } from '../../services/topics/topics.service.types';
import { topicsFacade } from '../../store/topics/topics.facade';

const useTopics = (): [TopicOptionSchema[], LoadingState, LoadingState] => {
	const isFetching = useObservable(topicsFacade.isFetching$, LoadingState.Loading);
	const isCreating = useObservable(topicsFacade.isCreating$, LoadingState.Loading);
	const topics = useObservable(topicsFacade.topics$, []);

	const error = useObservable(topicsFacade.error$, null);

	const fetchingState = error ? LoadingState.Error : isFetching;

	return [topics, fetchingState, isCreating];
};

export default useTopics;
