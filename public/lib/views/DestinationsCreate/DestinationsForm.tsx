/* eslint-disable import/no-unresolved */
import { Autocomplete, Textarea, TextField } from '@acpaas-ui/react-components';
import React, { FC, FormEvent } from 'react';

import FieldDescription from '../../components/forms/FieldDescription';
import translationsConnector from '../../connectors/translations';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { errorState, errorText } from '../utils/form.utils';

import { DestinationsFormProps } from './DestinationsCreate.types';

const DestinationsForm: FC<DestinationsFormProps> = props => {
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
								TRANSLATIONS.DESTINATION_NAME_HELP
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
							message={t(TRANSLATIONS.DESTINATION_DESCRIPTION_HELP)}
							state={''}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-6 col-xs-12">
					<div className="u-margin-bottom">
						<TextField
							label={t(TRANSLATIONS.OWNER_KEY)}
							name={'ownerKey'}
							required={true}
							value={props?.data?.ownerKey}
							onChange={(event: FormEvent<HTMLInputElement>) =>
								props.onChange(event.currentTarget.value, 'ownerKey')
							}
							disabled={props.isLoading}
							state={errorState(props.validations, 'ownerKey')}
						/>
						<FieldDescription
							message={errorText(
								t,
								props.validations,
								'ownerKey',
								TRANSLATIONS.OWNER_KEY_HELP
							)}
							state={errorState(props.validations, 'ownerKey')}
						/>
					</div>
				</div>
				<div className="col-lg-6 col-xs-12">
					<>
						<Autocomplete
							items={[{ label: 'wcmevents', value: 'wcmevents' }]}
							label={t(TRANSLATIONS.NAMESPACE)}
							required={true}
							name={'namespace'}
							disabled={props.isLoading || !props?.data?.ownerKey}
							value={props?.data?.namespace}
							state={errorState(props.validations, 'namespace')}
							onSelection={(value: string) => props.onChange(value, 'namespace')}
						/>
						<FieldDescription
							message={errorText(
								t,
								props.validations,
								'namespace',
								TRANSLATIONS.NAMESPACE_HELP
							)}
							state={errorState(props.validations, 'namespace')}
						/>
					</>
				</div>
			</div>
		</div>
	);
};

export default DestinationsForm;
