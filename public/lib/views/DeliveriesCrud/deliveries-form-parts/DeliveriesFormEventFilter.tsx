import React, { FC } from 'react';

import TextareaWithLineNumbers from '../../../components/Fields/TextareaWithLineNumbers/TextareaWithLineNumbers';
import FieldDescription from '../../../components/forms/FieldDescription';
import { DeliveriesFormProps } from '../DeliveriesCrud.types';

const DeliveriesFormEventFilter: FC<DeliveriesFormProps> = props => {
	return (
		<div>
			<TextareaWithLineNumbers
				name="filter"
				value={(props.data as any)?.filter ?? ''}
				onChange={props.onChange}
			/>
			<FieldDescription
				message={
					'Geef het JSON schema op, gebaseerd op https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/formats/cloudevents.json'
				}
				state=""
			/>
		</div>
	);
};

export default DeliveriesFormEventFilter;
