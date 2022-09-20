import { BaseEntityState, Page } from '@redactie/utils';

import {
	DestinationSchema,
	DestinationValidationSchema,
} from '../../services/destinations/destinations.service.types';

export type DestinationsModel = DestinationSchema;
export interface DestinationsState extends BaseEntityState<DestinationsModel, string> {
	pagination?: Page;
	formData?: DestinationSchema;
	formValidation?: DestinationValidationSchema;
}
