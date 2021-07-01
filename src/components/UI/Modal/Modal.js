import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';
import Backdrop from './Backdrop/Backdrop';

//You have to pass a func to a modalClosed prop,this func has to switch the state realted to show prop.
//when you click on the backdrop this passed function will be trigered and change state -> switch show prop and then modal will be closed
const Modal = ({show, modalClosed, children}) => {
	return (
		<>
			<Backdrop show={show} clicked={modalClosed} />
			<div
				className="Modal"
				style={{
					transform: show ? 'scale(1)' : 'scale(0)',
					opacity: show ? 1 : 0,
				}}>
				{children}
			</div>
		</>
	);
};

Modal.propTypes = {
	show: PropTypes.bool.isRequired,
	modalClosed: PropTypes.func.isRequired,
};

export default Modal;
