import { useNavigate } from '@redactie/utils';

import { MODULE_PATHS } from '../../events.const';

const useHomeBreadcrumb = (): { name: string; target: string } => {
	const { generatePath } = useNavigate();

	return {
		name: 'Home',
		target: generatePath(MODULE_PATHS.dashboardRoot),
	};
};

export default useHomeBreadcrumb;
