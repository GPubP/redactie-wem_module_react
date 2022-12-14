import { LoadingState, useObservable } from '@redactie/utils';

import {
	DeliverySchema,
	DeliveryValidationSchema,
} from '../../services/deliveries/deliveries.service.types';
import { deliveriesFacade } from '../../store/deliveries/deliveries.facade';
import { generateNewDeliveryForm } from '../../store/deliveries/deliveries.store';

const useDeliveriesForm = (): [
	DeliverySchema | undefined,
	LoadingState,
	DeliveryValidationSchema | undefined,
	LoadingState,
	boolean,
	boolean
] => {
	const isCreating = useObservable(deliveriesFacade.isCreating$, LoadingState.Loaded);
	const formData = useObservable(deliveriesFacade.formData$, generateNewDeliveryForm());
	const formValidation = useObservable(deliveriesFacade.formValidation$);
	const isFetchingOne = useObservable(deliveriesFacade.isFetchingOne$, LoadingState.Loaded);
	const isSendingTestEvent = useObservable(deliveriesFacade.isSendingTestEvent$, false);
	const canSendTestEvent = useObservable(deliveriesFacade.canSendTestEvent$, false);

	return [
		formData,
		isCreating,
		formValidation,
		isFetchingOne,
		isSendingTestEvent,
		canSendTestEvent,
	];
};

export default useDeliveriesForm;
