/* eslint-disable import/no-unresolved */
import React, { FC } from 'react';

import { EVENT_DELIVERY_TEST_TAB } from '../../../events.const';
import { DeliveriesFormProps } from '../DeliveriesCrud.types';

const DeliveriesFormTest: FC<DeliveriesFormProps> = props => {
	if (props.activeTab !== EVENT_DELIVERY_TEST_TAB) {
		return null;
	}

	return (
		<div>
			<div className="row">
				<div className="col-lg-6 col-xs-12">TODO</div>
			</div>
		</div>
	);
};

export default DeliveriesFormTest;
