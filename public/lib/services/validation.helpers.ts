export const enum ValidationState {
	Required = 'required',
	Ok = 'ok',
}

export function validateRequired(
	field: string,
	value: string | undefined,
	requiredFields: string[]
): ValidationState {
	return requiredFields.includes(field) && !value ? ValidationState.Required : ValidationState.Ok;
}
