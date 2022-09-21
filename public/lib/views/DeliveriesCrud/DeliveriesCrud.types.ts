import { ChangeHandlerFn } from '../../events.types';
import {
	DeliverySchema,
	DeliveryValidationType,
} from '../../services/deliveries/deliveries.service.types';

export interface DeliveriesCrudProps {
	match: {
		params: {
			deliveryId?: string;
		};
	};
}

export interface DeliveriesFormProps {
	data: DeliverySchema | undefined;
	onChange: ChangeHandlerFn;
	validations: DeliveryValidationType | undefined;
	isLoading: boolean;
	changeActiveState: () => void;
}
