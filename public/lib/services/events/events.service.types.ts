import { Page } from '@redactie/utils';

interface EventOptionMeta {
	category: string;
	createdAt: string;
	updatedAt: string;
	deleted: boolean;
	enabled: boolean;
	moduleId: string;
}

interface EventOptionData {
	event: string;
	description: string;
	source: string;
	specVersion: string;
	version: string;
	type: string;
}

export interface EventOptionSchema {
	uuid: string;
	meta: EventOptionMeta;
	data: EventOptionData;
}

export interface EventsResponseSchema {
	_embedded: { events: EventOptionSchema[] };
	_page: Page;
}
