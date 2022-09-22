/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Component } from 'react';

import './Tooltip.scss';

// Moved from MVP app to support multiple select dropdown

class Tooltip extends Component<any, any> {
	hoverRef: React.RefObject<unknown>;
	static defaultProps: { location: string };
	constructor(props: any) {
		super(props);
		this.hoverRef = React.createRef();
	}
	state = { show: false };
	_show = () => {
		this.setState({ show: true && this.props.show });
	};
	_hide = () => {
		this.setState({ show: false });
	};
	componentDidMount() {
		(this.hoverRef as any).current.onmouseenter = this._show;
		(this.hoverRef as any).current.onmouseleave = this._hide;
	}
	render() {
		return (
			<div
				className={`wem-a-tooltip ${this.state.show ? '' : 'wem-a-tooltip--hidden'} ${
					this.props.className
				}`}
			>
				<div
					style={{
						left: `${this.props.left}px`,
						top: `${this.props.top}px`,
						width: `${this.props.width}px`,
					}}
					className={`a-tooltip a-tooltip--primary a-tooltip--${this.props.location}`}
				>
					{this.props.tip}
				</div>
				<div ref={this.hoverRef as any} className="wem-a-tooltip__hoverzone">
					{this.props.children}
				</div>
			</div>
		);
	}
}
Tooltip.defaultProps = {
	location: 'right',
};

export default Tooltip;
