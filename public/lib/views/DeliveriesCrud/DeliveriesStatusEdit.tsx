/* eslint-disable import/no-unresolved */
import { Button } from '@acpaas-ui/react-components';
import React, { FC, useState } from 'react';

import translationsConnector from '../../connectors/translations';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { renderActiveState } from '../utils/render.utilis';
import {
	ControlledModal,
	ControlledModalBody,
	ControlledModalFooter,
	ControlledModalHeader,
} from '@acpaas-ui/react-editorial-components';

import { DeliveriesFormProps } from './DeliveriesCrud.types';

const DeliveriesStatusEdit: FC<DeliveriesFormProps> = ({
	canUpdate,
	canDelete,
	data,
	onDelete,
	changeActiveState,
	isLoading,
}) => {
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
		return onDelete();
	};

	return data?.id ? (
		<>
			<div className="row u-margin-top u-margin-bottom">
				<div className="col-xs-12">
					<div className="m-card">
						<div className="m-card__body">
							<h6>
								{`${t(TRANSLATIONS.STATUS)}: `}
								{renderActiveState(data, t)}
							</h6>
							<p className="u-margin-top-xs">
								{data?.isActive
									? t(TRANSLATIONS.DELIVERY_ACTIVE_HELP)
									: t(TRANSLATIONS.DELIVERY_NOT_ACTIVE_HELP)}
							</p>
							<div className="m-button-group u-margin-top">
								<Button
									disabled={isLoading || !canUpdate}
									onClick={changeActiveState}
									className="u-margin-right-xs"
								>
									{!data?.isActive
										? t(TRANSLATIONS.ACTIVATE)
										: t(TRANSLATIONS.DESACTIVATE)}
								</Button>
								<Button
									onClick={openDeleteModal}
									disabled={isLoading || !canDelete}
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
			<ControlledModal
				show={showDeleteModal}
				onClose={onDeleteModalPromptCancel}
				size="large"
			>
				<ControlledModalHeader>
					<h4>{t(TRANSLATIONS.DELETE_MODAL_TITLE)}</h4>
				</ControlledModalHeader>
				<ControlledModalBody>
					{t(TRANSLATIONS.DELETE_MODAL_DELIVERY_BODY)}
				</ControlledModalBody>
				<ControlledModalFooter>
					<div className="u-flex u-flex-item u-flex-justify-end">
						<Button onClick={onDeleteModalPromptCancel} negative>
							{t(TRANSLATIONS.CANCEL)}
						</Button>
						<Button
							iconLeft="trash-o"
							// disabled={isSubmitting}
							onClick={onDeleteConfirm}
							type={'danger'}
						>
							{t(TRANSLATIONS.DELETE)}
						</Button>
					</div>
				</ControlledModalFooter>
			</ControlledModal>
		</>
	) : null;
};

export default DeliveriesStatusEdit;
