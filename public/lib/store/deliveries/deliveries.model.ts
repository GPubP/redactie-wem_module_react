import { BaseEntityState, Page } from '@redactie/utils';

import {
	DeliverySchema,
	DeliveryValidationSchema,
} from '../../services/deliveries/deliveries.service.types';

export type DeliveryModel = DeliverySchema;
export interface DeliveriesState extends BaseEntityState<DeliveryModel, string> {
	formData?: DeliverySchema;
	formValidation?: DeliveryValidationSchema;
	pagination?: Page;
}
