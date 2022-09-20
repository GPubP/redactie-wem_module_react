import { Page } from '@redactie/utils';

import { ValidationState } from '../validation.helpers';

export interface DestinationsResponseSchema {
	data: DestinationSchema[];
	pagination: Page;
}

export interface DestinationSchema {
	id: string;
	name: string;
	description: string;
	ownerKey: string;
	namespace: string;
	createdAt: string;
	updatedAt: string;
}

export interface DestinationValidationSchema {
	valid: boolean;
	feedback: DestinationValidationType;
}

export interface DestinationValidationType {
	id: ValidationState;
	name: ValidationState;
	description: ValidationState;
	ownerKey: ValidationState;
	namespace: ValidationState;
	createdAt: ValidationState;
	updatedAt: ValidationState;
}
