import { validateRequired, ValidationState } from '../validation.helpers';

import {
	DeliverySchema,
	DeliveryValidationSchema,
	DeliveryValidationType,
} from './deliveries.service.types';

const DELIVERIES_REQUIRED_FIELDS = ['name'];

export function validateDelivery(body: DeliverySchema | undefined): DeliveryValidationSchema {
	const feedback = {
		name: validateRequired('name', body?.name, DELIVERIES_REQUIRED_FIELDS),
		description: ValidationState.Ok,
		source: ValidationState.Ok,
		event: ValidationState.Ok,
		destination: ValidationState.Ok,
		topic: ValidationState.Ok,
		active: ValidationState.Ok,
	};
	let valid = true;
	Object.keys(feedback).forEach(
		fk => (valid = valid && feedback[fk as keyof DeliveryValidationType] === ValidationState.Ok)
	);
	return {
		valid,
		feedback,
	};
}
