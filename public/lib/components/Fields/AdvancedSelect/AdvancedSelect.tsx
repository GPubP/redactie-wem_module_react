/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
import { filter, find } from 'lodash';
import React, { Component } from 'react';

import FlyoutMenu from '../../FlyoutMenu/FlyoutMenu';

import './AdvancedSelect.scss';

// Moved from MVP app to support multiple select dropdown

const SELECT_ALL = { key: 'all', value: '', label: 'Alle' };

class AdvancedSelect extends Component<any, any> {
	openCloseTogglerRef;

	constructor(props: any) {
		super(props);
		this.state = {
			open: false,
			outsideClickTriggered: false,
		};
		this.openCloseTogglerRef = React.createRef();
	}
	_toggleOpen = () => {
		if (!this.props.disabled) {
			this.setState({ open: !this.state.open });
		}
	};
	_onClose = () => {
		this._toggleOpen();

		this.props.onClose && this.props.onClose();
	};
	_onOutsideClick = () => {
		this.setState({ open: false, outsideClickTriggered: true });
	};
	_onSelect = (e: any) => {
		if (this.props.multiple) {
			this._onSelectMultiple(e.target.getAttribute('value'));
		} else {
			this._onSelectSingle(e.target.getAttribute('value'));
		}
	};
	_onSelectSingle = (value: any) => {
		const fullValue = find(this._options(), x => x.value === value);
		this._toggleOpen();
		this._onChange(value, fullValue);
	};
	_onSelectMultiple = (value: any) => {
		const fullValue = find(this._options(), x => x.value === value);
		if (!value) {
			this._onChange([value], fullValue);
		} else if (this.props.value && this.props.value.includes(value)) {
			this._onChange(
				filter(this.props.value, val => val !== value),
				fullValue
			);
		} else if (this.props.value) {
			this._onChange([...(this.props.value as string[]), value], fullValue);
		} else if (!this.props.value || value) {
			this._onChange([value], fullValue);
		}
	};
	_onChange = (value: any, fullValue: any) => {
		let newValue = value;
		if (this.props.multiple) {
			newValue = filter(newValue, nv => nv !== '');
			newValue = newValue.length ? newValue : [''];
		}
		this.props.onChange && this.props.onChange(newValue, this.props.name, fullValue);
	};
	_getValue = () => {
		if (this.props.multiple) {
			const selectedOptions = filter(this.props.options, o =>
				(this.props.value || []).includes(o && o.value)
			);
			return selectedOptions.length > 0
				? selectedOptions.map(so => so.label).join(', ')
				: this.props.showAsText
				? ''
				: this.props.placeholder;
		} else {
			const selectedOption = find(this.props.options, o => o.value === this.props.value);
			return (
				(selectedOption && selectedOption.label) ||
				this.props.value ||
				(this.props.showAsText ? '' : this.props.placeholder)
			);
		}
	};
	_options = () => {
		return filter(this.props.options, x => !!x && !x.hideOption);
	};
	render() {
		const calculatedValue = this._getValue();
		const nothingSelected =
			calculatedValue === SELECT_ALL.label || calculatedValue === this.props.placeholder;
		return (
			<div
				className={`wem-a-adv-select a-input has-icon-right wem-a-select ${
					this.props.className
				} ${this.props.required ? 'is-required' : ''} ${
					this.props.disabled ? 'wem-a-adv-select--disabled' : ''
				}`}
			>
				<label className={`a-input__label`}>{this.props.label}</label>
				{this.props.showAsText ? (
					<div className="wem-a-readfield wem-a-readfield--full-height">
						{calculatedValue}
					</div>
				) : (
					<div
						ref={this.openCloseTogglerRef as any}
						onClick={this.props.onClick ? this.props.onClick : this._toggleOpen}
						className="a-input__wrapper"
					>
						<div
							tabIndex={0}
							title={calculatedValue}
							className={`wem-a-adv-select__input ${
								this.props.noTruncate
									? 'wem-a-adv-select__input--dynamic'
									: 'u-text-truncate'
							} ${nothingSelected ? 'wem-a-adv-select__input--lighter' : ''}`}
						>
							{calculatedValue}
						</div>
						{this.props.disabled ? null : <span className="fa fa-angle-down" />}
					</div>
				)}
				<FlyoutMenu
					name={this.props.name}
					topContent={this.props.topContent}
					disableSearch={this.props.disableSearch}
					checkboxes={this.props.multiple}
					selection={this.props.value}
					isOpen={this.state.open}
					position={this.props.position}
					onClose={this._onClose}
					outsideClickableElement={this.openCloseTogglerRef.current}
					onOutsideClick={this._onOutsideClick}
					options={this._options()}
					onSelect={this._onSelect}
					onSearchInput={this.props.onSearchChange}
					isFetchingSearchInputResults={this.props.isFetchingSearchInputResults}
					sort={this.props.sort}
					sortFunction={this.props.sortFunction}
				/>
			</div>
		);
	}
}

(AdvancedSelect as any).defaultProps = {
	className: '',
	placeholder: 'Selecteer',
};

export default AdvancedSelect;
