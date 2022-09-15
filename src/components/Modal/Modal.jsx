import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const portal = document.getElementById('modal');

function Modal({ handleCloseModal, currentItem: { largeImageURL, tags } }) {
  const handleClickOwerlay = event => {
    if (event.target === event.currentTarget) {
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
