import { Page } from '@redactie/utils';

import { ValidationProps } from '../../events.types';
import { ValidationState } from '../validation.helpers';

export interface DeliveriesResponseSchema {
	_embedded: DeliverySchema[];
	_page: Page;
}

export interface DeliverySchema {
	id: string;
	name: string;
	description: string;
	source: string;
	event: string;
	eventDescription: string;
	eventVersion: string;
	destinationId: string;
	topic: string;
	active: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface DeliveryValidationSchema extends ValidationProps {
	feedback: DeliveryValidationType;
}

export interface DeliveryValidationType {
	name: ValidationState;
	description: ValidationState;
	source: ValidationState;
	event: ValidationState;
	destination: ValidationState;
	topic: ValidationState;
	active: ValidationState;
}
