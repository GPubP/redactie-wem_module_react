import { validateRequired, ValidationState } from '../validation.helpers';

import {
	DestinationSchema,
	DestinationValidationSchema,
	DestinationValidationType,
} from './destinations.service.types';

const DESTINATIONS_REQUIRED_FIELDS = ['ownerKey', 'name', 'namespace'];

export function validateDestination(
	body: DestinationSchema | undefined
): DestinationValidationSchema {
	const feedback = {
		id: ValidationState.Ok,
		ownerKey: validateRequired('ownerKey', body?.ownerKey, DESTINATIONS_REQUIRED_FIELDS),
		namespace: validateRequired('namespace', body?.namespace, DESTINATIONS_REQUIRED_FIELDS),
		name: validateRequired('name', body?.name, DESTINATIONS_REQUIRED_FIELDS),
		description: ValidationState.Ok,
		createdAt: ValidationState.Ok,
		updatedAt: ValidationState.Ok,
	};
	let valid = true;
	Object.keys(feedback).forEach(
		fk =>
			(valid =
				valid && feedback[fk as keyof DestinationValidationType] === ValidationState.Ok)
	);
	return {
		valid,
		feedback,
	};
}
