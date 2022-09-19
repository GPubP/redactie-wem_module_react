import { BaseEntityState, Page } from '@redactie/utils';

import { DeliverySchema } from '../../services/deliveries/deliveries.service.types';

export type DeliveryModel = DeliverySchema;
export interface DeliveriesState extends BaseEntityState<DeliveryModel, string> {
	pagination?: Page;
}
