import { TRANSLATIONS } from './translations.const';

export const ALERT_TEXTS = (translator: (a: string) => string): any => ({
	DESTINATIONS: {
		createOk: {
			title: translator(TRANSLATIONS.CREATED),
			message: translator(TRANSLATIONS.DESTINATION_CREATED),
		},
		updateOk: {
			title: translator(TRANSLATIONS.UPDATED),
			message: translator(TRANSLATIONS.DESTINATION_UPDATED),
		},
	},
});
