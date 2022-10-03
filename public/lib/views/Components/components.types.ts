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
	extraActions?: JSX.Element[];
	submitLabel?: string;
	isLoading: boolean;
}
