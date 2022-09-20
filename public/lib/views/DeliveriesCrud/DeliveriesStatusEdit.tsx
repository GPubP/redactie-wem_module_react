/* eslint-disable import/no-unresolved */
import { Button } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import translationsConnector from '../../connectors/translations';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { renderActiveState } from '../utils/render.utilis';

import { DeliveriesFormProps } from './DeliveriesCrud.types';

const DeliveriesStatusEdit: FC<DeliveriesFormProps> = ({ data, onChange }) => {
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
							{data?.active
								? t(TRANSLATIONS.DELIVERY_ACTIVE_HELP)
								: t(TRANSLATIONS.DELIVERY_NOT_ACTIVE_HELP)}
						</p>
						<div className="m-button-group u-margin-top">
							<Button
								onClick={() => onChange(!data.active, 'active')}
								className="u-margin-right-xs"
							>
								{!data?.active
									? t(TRANSLATIONS.ACTIVATE)
									: t(TRANSLATIONS.DESACTIVATE)}
							</Button>
							<Button iconLeft="trash" type="danger">
								Verwijderen
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : null;
};

export default DeliveriesStatusEdit;
