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
	DESTINATION_DELETED: tKey('DESTINATION_DELETED', 'Bestemming werd successvol verwijderd.'),
	DESTINATION_CAN_DELETE: tKey(
		'DESTINATION_CAN_DELETE',
		'Opgelet: indien je deze bestemming verwijdert kan deze niet meer gebruikt worden door afleveringen.'
	),
	DESTINATION_CANNOT_DELETE: tKey(
		'DESTINATION_CANNOT_DELETE',
		'Deze bestemming wordt gebruikt in :usedInCount: afleveringen waardoor deze niet verwijderd kan worden. '
	),
	DELETE: tKey('DELETE', 'Verwijderen'),
	CANCEL: tKey('CANCEL', 'Annuleer'),
	CREATE: tKey('CREATE', 'Aanmaken'),
	DELETED: tKey('DELETED', 'Verwijderd'),
	DESTINATION_NAME_HELP: tKey(
		'DESTINATION_NAME_HELP',
		'Geef deze bestemming een korte en duidelijke naam.'
	),
	DESTINATION_DESCRIPTION_HELP: tKey(
		'DESTINATION_DESCRIPTION_HELP',
		'Geef deze bestemming een beschrijving voor in het overzicht.'
	),
	DELIVERY_NAME_HELP: tKey(
		'DELIVERY_NAME_HELP',
		'Geef deze registratie een korte en duidelijke naam.'
	),
	DELIVERY_DESCRIPTION_HELP: tKey(
		'DELIVERY_DESCRIPTION_HELP',
		'Geef deze registratie een beschrijving voor in het overzicht.'
	),
	DELIVERY_EVENT_HELP: tKey('DELIVERY_EVENT_HELP', 'Selecteer het event.'),
	DELIVERY_DESTINATION_HELP: tKey(
		'DELIVERY_DESTINATION_HELP',
		'Selecteer de bestemming voor dit event.'
	),
	DELIVERY_TOPIC_HELP: tKey('DELIVERY_TOPIC_HELP', 'Selecteer een topic voor dit event.'),
	DELIVERY_TOPIC_CREATE: tKey('DELIVERY_TOPIC_CREATE', 'Nieuw topic toevoegen'),
	DELIVERY_TOPIC_CREATE_ERROR_MESSAGE: tKey(
		'DELIVERY_TOPIC_CREATE_ERROR_MESSAGE',
		"Alleen letters, cijfers en '-', '.' tekens zijn toegestaan."
	),
	DELIVERY_CREATED: tKey('DELIVERY_CREATED', 'Aflevering werd successvol aangemaakt.'),
	DELIVERY_UPDATED: tKey('DELIVERY_UPDATED', 'Aflevering werd successvol bewaard.'),
	DELIVERY_DELETED: tKey('DELIVERY_DELETED', 'Aflevering werd successvol verwijderd.'),
	DELIVERY_SEND_TEST_EVENT: tKey('DELIVERY_SEND_TEST_EVENT', 'Vestuur event'),
	DELIVERY_TEST_EVENT_SENT_TITLE: tKey('DELIVERY_TEST_EVENT_SENT_TITLE', 'Event vestuurd'),
	DELIVERY_TEST_EVENT_SENT_MESSAGE: tKey(
		'DELIVERY_TEST_EVENT_SENT_MESSAGE',
		'Het test event werd succesvol afgeleverd aan de event handler op :namespace:.:topic:'
	),
	DELIVERIES: tKey('DELIVERIES', 'Afleveringen'),
	NEW_BUTTON: tKey('NEW_BUTTON', 'Nieuw aanmaken'),
	EMPTY_TABLE: tKey('NO_DESTINATIONS', 'Geen data gevonden'),
	LOAD_TABLE: tKey('LOAD_DESTINATIONS', 'Data ophalen'),
	NAME: tKey('NAME', 'Naam'),
	DESCRIPTION: tKey('DESCRIPTION', 'Beschrijving'),
	KEY: tKey('KEY', 'Sleutel'),
	NAMESPACE: tKey('NAMESPACE', 'Naamruimte'),
	SOURCE: tKey('SOURCE', 'Bron'),
	VERSION: tKey('VERSION', 'Versie'),
	EVENT: tKey('EVENT', 'Event'),
	DESTINATION: tKey('DESTINATION', 'Bestemming'),
	TOPIC: tKey('TOPIC', 'Topic'),
	STATUS: tKey('STATUS', 'Status'),
	ACTIVE: tKey('ACTIVE', 'Actief'),
	ACTIVATE: tKey('ACTIVATE', 'Activeren'),
	DESACTIVATE: tKey('DESACTIVATE', 'Deactiveren'),
	SCHEMA: tKey('SCHEMA', 'schema'),
	DELIVERY_ACTIVE_HELP: tKey(
		'DELIVERY_ACTIVE_HELP',
		'Dit event is actief. Je kan het deactiveren of verwijderen.'
	),
	DELIVERY_NOT_ACTIVE_HELP: tKey(
		'DELIVERY_NOT_ACTIVE_HELP',
		'Dit event is niet actief. Je kan het activeren of verwijderen.'
	),
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
	EVENT_DOES_NOT_EXIST_TITLE: tKey('EVENT_DOES_NOT_EXIST_TITLE', 'Waarschuwing'),
	EVENT_DOES_NOT_EXIST_MESSAGE: tKey(
		'EVENT_DOES_NOT_EXIST_MESSAGE',
		'Het gekozen event bestaat niet en is mogelijks verwijderd. Kies een ander event.'
	),
	DELETE_MODAL_TITLE: tKey('DELETE_MODAL_TITLE', 'Verwijderen?'),
	DELETE_MODAL_DELIVERY_BODY: tKey(
		'DELETE_MODAL_DELIVERY_BODY',
		'Ben je zeker dat je deze aflevering wil verwijderen? Dit kan niet ongedaan gemaakt worden.'
	),
	DELETE_MODAL_DESTINATION_BODY: tKey(
		'DELETE_MODAL_EVENT_BODY',
		'Ben je zeker dat je deze bestemming wil verwijderen? Dit kan niet ongedaan gemaakt worden.'
	),
	CREATE_TOPIC_MODAL_TITLE: tKey('CREATE_TOPIC_MODAL_TITLE', 'Topic Aanmaken'),
	CREATE_TOPIC_MODAL_BODY: tKey('CREATE_TOPIC_MODAL_BODY', 'Je maakt een topic aan binnen '),
	DELIVERY_SCHEMA_MODAL_TITLE: tKey(
		'DELIVERY_SCHEMA_MODAL_TITLE',
		'Aflevering filter JSON schema'
	),
	DELIVERY_FILTER_FIELD_DESCRIPTION: tKey('DELIVERY_FILTER_FIELD_DESCRIPTION', 'JSON code met'),
	DELIVERY_FILTER_FIELD_LABEL: tKey('DELIVERY_FILTER_FIELD_LABEL', 'Filter'),
	DELIVERY_FILTER_SCHEMA_VALIDATION_MESSAGE: tKey(
		'DELIVERY_FILTER_SCHEMA_VALIDATION_MESSAGE',
		'Het opgegeven filter is niet geldig volgens het schema'
	),
	TOPIC_CREATED: tKey('TOPIC_CREATED', 'Topic werd successvol aangemaakt.'),
} as const);

export { TRANSLATIONS };
