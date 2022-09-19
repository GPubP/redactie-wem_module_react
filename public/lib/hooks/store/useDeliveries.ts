import { LoadingState, Page, useObservable } from '@redactie/utils';

import { DEFAULT_PAGINATION } from '../../events.const';
import { deliveriesFacade } from '../../store/deliveries/deliveries.facade';
import { DeliveryModel } from '../../store/deliveries/deliveries.model';

const useDeliveries = (): [DeliveryModel[], Page | undefined, LoadingState] => {
	const isFetching = useObservable(deliveriesFacade.isFetching$, LoadingState.Loading);
	const deliveries = useObservable(deliveriesFacade.deliveries$, []);
	const pagination = useObservable(deliveriesFacade.pagination$, DEFAULT_PAGINATION);

	const error = useObservable(deliveriesFacade.error$, null);

	const fetchingState = error ? LoadingState.Error : isFetching;

	return [deliveries, pagination, fetchingState];
};

export default useDeliveries;
