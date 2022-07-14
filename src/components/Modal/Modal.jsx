import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleEscClick);
  };
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleEscClick);
  };

  handleEscClick = e => {
    if (e.code === 'Escape') {
      this.props.onShowModal();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onShowModal();
    }
  };

  render() {
    return createPortal(
      <div onClick={this.handleOverlayClick} className={styles.Overlay}>
        <div className={styles.Modal}>
          <img src={this.props.largeImg} alt={this.props.imageAlt} />
        </div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onShowModal: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};
