import { LoadingState, useObservable } from '@redactie/utils';

import { DestinationValidationSchema } from '../../services/destinations/destinations.service.types';
import { destinationsFacade } from '../../store/destinations/destinations.facade';
import { DestinationsModel } from '../../store/destinations/destinations.model';
import { generateNewDestinationForm } from '../../store/destinations/destinations.store';

const useDestinationsForm = (): [
	DestinationsModel | undefined,
	LoadingState,
	DestinationValidationSchema | undefined
] => {
	const isFetching = useObservable(destinationsFacade.isFetching$, LoadingState.Loaded);
	const formData = useObservable(destinationsFacade.formData$, generateNewDestinationForm());
	const formValidation = useObservable(destinationsFacade.formValidation$);

	return [formData, isFetching, formValidation];
};

export default useDestinationsForm;
