import { LoadingState, useObservable } from '@redactie/utils';

import { EventOptionSchema } from '../../services/events/events.service.types';
import { eventsFacade } from '../../store/events/events.facade';

const useEvents = (): [EventOptionSchema[], LoadingState] => {
	const isFetching = useObservable(eventsFacade.isFetching$, LoadingState.Loading);
	const events = useObservable(eventsFacade.events$, []);

	const error = useObservable(eventsFacade.error$, null);

	const fetchingState = error ? LoadingState.Error : isFetching;

	return [events, fetchingState];
};

export default useEvents;
