/* eslint-disable import/no-unresolved */
import { Button } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import translationsConnector from '../../connectors/translations';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { renderActiveState } from '../utils/render.utilis';

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

	return data?.id ? (
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
								onClick={onDelete}
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
	) : null;
};

export default DeliveriesStatusEdit;
