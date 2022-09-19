export interface BasicRow {
	uuid: string;
	name: string;
	description: string;
	navigate: (userUuid: string) => void;
}
