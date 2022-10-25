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
	eventType: string;
	eventDescription: string;
	eventVersion: string;
	destinationId: string;
	destinationName: string;
	destinationNamespace?: string;
	destinationOwnerKey?: string;
	filter: Record<string, unknown>;
	testEvent: string;
	topic: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	auditLogUrl: string;
	documentationUrl: string;
}

export interface DeliveryValidationSchema extends ValidationProps {
	feedback: DeliveryValidationType;
}

export interface DeliveryValidationType {
	name: ValidationState;
	description: ValidationState;
	event: ValidationState;
	eventSource: string;
	eventType: string;
	eventDescription: ValidationState;
	eventVersion: ValidationState;
	destinationId: ValidationState;
	topic: ValidationState;
	isActive: ValidationState;
	filter: ValidationState;
}

export interface TestEventSchema {
	eventBody: Record<string, unknown>;
	ownerKey: string;
	namespace: string;
	topic: string;
	deliveryId: string;
	filter: Record<string, unknown>;
}

export interface TestEventErrorResponse {
	error: string;
	message: string;
}
