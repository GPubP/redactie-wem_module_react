/* eslint-disable import/no-unresolved */
import { TableColumn } from '@redactie/utils';

import { EVENTS_MODULE_PATHS } from '../../events.const';
import useDestinations from '../../hooks/store/useDestinations';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { DestinationSchema } from '../../services/destinations/destinations.service.types';
import { destinationsFacade } from '../../store/destinations/destinations.facade';
import { editButton, tableLink } from '../Components/TableComponents';
import { BasicRow } from '../Components/components.types';
import { columnDefinition } from '../utils/table.utils';

interface DestinationRow extends BasicRow {
	namespace: string;
	ownerKey: string;
}

const destinationsColumns = (translator: (a: string) => string): TableColumn<DestinationRow>[] => {
	const canUpdate = true;
	const defaultColumns: TableColumn<DestinationRow>[] = [
		{
			label: translator(TRANSLATIONS.NAME),
			disableSorting: false,
			value: 'name',
			width: '40%',
			...(canUpdate && {
				component: tableLink(EVENTS_MODULE_PATHS.DESTINATIONS.index),
			}),
		},
		columnDefinition(translator(TRANSLATIONS.KEY), 'ownerKey'),
		columnDefinition(translator(TRANSLATIONS.NAMESPACE), 'namespace', '30%'),
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

const destinationDataToRows = (navigate: any, data: any[]): DestinationRow[] => {
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

export default {
	urls: EVENTS_MODULE_PATHS.DESTINATIONS,
	columnsConfig: destinationsColumns,
	dataToRows: destinationDataToRows,
	facade: destinationsFacade,
	fetchHook: useDestinations,
};
