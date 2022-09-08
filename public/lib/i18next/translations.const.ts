import translationsConnector from '../connectors/translations';

const tKey = translationsConnector.core.tKey;

// TODO: Place all your copy here
const MODULE_TRANSLATIONS = Object.freeze({
	HELLOWORLD_TITLE: tKey('BOILERPLATE_HELLOWORLD_TITLE', 'Hello World!'),
	'HELLOWORLD_MENU-LABEL': tKey('HELLOWORLD_MENU-LABEL', 'Demo'),
} as const);

export { MODULE_TRANSLATIONS };
