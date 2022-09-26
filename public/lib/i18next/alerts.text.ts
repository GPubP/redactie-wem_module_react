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
	DELIVERIES: {
		createOk: {
			title: translator(TRANSLATIONS.CREATED),
			message: translator(TRANSLATIONS.DELIVERY_CREATED),
		},
		updateOk: {
			title: translator(TRANSLATIONS.UPDATED),
			message: translator(TRANSLATIONS.DELIVERY_UPDATED),
		},
		deleteOk: {
			title: translator(TRANSLATIONS.DELETED),
			message: translator(TRANSLATIONS.DELIVERY_DELETED),
		},
		eventDoesNotExist: {
			title: translator(TRANSLATIONS.EVENT_DOES_NOT_EXIST_TITLE),
			message: translator(TRANSLATIONS.EVENT_DOES_NOT_EXIST_MESSAGE),
		},
	},
});
