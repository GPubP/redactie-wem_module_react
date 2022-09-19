import { Breadcrumb, BreadcrumbOptions } from '@redactie/redactie-core';
import { ContextHeaderTabLinkProps } from '@redactie/utils';
import { Link } from 'react-router-dom';

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

export function linkProps(props: ContextHeaderTabLinkProps): any {
	return {
		...props,
		to: props.href,
		component: Link,
	};
}