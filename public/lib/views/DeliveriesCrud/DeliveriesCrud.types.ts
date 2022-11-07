import { ChangeHandlerFn } from '../../events.types';
import {
	DeliverySchema,
	DeliveryValidationType,
} from '../../services/deliveries/deliveries.service.types';
import { DestinationSchema } from '../../services/destinations/destinations.service.types';
import { EventOptionSchema } from '../../services/events/events.service.types';
import { TopicOptionSchema } from '../../services/topics/topics.service.types';

export interface DeliveriesCrudProps {
	match: {
		params: {
			deliveryId?: string;
		};
	};
}

export interface DeliveriesFormProps {
	canUpdate: boolean;
	canDelete: boolean;
	activeTab?: string;
	data: DeliverySchema | undefined;
	onChange: ChangeHandlerFn;
	validations: DeliveryValidationType | undefined;
	isLoading: boolean;
	changeActiveState: () => void;
	onDelete: () => void;
	destinationsOptions: DestinationSchema[];
	isFetchingDestinations: boolean;
	eventOptions: EventOptionSchema[];
	isFetchingEvents: boolean;
	topicOptions: TopicOptionSchema[];
	isFetchingTopics: boolean;
	fetchingTopicsError: boolean;
	onAddTopic: (name: string, onSuccess: () => void, onError: () => void) => void;
	isCreatingTopic: boolean;
	tenantId: string;
}
