export interface TextareaWithLineNumbersProps {
	label: string;
	name: string;
	value: string;
	disabled?: boolean;
	readOnly?: boolean;
	onChange: (value: string, field: string) => void;
}
