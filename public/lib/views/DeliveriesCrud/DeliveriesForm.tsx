/* eslint-disable import/no-unresolved */
import React, { FC } from 'react';

import { DeliveriesFormProps } from './DeliveriesCrud.types';
import DeliveriesFormInput from './deliveries-form-parts/DeliveriesFormInput';
import DeliveriesFormSettings from './deliveries-form-parts/DeliveriesFormSettings';
import DeliveriesFormTest from './deliveries-form-parts/DeliveriesFormTest';

const DeliveriesForm: FC<DeliveriesFormProps> = props => {
	return (
		<div>
			<DeliveriesFormSettings {...props} />
			<DeliveriesFormInput {...props} />
			<DeliveriesFormTest {...props} />
		</div>
	);
};

export default DeliveriesForm;
