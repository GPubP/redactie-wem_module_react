/* eslint-disable react/display-name */
/* eslint-disable import/no-unresolved */
import { Link as AUILink, Button } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip } from '@acpaas-ui/react-editorial-components';
import React from 'react';
import { Link } from 'react-router-dom';

import { BasicRow } from './components.types';

export function tableLink(url: string) {
	return (value: string, rowData: BasicRow) => {
		return (
			<>
				<AUILink to={`..${url}/${rowData?.uuid}`} component={Link}>
					<EllipsisWithTooltip>{value}</EllipsisWithTooltip>
				</AUILink>
				<p className="small">
					{rowData?.description ? (
						<EllipsisWithTooltip>{rowData?.description}</EllipsisWithTooltip>
					) : (
						''
					)}
				</p>
			</>
		);
	};
}

export function editButton() {
	return (value: unknown, rowData: BasicRow) => {
		const { uuid, navigate } = rowData;
		return (
			<Button
				ariaLabel="Edit"
				icon="edit"
				onClick={() => navigate(uuid)}
				type="primary"
				transparent
			/>
		);
	};
}
