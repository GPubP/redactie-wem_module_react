/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
// eslint-disable-next-line import/no-unresolved
import { Spinner } from '@acpaas-ui/react-components';
import { compact, filter, get, sortBy, take } from 'lodash';
import React, { Component } from 'react';
import {
	SortableContainer as sortableContainer,
	SortableElement as sortableElement,
	SortableHandle as sortableHandle,
} from 'react-sortable-hoc';

import Checkbox from '../Fields/Checkbox/Checkbox';
import Tooltip from '../Tooltip/Tooltip';

import './FlyoutMenu.scss';

// Moved from MVP app to support multiple select dropdown

const EMPTY_OPTION = { label: 'Geen', value: 'none', id: 'none' };

const MAX_OPTIONS_RENDERED = 500;

export const SortableContainer = sortableContainer(({ children }: { children: any }) => {
	return <ul className="m-selectable-list m-selectable-list--no-border">{children}</ul>;
});

const DragHandle = sortableHandle(() => (
	<i className="fa fa-bars wem-m-flyout-menu__sort-handle" />
));

export const SortableItem = sortableElement(({ value }: { value: any }) => (
	<li className="wem-m-flyout-menu__sortable">
		<DragHandle />
		{value}
	</li>
));

class FlyoutMenu extends Component<any, any> {
	searchInputRef: React.RefObject<unknown>;
	flyoutWrapperRef: React.RefObject<unknown>;
	static defaultProps: { options: never[]; scrollable: boolean; name: string };
	constructor(props: any) {
		super(props);
		this.state = { search: '', contentStyle: {} };
		this.searchInputRef = React.createRef();
		this.flyoutWrapperRef = React.createRef();
		this._handleFlyoutContentOutsideClick = this._handleFlyoutContentOutsideClick.bind(this);
	}
	componentDidMount() {
		if (this.props.onOutsideClick) {
			window.addEventListener('mousedown', this._handleFlyoutContentOutsideClick);
		}
	}
	componentDidUpdate(prevProps: any) {
		if (prevProps.isOpen && !this.props.isOpen) {
			this.setState({ search: '' });
		} else if (!prevProps.isOpen && this.props.isOpen) {
			setTimeout(() => {
				this.searchInputRef.current && (this.searchInputRef as any).current.focus();
			}, 100);
		}
	}
	componentWillUnmount() {
		window.removeEventListener('mousedown', this._handleFlyoutContentOutsideClick);
	}
	_handleFlyoutContentOutsideClick = (e: any) => {
		if (
			this.props.isOpen &&
			this.flyoutWrapperRef.current &&
			!(this.flyoutWrapperRef as any).current.contains(e.target) &&
			((this.props.outsideClickableElement &&
				!this.props.outsideClickableElement.contains(e.target)) ||
				!this.props.outsideClickableElement)
		) {
			this.props.onOutsideClick && this.props.onOutsideClick();
		}
	};
	_search = (e: any) => {
		this.props.onSearchInput && this.props.onSearchInput(e.target.value);
		this.setState({ search: e.target.value });
	};
	_select = (e: any, option: any) => {
		e.preventDefault();
		if (option.disabled) {
			return;
		}
		while (!e.target.classList.contains('m-selectable-list__item')) {
			e.target = e.target.parentNode;
		}
		this.props.onSelect(e);
	};

	_renderOption = (option: any, selection: any) => (
		<span
			{...{ value: option.value }}
			className={`m-selectable-list__item wem-m-flyout-menu__select-item ${
				option.disabled ? 'disabled' : ''
			}`}
			onClick={e => this._select(e, option)}
		>
			{this.props.checkboxes ? (
				<Checkbox
					name={`flyout-menu-${this.props.name}-${option.value}`}
					checked={selection.includes(option.value)}
				/>
			) : null}
			{option.label}
		</span>
	);

