import { ERROR_STATE } from '../../events.const';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { DeliveryValidationType } from '../../services/deliveries/deliveries.service.types';
import { DestinationValidationType } from '../../services/destinations/destinations.service.types';
import { TopicValidationType } from '../../services/topics/topics.service.types';
import { ValidationState } from '../../services/validation.helpers';

export function errorState(
	validations:
		| DeliveryValidationType
		| DestinationValidationType
		| TopicValidationType
		| undefined,
	field: string
): string {
	const validationsSafe:
		| DeliveryValidationType
		| DestinationValidationType
		| TopicValidationType
		| Record<string, ValidationState> = validations || {};
	return (validationsSafe as Record<string, ValidationState>)[field] &&
		(validationsSafe as Record<string, ValidationState>)[field] !== ValidationState.Ok
		? ERROR_STATE
		: '';
}

export function errorText(
	translator: (a: string) => string,
	validations:
		| DeliveryValidationType
		| DestinationValidationType
		| TopicValidationType
		| undefined,
	field: string,
	defaultText: string
): string {
	const validationsSafe:
		| DeliveryValidationType
		| DestinationValidationType
		| TopicValidationType
		| Record<string, ValidationState> = validations || {};
	const state: ValidationState =
		(validationsSafe as Record<string, ValidationState>)[field] || ValidationState.Ok;
	if (state === ValidationState.Ok) {
		return '';
	}
	if (state === ValidationState.Required) {
		return translator(TRANSLATIONS.REQUIRED);
	}
	return translator(defaultText);
}
