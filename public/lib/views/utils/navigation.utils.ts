import { Breadcrumb, BreadcrumbOptions } from '@redactie/redactie-core';
import { ContextHeaderTab, ContextHeaderTabLinkProps } from '@redactie/utils';
import { Link } from 'react-router-dom';

import { EVENT_DELIVERY_INPUT_TAB, EVENT_DELIVERY_SETTINGS_TAB } from '../../events.const';
import { DeliveryValidationType } from '../../services/deliveries/deliveries.service.types';
import { ValidationState } from '../../services/validation.helpers';

export function breadcrumbsOptions(
	pathGenerator: (a: string) => string,
	breadcrumbs: Breadcrumb[] = []
): BreadcrumbOptions {
	return {
		excludePaths: ['/', '/:tenantId'],
		extraBreadcrumbs: [
			{
				name: 'Home',
				target: pathGenerator('/'),
			},
			...breadcrumbs,
		],
	};
}

export interface ExtendedContextHeaderTabLinkProps extends ContextHeaderTabLinkProps {
	className: string;
}

export function linkProps(
	props: ExtendedContextHeaderTabLinkProps,
	validationFeedback: DeliveryValidationType | undefined,
	tabs: ContextHeaderTab[]
): any {
	if (!validationFeedback) {
		return null;
	}

	const hasSettingsErrors =
		props.href === EVENT_DELIVERY_SETTINGS_TAB &&
		(validationFeedback?.name !== ValidationState.Ok ||
			validationFeedback?.description !== ValidationState.Ok);
	const hasInputErrors =
		props.href === EVENT_DELIVERY_INPUT_TAB &&
		(validationFeedback?.event !== ValidationState.Ok ||
			validationFeedback?.eventDescription !== ValidationState.Ok ||
			validationFeedback?.eventVersion !== ValidationState.Ok);

	return {
		...props,
		className: `${tabs.find(t => t.target === props.href)?.active ? 'is-active' : ''} ${
			hasSettingsErrors || hasInputErrors ? 'has-error' : ''
		} u-relative`,
		to: props.href,
		component: Link,
	};
}
