import { Validator } from 'jsonschema';

import { DELIVERY_FILTER_SCHEMA } from '../../store/deliveries/deliveries.store';
import { validateRequired, ValidationState } from '../validation.helpers';

import {
	DeliverySchema,
	DeliveryValidationSchema,
	DeliveryValidationType,
} from './deliveries.service.types';

const DELIVERIES_REQUIRED_FIELDS = [
	'name',
	'destinationId',
	'topic',
	'eventSource',
	'event',
	'eventVersion',
	'eventType',
];

export function validateDeliveryFilter(
	newFilter: Record<string, unknown> | Record<string, unknown>[] | undefined
): ValidationState {
	const validated = new Validator().validate(newFilter, DELIVERY_FILTER_SCHEMA);
	debugger;
	if (validated.valid) {
		return ValidationState.Ok;
	}
	return ValidationState.Incorrect;
}

export function validateDelivery(body: DeliverySchema | undefined): DeliveryValidationSchema {
	const feedback = {
		name: validateRequired('name', body?.name, DELIVERIES_REQUIRED_FIELDS),
		description: ValidationState.Ok,
		eventSource: body?.id
			? validateRequired('source', body?.eventSource, DELIVERIES_REQUIRED_FIELDS)
			: ValidationState.Ok,
		event: body?.id
			? validateRequired('event', body?.event, DELIVERIES_REQUIRED_FIELDS)
			: ValidationState.Ok,
		eventType: body?.id
			? validateRequired('event', body?.event, DELIVERIES_REQUIRED_FIELDS)
			: ValidationState.Ok,
		eventDescription: ValidationState.Ok,
		eventVersion: ValidationState.Ok,
		filter: validateDeliveryFilter(body?.filter),
		destinationId: body?.id
			? validateRequired('destinationId', body?.destinationId, DELIVERIES_REQUIRED_FIELDS)
			: ValidationState.Ok,
		topic: body?.id
			? validateRequired('topic', body?.topic, DELIVERIES_REQUIRED_FIELDS)
			: ValidationState.Ok,
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
