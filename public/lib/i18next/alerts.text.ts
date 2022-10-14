import { TRANSLATIONS } from './translations.const';

export const ALERT_TEXTS = (translator: (a: string) => string, data?: any): any => ({
	DESTINATIONS: {
		createOk: {
			title: translator(TRANSLATIONS.CREATED),
			message: translator(TRANSLATIONS.DESTINATION_CREATED),
		},
		updateOk: {
			title: translator(TRANSLATIONS.UPDATED),
			message: translator(TRANSLATIONS.DESTINATION_UPDATED),
		},
		deleteOk: {
			title: translator(TRANSLATIONS.DELETED),
			message: translator(TRANSLATIONS.DESTINATION_DELETED),
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
		testEventOk: {
			title: translator(TRANSLATIONS.DELIVERY_TEST_EVENT_SENT_TITLE),
			message: translator(TRANSLATIONS.DELIVERY_TEST_EVENT_SENT_MESSAGE)
				?.replace(':namespace:', data?.namespace)
				?.replace(':topic:', data?.topic),
		},
		testEventError: {
			title: translator(TRANSLATIONS.DELIVERY_TEST_EVENT_SEND_ERROR_TITLE),
			message: translator(TRANSLATIONS.DELIVERY_TEST_EVENT_SENT_MESSAGE_FAILED),
		},
	},
	TOPICS: {
		createOk: {
			title: translator(TRANSLATIONS.CREATED),
			message: translator(TRANSLATIONS.TOPIC_CREATED),
		},
	},
});
