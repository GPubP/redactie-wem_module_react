import { Page } from '@redactie/utils';

export interface DeliveriesResponseSchema {
	data: DeliverySchema[];
	pagination: Page;
}

export interface DeliverySchema {
	id: string;
	name: string;
	description: string;
	source: string;
	event: string;
	destination: string;
	topic: string;
	active: boolean;
	createdAt: string;
	updatedAt: string;
}
