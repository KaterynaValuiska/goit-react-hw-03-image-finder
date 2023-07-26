import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';

const modalRoot = document.querySelector('#modalRoot');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }
  handleEsc = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleOverlay = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlay}>
        <div className="Modal">
          {this.props.children}
          {/* <img src="" alt="" /> */}
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  handleOverlay: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
