import translationsConnector from '../connectors/translations';

const tKey = translationsConnector.core.tKey;

const TRANSLATIONS = Object.freeze({
	CREATED: tKey('CREATED', 'Aangemaakt'),
	SAVE_AND_CONTINUE: tKey('SAVE_AND_CONTINUE', 'Bewaar en ga verder'),
	UPDATED: tKey('UPDATED', 'Bewaard'),
	EVENTS: tKey('EVENTS', 'Events'),
	DESTINATIONS: tKey('DESTINATIONS', 'Bestemmingen'),
	DESTINATION_NEW: tKey('DESTINATION_NEW', 'Nieuwe bestemming aanmaken'),
	DELIVERY_NEW: tKey('DELIVERY_NEW', 'Nieuwe aflevering aanmaken'),
	DESTINATION_CREATED: tKey('DESTINATION_CREATED', 'Bestemming werd successvol aangemaakt.'),
	DESTINATION_UPDATED: tKey('DESTINATION_UPDATED', 'Bestemming werd successvol bewaard.'),
	DESTINATION_NAME_HELP: tKey(
		'DESTINATION_NAME_HELP',
		'Geef deze bestemming een korte en duidelijke naam.'
	),
	DESTINATION_DESCRIPTION_HELP: tKey(
		'DESTINATION_DESCRIPTION_HELP',
		'Geef deze bestemming een beschrijving voor in het overzicht.'
	),
	DELIVERY_NAME_HELP: tKey(
		'DESTINATION_NAME_HELP',
		'Geef deze aflevering een korte en duidelijke naam.'
	),
	DELIVERY_DESCRIPTION_HELP: tKey(
		'DESTINATION_DESCRIPTION_HELP',
		'Geef deze aflevering een beschrijving voor in het overzicht.'
	),
	DELIVERY_CREATED: tKey('DELIVERY_CREATED', 'Aflevering werd successvol aangemaakt.'),
	DELIVERIES: tKey('DELIVERIES', 'Afleveringen'),
	NEW_BUTTON: tKey('NEW_BUTTON', 'Nieuw aanmaken'),
	EMPTY_TABLE: tKey('NO_DESTINATIONS', 'Geen data gevonden'),
	LOAD_TABLE: tKey('LOAD_DESTINATIONS', 'Data ophalen'),
	NAME: tKey('NAME', 'Naam'),
	DESCRIPTION: tKey('DESCRIPTION', 'Beschrijving'),
	KEY: tKey('KEY', 'Sleutel'),
	NAMESPACE: tKey('NAMESPACE', 'Naamruimte'),
	SOURCE: tKey('SOURCE', 'Bron'),
	EVENT: tKey('EVENT', 'Event'),
	DESTINATION: tKey('DESTINATION', 'Bestemming'),
	TOPIC: tKey('TOPIC', 'Topic'),
	STATUS: tKey('STATUS', 'Status'),
	ACTIVE: tKey('SOURCE', 'Actief'),
	NOT_ACTIVE: tKey('NOT_ACTIVE', 'Niet actief'),
	TO_EDIT: tKey('TO_EDIT', 'bewerken'),
	OWNER_KEY: tKey('OWNER_KEY', 'Owner key'),
	OWNER_KEY_HELP: tKey(
		'OWNER_KEY_HELP',
		'Geef de owner key van de bestemming op om een namespace te kunnen selecteren.'
	),
	NAMESPACE_HELP: tKey(
		'NAMESPACE_HELP',
		'Kies een naamruimte (namespace) binnen deze bestemming.'
	),
	REQUIRED: tKey('REQUIRED', 'Dit veld is verplicht'),
} as const);

export { TRANSLATIONS };
