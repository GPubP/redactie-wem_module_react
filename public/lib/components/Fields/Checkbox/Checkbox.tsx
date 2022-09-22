/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Component } from 'react';

import './Checkbox.scss';

// Moved from MVP app to support multiple select dropdown

class Checkbox extends Component<any, any> {
	static defaultProps: { className: string };
	shouldComponentUpdate(nextProps: any) {
		return (
			nextProps.className !== this.props.className ||
			nextProps.checked !== this.props.checked ||
			nextProps.label !== this.props.label ||
			nextProps.disabled !== this.props.disabled
		);
	}
	_onChange = (e: any) => {
		!this.props.disabled &&
			this.props.onChange &&
			this.props.onChange(e.target.checked, this.props.name);
	};
	render() {
		const {
			className,
			name,
			checked,
			label,
			disabled,
			getIsPartiallyChecked,
			style = {},
		} = this.props;
		return (
			<div
				style={style}
				className={`wem-a-checkbox a-input__checkbox ${className} ${
					getIsPartiallyChecked && getIsPartiallyChecked() ? 'partially-checked' : ''
				} ${checked ? 'wem-a-checkbox--checked' : 'wem-a-checkbox--not-checked'} ${
					disabled ? 'wem-a-checkbox--disabled' : ''
				}`}
			>
				<input
					disabled={disabled}
					className="wem-a-checkbox__input"
					onChange={this._onChange}
					type="checkbox"
					id={`wem-checkbox-${name}`}
					name={name}
					checked={checked}
				/>
				<label className="wem-a-checkbox__label" htmlFor={`wem-checkbox-${name}`}>
					{label}
				</label>
			</div>
		);
	}
}

Checkbox.defaultProps = {
	className: '',
};

export default Checkbox;
