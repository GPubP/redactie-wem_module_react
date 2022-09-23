import React, { ReactElement } from 'react';

import { TRANSLATIONS } from '../../i18next/translations.const';

export function renderActiveState(
	data: { isActive: boolean },
	translator: (a: string) => string
): ReactElement {
	return data.isActive ? (
		<span className="u-text-success">{translator(TRANSLATIONS.ACTIVE)}</span>
	) : (
		<span className="u-text-danger">{translator(TRANSLATIONS.NOT_ACTIVE)}</span>
	);
}
