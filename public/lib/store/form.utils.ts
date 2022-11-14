import { BaseEntityQuery, BaseEntityStore } from '@redactie/utils';

import { ValidationProps } from '../events.types';

// "Abstract" class for common forms behavior
export class FormUtils {
	private store: BaseEntityStore<any>;
	private query: BaseEntityQuery<any>;
	private service: any;
	private populate: () => any;
	private validator: (a: any) => ValidationProps;
	private mapper?: (a: any) => any;

	constructor(
		store: BaseEntityStore<any>,
		query: BaseEntityQuery<any>,
		service: any,
		populator: () => any,
		validator: (a: any) => ValidationProps,
		mapper?: (a: any) => any
	) {
		this.store = store;
		this.populate = populator;
		this.service = service;
		this.query = query;
		this.validator = validator;
		this.mapper = mapper;
	}

	public updateField(value: string | boolean, field: string): void {
		this.store.update((state: any) => ({
			formData: {
				...(state.formData || this.populate()),
				[field]: value,
			},
		}));
	}

	public resetForm(): void {
		this.store.setIsCreating(false);
		this.store.setIsFetchingOne(false);
		this.store.update(() => ({
			formData: this.populate(),
			formValidation: undefined,
		}));
	}

	public preSubmit(body: any): ValidationProps {
		this.store.setIsCreating(true);
		const validation = this.validator(body);
		this.store.update(() => ({
			formValidation: validation,
		}));
		return validation;
	}

	public validate(body: any): ValidationProps {
		const validation = this.validator(body);
		this.store.update(() => ({
			formValidation: validation,
		}));
		return validation;
	}

	public async fetchOne(id: string): Promise<any> {
		const { isFetchingOne } = this.query.getValue();
		if (isFetchingOne) {
			return;
		}
		this.store.setIsFetchingOne(true);
		return this.service.fetchOne(id).then((response: any) => {
			this.store.update(() => ({
				formData: this.mapper ? this.mapper(response) : { ...response },
			}));
			this.store.setIsFetchingOne(false);
			return response;
		});
	}
}
