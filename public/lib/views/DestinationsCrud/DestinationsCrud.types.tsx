import { ChangeHandlerFn } from '../../events.types';
import {
	DestinationSchema,
	DestinationValidationType,
} from '../../services/destinations/destinations.service.types';

export interface DestinationsFormProps {
	data: DestinationSchema | undefined;
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

export interface DestinationsCrudProps {
	match: {
		params: {
			destinationId?: string;
		};
	};
}
