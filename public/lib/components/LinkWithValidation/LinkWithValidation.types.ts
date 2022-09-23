import { DeliveryValidationType } from '../../services/deliveries/deliveries.service.types';

export interface LinkWithValidationProps {
	to: string;
	validationFeedback?: DeliveryValidationType;
}
