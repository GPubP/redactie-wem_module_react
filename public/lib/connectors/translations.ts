import Core from '@redactie/redactie-core';
import { TranslateFunc, TranslationsAPI } from '@redactie/translations-module';

import { MODULE_NAME } from '../boilerplate.const';

class TranslationsConnector {
	static apiName = 'translations-module';

	private api: TranslationsAPI;

	public get core(): TranslationsAPI['core'] {
		return this.api.core;
	}

	public get modules(): TranslationsAPI['modules'] {
		return this.api.modules;
	}

	public get CORE_TRANSLATIONS(): TranslationsAPI['core']['CORE_TRANSLATIONS'] {
		return this.core.CORE_TRANSLATIONS;
	}

	constructor() {
		this.api = Core.modules.getModuleAPI<TranslationsAPI>(TranslationsConnector.apiName);
	}

	public useCoreTranslation(): [TranslateFunc] {
		return this.core?.useTranslation
			? this.core.useTranslation('nl_BE')
			: [() => 'TRANSLATIONS MODULE ERROR'];
	}

	public useModuleTranslation(): [TranslateFunc] {
		return this.modules?.useTranslation
			? this.modules.useTranslation(MODULE_NAME, 'nl_BE') // TODO: change module name here
			: [() => 'TRANSLATIONS MODULE ERROR'];
	}

	public moduleTranslate(key: string): string {
		return this.modules?.translate
			? this.modules.translate(MODULE_NAME, 'nl_BE', key) // TODO: change module name here
			: 'TRANSLATIONS MODULE ERROR';
	}
}

const translationsConnector = new TranslationsConnector();

export default translationsConnector;
