import React, { FC } from 'react';
import {
	ControlledModal,
	ControlledModalBody,
	ControlledModalFooter,
	ControlledModalHeader,
} from '@acpaas-ui/react-editorial-components';
import { Button } from '@acpaas-ui/react-components';

interface ModalProps {
	show: boolean;
	onClose: () => void;
	size: string;
	title: string;
	body: string;
	actions: ModalFooterAction[];
}

interface ModalFooterAction {
	title: string;
	onClick: () => void;
	negative?: boolean;
	iconLeft?: string;
	disabled?: boolean;
	type?: string;
}

const Modal: FC<ModalProps> = ({ show, onClose, size = 'large', title, body, actions }) => {
	return (
		<ControlledModal show={show} onClose={onClose} size={size}>
			<ControlledModalHeader>
				<h4>{title}</h4>
			</ControlledModalHeader>
			<ControlledModalBody>{body}</ControlledModalBody>
			<ControlledModalFooter>
				<div className="u-flex u-flex-item u-flex-justify-end">
					{actions.map((element, index) => (
						<Button
							key={`modal-footer-button-${index}`}
							onClick={element?.onClick}
							negative={element?.negative || false}
							disabled={element?.disabled || false}
							iconLeft={element?.iconLeft || ''}
							type={element?.type || 'primary'}
						>
							{element?.title}
						</Button>
					))}
				</div>
			</ControlledModalFooter>
		</ControlledModal>
	);
};

export default Modal;
