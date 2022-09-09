export interface DestinationsOverviewTableRow {
	uuid: string;
	name: string;
	description: string;
	namespace: string;
	ownerKey: string;
	navigate: (userUuid: string) => void;
}
