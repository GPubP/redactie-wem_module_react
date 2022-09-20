import { BaseEntityState, Page } from '@redactie/utils';

import {
	DestinationSchema,
	DestinationValidationSchema,
} from '../../services/destinations/destinations.service.types';

type DestinationModel = DestinationSchema;
export interface DestinationsState extends BaseEntityState<DestinationModel, string> {
	pagination?: Page;
	formData?: DestinationSchema;
	formValidation?: DestinationValidationSchema;
}
