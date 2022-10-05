import { Textarea } from '@acpaas-ui/react-components';
import _ from 'lodash';
import React, { FC, FormEvent, useState } from 'react';

import { TextareaWithLineNumbersProps } from './TextareaWithLineNumbers.types';

import './TextareaWithLineNumbers.scss';

const LINE_NUMBERS_OFFSET_TOP_BASE = 5;

const getLineCount = (text?: string): number => (text?.match(/\n/g) || []).length + 1;

const TextareaWithLineNumbers: FC<TextareaWithLineNumbersProps> = props => {
	const [lineNumbersOffsetTop, setLineNumbersOffsetTop] = useState(LINE_NUMBERS_OFFSET_TOP_BASE);
	const [lineCount, setLineCount] = useState(getLineCount(props.value) || 1);

	const handleChange = (event: FormEvent<HTMLInputElement>): void => {
		setLineCount(getLineCount(event.currentTarget.value));
		props.onChange(event.currentTarget.value, props.name);
	};

	const renderLineNumbers = (): JSX.Element[] => {
		const lines: JSX.Element[] = [];
		_.times(lineCount, line => {
			lines.push(<span>{line + 1}</span>);
		});

		return lines;
	};

	return (
		<div
			className="TextareaWithLineNumbers"
			onScroll={e => {
				setLineNumbersOffsetTop(
					LINE_NUMBERS_OFFSET_TOP_BASE - (e.target as any)?.scrollTop ?? 0
				);
			}}
		>
			<div className="line-numbers-container">
				<div className="line-numbers" style={{ top: `${lineNumbersOffsetTop}px` }}>
					{renderLineNumbers()}
				</div>
			</div>
			<Textarea
				label={props.label}
				name={props.name}
				value={props.value}
				disabled={props.disabled}
				readOnly={props.readOnly}
				onChange={handleChange}
			/>
		</div>
	);
};

export default TextareaWithLineNumbers;
