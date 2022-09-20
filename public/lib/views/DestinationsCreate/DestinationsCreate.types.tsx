import { ChangeHandlerFn } from '../../events.types';
import { DestinationsModel } from '../../store/destinations/destinations.model';

export interface DestinationsFormProps {
	data: DestinationsModel | undefined;
	onChange: ChangeHandlerFn;
}

export interface DestinationsFormActionsProps {
	onSubmit?: () => void;
	onDelete?: () => void;
	onCancel?: () => void;
	isLoading: boolean;
}
