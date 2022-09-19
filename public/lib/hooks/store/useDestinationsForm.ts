import { useObservable } from '@redactie/utils';

import { destinationsFacade } from '../../store/destinations/destinations.facade';
import { DestinationsModel } from '../../store/destinations/destinations.model';

const generateNewDestinationForm = (): DestinationsModel => ({
	id: '',
	name: '',
	description: '',
	ownerKey: '',
	namespace: '',
	createdAt: '',
	updatedAt: '',
});

const useDestinationsForm = (): [DestinationsModel | undefined] => {
	const formData = useObservable(destinationsFacade.formData$, generateNewDestinationForm());
	return [formData];
};

export default useDestinationsForm;
