import { LoadingState, Page, useObservable } from '@redactie/utils';

import { DEFAULT_PAGINATION } from '../../events.const';
import { DestinationSchema } from '../../services/destinations/destinations.service.types';
import { destinationsFacade } from '../../store/destinations/destinations.facade';

const useDestinations = (): [DestinationSchema[], Page | undefined, LoadingState] => {
	const isFetching = useObservable(destinationsFacade.isFetching$, LoadingState.Loading);
	const destinations = useObservable(destinationsFacade.destinations$, []);
	const pagination = useObservable(destinationsFacade.pagination$, DEFAULT_PAGINATION);

	const error = useObservable(destinationsFacade.error$, null);

	const fetchingState = error ? LoadingState.Error : isFetching;

	return [destinations, pagination, fetchingState];
};

export default useDestinations;
