/* eslint-disable import/no-unresolved */
import { TableColumn } from '@redactie/utils';

import { EVENTS_MODULE_PATHS } from '../../events.const';
import useDeliveries from '../../hooks/store/useDeliveries';
import { TRANSLATIONS } from '../../i18next/translations.const';
import { DeliverySchema } from '../../services/deliveries/deliveries.service.types';
import { deliveriesFacade } from '../../store/deliveries/deliveries.facade';
import { editButton, tableLink } from '../Components/TableComponents';
import { BasicRow } from '../Components/components.types';
import { renderActiveState } from '../utils/render.utilis';
import { columnDefinition } from '../utils/table.utils';

interface DeliveryRow extends BasicRow {
	eventSource: string;
	event: string;
	destination: string;
	topic: string;
	isActive: boolean;
}

const deliveriesColumns = (translator: (a: string) => string): TableColumn<DeliveryRow>[] => {
	// TODO ADD PERMISSIONS LATER
	// const canUpdate = checkSecurityRights(mySecurityRights, [
	// 	SecurityRightsSite.UsersUpdateSiteRoles,
	//  ]);
	const canUpdate = true;
	const defaultColumns: TableColumn<DeliveryRow>[] = [
		{
			label: translator(TRANSLATIONS.NAME),
			disableSorting: false,
			value: 'name',
			width: '20%',
			...(canUpdate && {
				component: tableLink(EVENTS_MODULE_PATHS.DELIVERIES.index),
			}),
		},
		columnDefinition(translator(TRANSLATIONS.SOURCE), 'eventSource', '14%'),
		columnDefinition(translator(TRANSLATIONS.EVENT), 'event', '14%'),
		columnDefinition(translator(TRANSLATIONS.DESTINATION), 'destination', '14%'),
		columnDefinition(translator(TRANSLATIONS.TOPIC), 'topic', '14%'),
		{
			label: translator(TRANSLATIONS.STATUS),
			disableSorting: true,
			component: (_v, rowData) => {
				return renderActiveState(rowData, translator);
			},
			value: 'status',
			width: '14%',
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

const deliveryDataToRows = (navigate: any, data: any[]): DeliveryRow[] => {
	return data.map((delivery: DeliverySchema) => ({
		uuid: delivery.id,
		name: delivery.name,
		description: delivery.description,
		eventSource: delivery.eventSource,
		event: delivery.event,
		destination: delivery.destinationName,
		topic: delivery.topic,
		isActive: delivery.isActive,
		navigate: () =>
			navigate(EVENTS_MODULE_PATHS.DELIVERIES.details, {
				deliveryId: delivery.id,
			}),
	}));
};

export default {
	urls: EVENTS_MODULE_PATHS.DELIVERIES,
	columnsConfig: deliveriesColumns,
	dataToRows: deliveryDataToRows,
	facade: deliveriesFacade,
	fetchHook: useDeliveries,
};
