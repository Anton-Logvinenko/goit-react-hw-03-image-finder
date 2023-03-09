import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDown);
  }

  // закрытие по ESC
  handelKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClosedModal();
    }
  };

  // Закрытие по бекдропу
  hendelBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClosedModal();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.hendelBackDropClick}>
        <div className={css.modal}>
          <img src={this.props.largeImageURL} alt={this.props.modalTags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export { Modal };

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  modalTags: PropTypes.string,
};
