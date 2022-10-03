import { ERROR_STATE } from '../../events.const';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { ValidationState } from '../../services/validation.helpers';

export function errorState(validations: any, field: string): string {
	const validationsSafe = validations || {};
	return validationsSafe[field] && validationsSafe[field] !== ValidationState.Ok
		? ERROR_STATE
		: '';
}

export function errorText(
	translator: (a: string) => string,
	validations: any,
	field: string,
	defaultText: string
): string {
	const validationsSafe = validations || {};
	const state: ValidationState = validationsSafe[field] || ValidationState.Ok;
	if (state === ValidationState.Ok) {
		return '';
	}
	if (state === ValidationState.Required) {
		return translator(TRANSLATIONS.REQUIRED);
	}
	return translator(defaultText);
}