	_onSortEnd = ({ oldIndex, newIndex }: any) => {
		this.props.sortFunction(oldIndex, newIndex);
	};
	_getOptions = () => {
		const { options, selection = [], sort = 'label' } = this.props;
		let filtered = options.filter((v: any) => {
			if (this.state.search.length) {
				return get(v, 'label', '')
					.toLowerCase()
					.includes(this.state.search.toLowerCase());
			}
			return true;
		});
		const noValue = filter(filtered, x => !x.value || x.value === EMPTY_OPTION.value);
		filtered = filter(
			sort
				? sortBy(
						filtered,
						x => (x[sort] && x[sort].toLowerCase && x[sort].toLowerCase()) || ''
				  )
				: filtered,
			x => !!x.value && x.value !== EMPTY_OPTION.value
		);
		filtered = take([...noValue, ...filtered], MAX_OPTIONS_RENDERED);

		const filteredOptions = filtered.map((i: any, index: any) => {
			const renderItem = () => (
				<li key={i.value} className="wem-m-flyout-menu__sortable">
					{this._renderOption(i, selection)}
				</li>
			);
			const renderTooltip = (children: any, tooltip: any) =>
				tooltip ? (
					<Tooltip key={i.value} show={true} tip={i.tooltip} left={280} top={index * 56}>
						{children}
					</Tooltip>
				) : (
					children
				);

			return !i.value && !i.label
				? null
				: this.props.sortFunction && !i.disableSort
				? renderTooltip(
						<SortableItem
							key={i.value}
							index={index}
							value={this._renderOption(i, selection)}
						/>,
						i.tooltip && i.disabled
				  )
				: renderTooltip(renderItem(), i.tooltip && i.disabled);
		});
		return [filteredOptions, filtered];
	};
	render() {
		if (this.props.isOpen) {
			const { sortFunction, isOpen, position, onClose, hasMinWidth } = this.props;
			const [filteredOptions, filtered] = this._getOptions();
			const hasMenu = compact(filteredOptions).length;
			const tooltipClass = filtered.some((i: any) => i.tooltip && i.tooltip.length)
				? 'has-tooltip'
				: '';

			return (
				<div
					ref={this.flyoutWrapperRef as any}
					style={
						this.props.overridePosition || {
							left: get(position, 'x', 0),
							top: get(position, 'y', 73),
						}
					}
					className={`wem-m-flyout-menu wem-m-flyout-menu--search m-flyout m-flyout--full ${
						this.props.scrollable ? 'm-flyout--scrollable' : ''
					} ${isOpen ? 'is-open' : ''} ${
						hasMinWidth ? 'wem-m-flyout-menu--min-width' : ''
					}`}
				>
					<div className="wem-m-flyout-menu__overlay" onClick={onClose} />
					{!this.props.disableSearch ? (
						<div
							className={`wem-m-flyout-menu__search-input ${
								hasMenu ? '' : 'wem-m-flyout-menu__search-input--empty'
							}`}
						>
							<div
								className={`a-input m-flyout-input-wrapper wem-m-flyout-input-wrapper ${
									this.state.search
										? 'wem-m-flyout-input-wrapper--with-search'
										: ''
								}`}
							>
								<input
									ref={this.searchInputRef as any}
									type="text"
									autoComplete="off"
									name="input-autocomplete"
									placeholder="Zoeken"
									value={this.state.search}
									onChange={this._search}
								/>
								{this.props.isFetchingSearchInputResults && (
									<Spinner
										size="small"
										className="wem-m-flyout-menu__search-input--loading"
									/>
								)}
							</div>
						</div>
					) : null}
					{this.props.topContent && (
						<div
							className={`wem-m-flyout-menu__topcontent ${
								!hasMenu ? 'u-border-bottom' : ''
							}`}
						>
							{this.props.topContent}
						</div>
					)}
					{hasMenu ? (
						<div className={`m-flyout__content ${tooltipClass}`}>
							{sortFunction ? (
								<SortableContainer onSortEnd={this._onSortEnd} useDragHandle>
									{filteredOptions}
								</SortableContainer>
							) : (
								<ul className="m-selectable-list m-selectable-list--no-border">
									{filteredOptions}
								</ul>
							)}
						</div>
					) : null}
				</div>
			);
		} else {
			return null;
		}
	}
}

FlyoutMenu.defaultProps = { options: [], scrollable: true, name: 'none' };

export default FlyoutMenu;
