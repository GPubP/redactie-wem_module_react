import { LoadingState, useObservable } from '@redactie/utils';

import {
	DestinationSchema,
	DestinationValidationSchema,
} from '../../services/destinations/destinations.service.types';
import { destinationsFacade } from '../../store/destinations/destinations.facade';
import { generateNewDestinationForm } from '../../store/destinations/destinations.store';

const useDestinationsForm = (): [
	DestinationSchema | undefined,
	LoadingState,
	DestinationValidationSchema | undefined,
	LoadingState
] => {
	const isCreating = useObservable(destinationsFacade.isCreating$, LoadingState.Loaded);
	const formData = useObservable(destinationsFacade.formData$, generateNewDestinationForm());
	const formValidation = useObservable(destinationsFacade.formValidation$);
	const isFetchingOne = useObservable(destinationsFacade.isFetchingOne$, LoadingState.Loaded);

	return [formData, isCreating, formValidation, isFetchingOne];
};

export default useDestinationsForm;
