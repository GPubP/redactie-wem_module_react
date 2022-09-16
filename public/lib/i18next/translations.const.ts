import translationsConnector from '../connectors/translations';

const tKey = translationsConnector.core.tKey;

const TRANSLATIONS = Object.freeze({
	EVENTS: tKey('EVENTS', 'Events'),
	DESTINATIONS: tKey('DESTINATIONS', 'Bestemmingen'),
	DELIVERIES: tKey('DELIVERIES', 'Afleveringen'),
	NEW_BUTTON: tKey('NEW_BUTTON', 'Nieuw aanmaken'),
	NO_DESTINATIONS: tKey('NO_DESTINATIONS', 'Geen bestemmingen gevonden'),
	LOAD_DESTINATIONS: tKey('LOAD_DESTINATIONS', 'Bestemmingen ophalen'),
	NAME: tKey('NAME', 'Naam'),
	KEY: tKey('KEY', 'Sleutel'),
	NAMESPACE: tKey('NAMESPACE', 'Naamruimte'),
} as const);

export { TRANSLATIONS };
