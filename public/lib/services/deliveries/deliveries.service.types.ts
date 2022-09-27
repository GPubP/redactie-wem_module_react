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
	event: string;
	eventId: string;
	eventSource: string;
	eventDescription: string;
	eventVersion: string;
	destinationId: string;
	destinationName: string;
	topic: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface DeliveryValidationSchema extends ValidationProps {
	feedback: DeliveryValidationType;
}

export interface DeliveryValidationType {
	name: ValidationState;
	description: ValidationState;
	event: ValidationState;
	eventSource: string;
	eventDescription: ValidationState;
	eventVersion: ValidationState;
	destinationId: ValidationState;
	topic: ValidationState;
	isActive: ValidationState;
}
