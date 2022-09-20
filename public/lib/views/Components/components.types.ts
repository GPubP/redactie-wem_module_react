export interface BasicRow {
	uuid: string;
	name: string;
	description: string;
	navigate: (userUuid: string) => void;
}

export interface FormActionsProps {
	onSubmit?: () => void;
	onDelete?: () => void;
	onCancel?: () => void;
	submitLabel?: string;
	isLoading: boolean;
}
