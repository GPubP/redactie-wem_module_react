import Core from '@redactie/redactie-core';
import { filter, first } from 'rxjs/operators';

import translationsConnector from './connectors/translations';
import { translations } from './i18next';
import { MODULE_TRANSLATIONS } from './i18next/translations.const';
import { HelloWorld } from './views/HelloWorld';

translations.moduleTranslationsLoaded
	.pipe(
		filter(moduleTranslationsLoaded => !!moduleTranslationsLoaded),
		first()
	)
	.subscribe(() => {
		Core.routes.register({
			path: '/demo',
			component: HelloWorld,
			navigation: {
				label: translationsConnector.moduleTranslate(
					MODULE_TRANSLATIONS['HELLOWORLD_MENU-LABEL']
				),
			},
		});
	});
