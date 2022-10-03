import { ValidationProps } from '../../events.types';
import { ModelCreateResponseSchema } from '../services.types';
import { ValidationState } from '../validation.helpers';

export interface TopicOptionSchema {
	name: string;
}

export interface TopicCreateResponseSchema extends ModelCreateResponseSchema {
	name: string;
}

export interface TopicValidationSchema extends ValidationProps {
	feedback: TopicValidationType;
}

export interface TopicValidationType {
	name: ValidationState;
}
