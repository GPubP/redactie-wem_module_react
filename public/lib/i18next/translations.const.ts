import translationsConnector from '../connectors/translations';

const tKey = translationsConnector.core.tKey;

const TRANSLATIONS = Object.freeze({
	EVENTS: tKey('EVENTS', 'Events'),
	DESTINATIONS: tKey('DESTINATIONS', 'Bestemmingen'),
	DELIVERIES: tKey('DELIVERIES', 'Afleveringen'),
	NEW_BUTTON: tKey('NEW_BUTTON', 'Nieuw aanmaken'),
	EMPTY_TABLE: tKey('NO_DESTINATIONS', 'Geen data gevonden'),
	LOAD_TABLE: tKey('LOAD_DESTINATIONS', 'Data ophalen'),
	NAME: tKey('NAME', 'Naam'),
	KEY: tKey('KEY', 'Sleutel'),
	NAMESPACE: tKey('NAMESPACE', 'Naamruimte'),
	SOURCE: tKey('SOURCE', 'Bron'),
	EVENT: tKey('EVENT', 'Event'),
	DESTINATION: tKey('DESTINATION', 'Bestemming'),
	TOPIC: tKey('TOPIC', 'Topic'),
	STATUS: tKey('STATUS', 'Status'),
	ACTIVE: tKey('SOURCE', 'Actief'),
	NOT_ACTIVE: tKey('SOURCE', 'Niet actief'),
} as const);

export { TRANSLATIONS };
