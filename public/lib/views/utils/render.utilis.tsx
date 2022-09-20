import React, { ReactElement } from 'react';

import { TRANSLATIONS } from '../../i18next/translations.const';

export function renderActiveState(
	data: { active: boolean },
	translator: (a: string) => string
): ReactElement {
	return data.active ? (
		<span className="u-text-success">{translator(TRANSLATIONS.ACTIVE)}</span>
	) : (
		<span className="u-text-danger">{translator(TRANSLATIONS.NOT_ACTIVE)}</span>
	);
}
