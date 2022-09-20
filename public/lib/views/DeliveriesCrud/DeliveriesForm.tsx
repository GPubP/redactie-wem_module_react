/* eslint-disable import/no-unresolved */
import { Textarea, TextField } from '@acpaas-ui/react-components';
import React, { FC, FormEvent } from 'react';

import FieldDescription from '../../components/forms/FieldDescription';
import translationsConnector from '../../connectors/translations';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { errorState, errorText } from '../utils/form.utils';

import { DeliveriesFormProps } from './DeliveriesCrud.types';
import DeliveriesStatusEdit from './DeliveriesStatusEdit';

const DeliveriesForm: FC<DeliveriesFormProps> = props => {
	const [t] = translationsConnector.useModuleTranslation();
	return (
		<div>
			<div className="row">
				<div className="col-lg-6 col-xs-12">
					<div className="u-margin-bottom">
						<TextField
							label={t(TRANSLATIONS.NAME)}
							name={'name'}
							required={true}
							value={props?.data?.name}
							onChange={(event: FormEvent<HTMLInputElement>) =>
								props.onChange(event.currentTarget.value, 'name')
							}
							disabled={props.isLoading}
							state={errorState(props.validations, 'name')}
						/>
						<FieldDescription
							message={errorText(
								t,
								props.validations,
								'name',
								TRANSLATIONS.DELIVERY_NAME_HELP
							)}
							state={errorState(props.validations, 'name')}
						/>
					</div>
					<div className="u-margin-bottom">
						<Textarea
							label={t(TRANSLATIONS.DESCRIPTION)}
							name={'description'}
							value={props?.data?.description}
							onChange={(event: FormEvent<HTMLInputElement>) =>
								props.onChange(event.currentTarget.value, 'description')
							}
							disabled={props.isLoading}
						/>
						<FieldDescription
							message={t(TRANSLATIONS.DELIVERY_DESCRIPTION_HELP)}
							state={''}
						/>
					</div>
				</div>
			</div>
			<DeliveriesStatusEdit {...props} />
		</div>
	);
};

export default DeliveriesForm;
