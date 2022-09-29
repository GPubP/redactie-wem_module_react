import { Page } from '@redactie/utils';

import { ValidationProps } from '../../events.types';
import { ValidationState } from '../validation.helpers';

export interface DestinationsResponseSchema {
	_embedded: DestinationSchema[];
	_page: Page;
}

export interface DestinationSchema {
	id: string;
	name: string;
	description: string;
	ownerKey: string;
	namespace: string;
	usedInCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface DestinationValidationSchema extends ValidationProps {
	feedback: DestinationValidationType;
}

export interface DestinationValidationType {
	name: ValidationState;
	description: ValidationState;
	ownerKey: ValidationState;
	namespace: ValidationState;
}
