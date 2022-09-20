import { ChangeHandlerFn } from '../../events.types';
import { DestinationValidationType } from '../../services/destinations/destinations.service.types';
import { DestinationsModel } from '../../store/destinations/destinations.model';

export interface DestinationsFormProps {
	data: DestinationsModel | undefined;
	onChange: ChangeHandlerFn;
	validations: DestinationValidationType | undefined;
	isLoading: boolean;
}

export interface DestinationsFormActionsProps {
	onSubmit?: () => void;
	onDelete?: () => void;
	onCancel?: () => void;
	isLoading: boolean;
}
