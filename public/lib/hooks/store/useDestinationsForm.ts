import { useObservable } from '@redactie/utils';

import { destinationsFacade } from '../../store/destinations/destinations.facade';
import { DestinationsModel } from '../../store/destinations/destinations.model';
import { generateNewDestinationForm } from '../../store/destinations/destinations.store';

const useDestinationsForm = (): [DestinationsModel | undefined] => {
	const formData = useObservable(destinationsFacade.formData$, generateNewDestinationForm());
	return [formData];
};

export default useDestinationsForm;
