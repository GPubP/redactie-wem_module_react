import { BehaviorSubject } from 'rxjs';

import translationFile from '../../assets/i18n/locales/template.json';
import translationsConnector from '../connectors/translations';
import { MODULE_NAME } from '../events.const';

export class Translations {
	public moduleTranslationsLoaded: BehaviorSubject<boolean> = new BehaviorSubject(
		false as boolean
	);

	public registerTranslations(): void {
		translationsConnector.modules.addTranslation(MODULE_NAME, 'nl_BE', translationFile);

		// This timeout is needed to give the translations connector time to process the new translations (store cycle)
		setTimeout(() => this.moduleTranslationsLoaded.next(true));
	}
}

export const translations = new Translations();
