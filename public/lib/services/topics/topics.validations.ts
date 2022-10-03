import { validateRequired, ValidationState } from '../validation.helpers';

import {
	TopicOptionSchema,
	TopicValidationSchema,
	TopicValidationType,
} from './topics.service.types';

const validateTopicName = (name: string): ValidationState => {
	// eslint-disable-next-line no-useless-escape
	return /^[A-Za-z0-9-\.]+$/.test(name) ? ValidationState.Ok : ValidationState.Incorrect;
};

export function validateTopic(body: TopicOptionSchema | undefined): TopicValidationSchema {
	const feedback = {
		name: !body?.name
			? validateRequired('name', body?.name, ['name'])
			: validateTopicName(body?.name ?? ''),
	};
	let valid = true;
	Object.keys(feedback).forEach(
		fk => (valid = valid && feedback[fk as keyof TopicValidationType] === ValidationState.Ok)
	);
	return {
		valid,
		feedback,
	};
}
