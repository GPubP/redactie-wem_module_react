import React from 'react';
import { SearchParams, TableColumn } from '@redactie/utils';
import { DestinationsOverviewTableRow } from './EventsOverview.types';
import { Link as AUILink, Button } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip } from '@acpaas-ui/react-editorial-components';
import { Link } from 'react-router-dom';

export const EVENT_OVERVIEW_TABS = [
	{
		name: 'Bestemmingen',
		target: 'bestemmingen',
		active: true,
		disabled: false,
		// containerId: ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE,
	},
	{
		name: 'Afleveringen',
		target: 'afleveringen',
		active: false,
		disabled: false,
		// containerId: ALERT_CONTAINER_IDS.UPDATE_USER_ROLES_SITE_ON_SITE,
	},
];

export const DEFAULT_DESTINATIONS_SEARCH_PARAMS: SearchParams = {
	page: 1,
	pagesize: 20,
	sparse: true,
};

export const DESTINATIONS_QUERY_PARAMS_CONFIG = {
	pagesize: { defaultValue: DEFAULT_DESTINATIONS_SEARCH_PARAMS.pagesize, type: 'number' },
	sparse: { defaultValue: DEFAULT_DESTINATIONS_SEARCH_PARAMS.sparse, type: 'number' },
	search: { type: 'string' },
} as const;

export const DESTINATIONS_OVERVIEW_COLUMNS = (): TableColumn<DestinationsOverviewTableRow>[] => {
	// TODO ADD PERMISSIONS LATER
	//
	//      const canUpdate = checkSecurityRights(mySecurityRights, [
	// 	    SecurityRightsSite.UsersUpdateSiteRoles,
	//      ]);
	const canUpdate = true;

	const defaultColumns: TableColumn<DestinationsOverviewTableRow>[] = [
		{
			label: 'Naam',
			disableSorting: false,
			value: 'name',
			width: '40%',
			...(canUpdate && {
				component(value: string, rowData) {
					return (
						<>
							<AUILink to={`../bestemmingen/${rowData?.uuid}`} component={Link}>
								<EllipsisWithTooltip>{value}</EllipsisWithTooltip>
							</AUILink>
							<p className="small">
								{rowData?.description ? (
									<EllipsisWithTooltip>
										{rowData?.description}
									</EllipsisWithTooltip>
								) : (
									''
								)}
							</p>
						</>
					);
				},
			}),
		},
		{
			label: 'Sleutel',
			disableSorting: true,
			value: 'ownerKey',
			width: '20%',
		},
		{
			label: 'Naamruimte',
			disableSorting: true,
			value: 'namespace',
			width: '30%',
		},
	];

	if (!canUpdate) {
		return defaultColumns;
	}

	return [
		...defaultColumns,
		{
			label: '',
			classList: ['u-text-right'],
			disableSorting: true,
			width: '10%',
			component(value: unknown, rowData) {
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
			},
		},
	];
};
