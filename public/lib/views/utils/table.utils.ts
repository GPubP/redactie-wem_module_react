export function columnDefinition(
	label: string,
	value: string,
	width = '20%',
	disableSorting = true
): { label: string; disableSorting: boolean; value: string; width: string } {
	return {
		label,
		disableSorting,
		value,
		width,
	};
}
