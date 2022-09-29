/* eslint-disable import/no-unresolved */
import { Textarea, TextField, Button } from '@acpaas-ui/react-components';
import React, { FC, FormEvent, useState } from 'react';
import FieldDescription from '../../components/forms/FieldDescription';
import translationsConnector from '../../connectors/translations';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { errorState, errorText } from '../utils/form.utils';

import { DestinationsFormProps } from './DestinationsCrud.types';
import Modal from '../../components/Modal/Modal';

const DestinationsForm: FC<DestinationsFormProps> = props => {
	const [t] = translationsConnector.useModuleTranslation();

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const onDeleteModalPromptCancel = (): void => {
		setShowDeleteModal(false);
	};

	const openDeleteModal = (): void => {
		setShowDeleteModal(true);
	};

	const onDeleteConfirm = (): void => {
		setShowDeleteModal(false);
		return props.onDelete();
	};
	return (
		<>
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
								disabled={props.isLoading || !props.canUpdate}
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
								disabled={props.isLoading || !props.canUpdate}
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
								disabled={props.isLoading || !props.canUpdate}
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
							<TextField
								label={t(TRANSLATIONS.NAMESPACE)}
								name={'namespace'}
								required={true}
								value={props?.data?.namespace}
								onChange={(event: FormEvent<HTMLInputElement>) =>
									props.onChange(event.currentTarget.value, 'namespace')
								}
								disabled={props.isLoading || !props.canUpdate}
								state={errorState(props.validations, 'namespace')}
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
				{props?.data?.id && (
					<div className="row u-margin-top u-margin-bottom">
						<div className="col-xs-12">
							<div className="m-card">
								<div className="m-card__body">
									<h6>{t(TRANSLATIONS.DELETE)}</h6>
									<p className="u-margin-top-xs">
										{!props?.data?.usedInCount
											? t(TRANSLATIONS.DESTINATION_CAN_DELETE)
											: t(TRANSLATIONS.DESTINATION_CANNOT_DELETE).replace(
													':usedInCount:',
													`${props?.data?.usedInCount}`
											  )}
									</p>
									<div className="m-button-group u-margin-top">
										<Button
											onClick={openDeleteModal}
											disabled={
												!!props?.data?.usedInCount || !props.canDelete
											}
											iconLeft="trash"
											type="danger"
										>
											{t(TRANSLATIONS.DELETE)}
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<Modal
				show={showDeleteModal}
				onClose={onDeleteModalPromptCancel}
				size="large"
				title={t(TRANSLATIONS.DELETE_MODAL_TITLE)}
				body={t(TRANSLATIONS.DELETE_MODAL_DESTINATION_BODY)}
				actions={[
					{
						title: t(TRANSLATIONS.CANCEL),
						onClick: onDeleteModalPromptCancel,
						negative: true,
					},
					{
						title: t(TRANSLATIONS.DELETE),
						onClick: onDeleteConfirm,
						iconLeft: 'trash-o',
						type: 'danger',
					},
				]}
			/>
		</>
	);
};

export default DestinationsForm;
