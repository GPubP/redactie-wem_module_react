export function sortAndDirectionToAPIQuery(sort: string, direction: number): string {
	return direction >= 0 ? sort : `-${sort}`;
}
