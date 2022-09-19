import { Page } from '@redactie/utils';

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
