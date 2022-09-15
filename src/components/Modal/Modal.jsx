import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const portal = document.getElementById('modal');

function Modal({ handleCloseModal, currentItem: { largeImageURL, tags } }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line
  }, []);
  const handleClickOwerlay = event => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      handleCloseModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleClickOwerlay}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    portal
  );
}

export default Modal;

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  currentItem: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
