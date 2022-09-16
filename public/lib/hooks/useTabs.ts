import { ContextHeaderTab } from '@redactie/utils';
import { useMemo } from 'react';

const useTabs = (
	tabs: ContextHeaderTab[],
	pathGenerator: (a: string) => string,
	translator: (a: string) => string,
	pathname: string
): ContextHeaderTab[] => {
	const activeTabs = useMemo(() => {
		return tabs.map(tab => ({
			...tab,
			name: translator(tab.name),
			target: `${pathGenerator(tab.target)}`,
			active: pathname.includes(tab.target),
		}));
	}, [pathname, pathGenerator, tabs, translator]);
	return activeTabs;
};

export default useTabs;
