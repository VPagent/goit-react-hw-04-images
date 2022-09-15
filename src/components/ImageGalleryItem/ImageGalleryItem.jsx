import PropTypes from 'prop-types';

function ImageGalleryItem({ allItem, handleOpenModal, id, web, tags }) {
  const handleClick = event => {
    const currentId = Number(event.currentTarget.id);
    const targetElem = allItem.filter(elem => elem.id === currentId);
    handleOpenModal(...targetElem);
  };

  return (
    <li key={id} id={id} className="ImageGalleryItem" onClick={handleClick}>
      <img src={web} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  allItem: PropTypes.array,
  handleOpenModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  web: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
