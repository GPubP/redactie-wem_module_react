import { ValidationProps } from '../../events.types';
import { ValidationState } from '../validation.helpers';

export interface TopicOptionSchema {
	name: string;
	namespace: string | undefined;
}

export interface TopicOptionValidationSchema extends ValidationProps {
	feedback: TopicOptionValidationType;
}

export interface TopicOptionValidationType {
	name: ValidationState;
	namespace: ValidationState;
}
