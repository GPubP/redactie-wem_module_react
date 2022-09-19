export function sortAndDirectionToAPIQuery(sort: string, direction: number): string {
	if (!sort) {
		return '';
	}
	return direction >= 0 ? sort || '' : `-${sort}`;
}
