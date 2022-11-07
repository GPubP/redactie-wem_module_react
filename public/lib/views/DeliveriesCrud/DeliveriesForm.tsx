/* eslint-disable import/no-unresolved */
import React, { FC } from 'react';

import { DeliveriesFormProps } from './DeliveriesCrud.types';
import DeliveriesFormInput from './deliveries-form-parts/DeliveriesFormInput';
import DeliveriesFormSettings from './deliveries-form-parts/DeliveriesFormSettings';
import DeliveriesFormTest from './deliveries-form-parts/DeliveriesFormTest';

import './DeliveriesForm.scss';

const DeliveriesForm: FC<DeliveriesFormProps> = props => {
	return (
		<div className="DeliveriesForm">
			<DeliveriesFormSettings {...props} />
			<DeliveriesFormInput {...props} />
			<DeliveriesFormTest {...props} />
		</div>
	);
};

export default DeliveriesForm;
