/* eslint-disable import/no-unresolved */
import { TableColumn } from '@redactie/utils';

import { EVENTS_MODULE_PATHS } from '../../events.const';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { DestinationSchema } from '../../services/destinations/destinations.service.types';
import { editButton, tableLink } from '../Components/TableComponents';

export interface DestinationRow {
	uuid: string;
	name: string;
	description: string;
	namespace: string;
	ownerKey: string;
	navigate: (userUuid: string) => void;
}

export const destinationsColumns = (
	translator: (a: string) => string
): TableColumn<DestinationRow>[] => {
	// TODO ADD PERMISSIONS LATER
	// const canUpdate = checkSecurityRights(mySecurityRights, [
	// 	SecurityRightsSite.UsersUpdateSiteRoles,
	//  ]);
	const canUpdate = true;
	const defaultColumns: TableColumn<DestinationRow>[] = [
		{
			label: translator(TRANSLATIONS.NAME),
			disableSorting: false,
			value: 'name',
			width: '40%',
			...(canUpdate && {
				component: tableLink(EVENTS_MODULE_PATHS.DESTINATIONS.base),
			}),
		},
		{
			label: translator(TRANSLATIONS.KEY),
			disableSorting: true,
			value: 'ownerKey',
			width: '20%',
		},
		{
			label: translator(TRANSLATIONS.NAMESPACE),
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
			component: editButton(),
		},
	];
};

export const destinationDataToRows = (
	navigate: any,
	data: DestinationSchema[]
): DestinationRow[] => {
	return data.map((destination: DestinationSchema) => ({
		uuid: destination.id,
		name: destination.name,
		description: destination.description,
		namespace: destination.namespace,
		ownerKey: destination.ownerKey,
		navigate: () =>
			navigate(EVENTS_MODULE_PATHS.DESTINATIONS.details, {
				destinationId: destination.id,
			}),
	}));
};
