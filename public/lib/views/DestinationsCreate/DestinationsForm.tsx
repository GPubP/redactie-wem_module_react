/* eslint-disable import/no-unresolved */
import { Autocomplete, Textarea, TextField } from '@acpaas-ui/react-components';
import React, { FC, FormEvent } from 'react';

import FieldDescription from '../../components/forms/FieldDescription';
import translationsConnector from '../../connectors/translations';
import { TRANSLATIONS } from '../../i18next/translations.const';

import { DestinationsFormProps } from './DestinationsCreate.types';

const DestinationsForm: FC<DestinationsFormProps> = props => {
	const [t] = translationsConnector.useModuleTranslation();

	console.log(props.data);
	return (
		<>
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
							// state={'staat'} // todo-nt
						/>
						<FieldDescription
							message={t(TRANSLATIONS.DESTINATION_NAME_HELP)}
							state={''} // todo-nt
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
							// state={'staat'} // todo-nt
						/>
						<FieldDescription
							message={t(TRANSLATIONS.DESTINATION_DESCRIPTION_HELP)}
							state={''} // todo-nt
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
							// state={'error'} // todo-nt
						/>
						<FieldDescription
							message={t(TRANSLATIONS.OWNER_KEY_HELP)}
							state={''} // todo-nt
						/>
					</div>
				</div>
				<div className="col-lg-6 col-xs-12">
					{props?.data?.ownerKey ? (
						<>
							<Autocomplete
								items={[{ label: 'wcmevents', value: 'wcmevents' }]}
								label={t(TRANSLATIONS.NAMESPACE)}
								required={true}
								name={'namespace'}
								value={props?.data?.namespace}
								onSelection={(value: string) => props.onChange(value, 'namespace')}
							/>
							<FieldDescription
								message={t(TRANSLATIONS.NAMESPACE_HELP)}
								state={''} // todo-nt
							/>
						</>
					) : null}
				</div>
			</div>
		</>
	);
};

export default DestinationsForm;
