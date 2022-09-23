import { validateRequired, ValidationState } from '../validation.helpers';

import {
	DeliverySchema,
	DeliveryValidationSchema,
	DeliveryValidationType,
} from './deliveries.service.types';

const DELIVERIES_REQUIRED_FIELDS = ['name', 'source', 'event', 'eventVersion'];

export function validateDelivery(body: DeliverySchema | undefined): DeliveryValidationSchema {
	const feedback = {
		name: validateRequired('name', body?.name, DELIVERIES_REQUIRED_FIELDS),
		description: ValidationState.Ok,
		source: validateRequired('source', body?.source, DELIVERIES_REQUIRED_FIELDS),
		event: validateRequired('event', body?.event, DELIVERIES_REQUIRED_FIELDS),
		eventDescription: ValidationState.Ok,
		eventVersion: validateRequired(
			'eventVersion',
			body?.eventVersion,
			DELIVERIES_REQUIRED_FIELDS
		),
		destinationId: ValidationState.Ok,
		topic: ValidationState.Ok,
		isActive: ValidationState.Ok,
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
