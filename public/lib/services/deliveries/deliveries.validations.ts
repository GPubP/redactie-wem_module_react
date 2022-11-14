import { Validator } from 'jsonschema';

import { DELIVERY_FILTER_SCHEMA } from '../../store/deliveries/deliveries.store';
import { validateRequired, ValidationState } from '../validation.helpers';

import {
	DeliveryFilterValidationState,
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
	newFilter: string | undefined
): DeliveryFilterValidationState {
	if (!newFilter) {
		return { valid: true, error: '' };
	}
	let parsed;
	try {
		parsed = JSON.parse(newFilter as string);
	} catch (error) {
		return {
			valid: false,
			error: (error as any).message,
		};
	}

	const validated = new Validator().validate(parsed, DELIVERY_FILTER_SCHEMA);
	if (validated.valid) {
		return { valid: true, error: '' };
	}
	return { valid: false, error: ValidationState.Incorrect };
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
		fk =>
			(valid =
				valid &&
				(fk === 'filter'
					? !!feedback.filter.valid
					: feedback[fk as keyof DeliveryValidationType] === ValidationState.Ok))
	);
	return {
		valid,
		feedback,
	};
}
