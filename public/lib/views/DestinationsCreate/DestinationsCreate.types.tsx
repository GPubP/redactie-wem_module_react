import { ChangeHandlerFn } from '../../events.types';
import { DestinationsModel } from '../../store/destinations/destinations.model';

export interface DestinationFormProps {
	data: DestinationsModel | undefined;
	onChange: ChangeHandlerFn;
}
