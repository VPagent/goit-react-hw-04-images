import { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

const PRIVATE_KEY = '29321758-e768d1c89c32410537fe23d2a';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [allImg, setAllImg] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    if (!searchName) {
      return;
    }
    const fetchApi = async () => {
      const link = `?q=${searchName}&page=${page}&key=${PRIVATE_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
      setIsLoading(true);
      try {
        const response = await axios.get(link);
        setAllImg(prevState => [...prevState, ...response.data.hits]);
      } catch {
        alert('Error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchApi();
  }, [searchName, page]);

  const hadnleSubmitForm = value => {
    setSearchName(value);
    setAllImg([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = value => {
    setShowModal(true);
    setCurrentItem(value);
    window.addEventListener('keydown', handleKeyDown);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      handleCloseModal();
    }
  };

  const isAllImg = allImg.length;
  return (
    <div>
      <Searchbar onSubmitForm={hadnleSubmitForm} />
      <ImageGallery allImages={allImg} handleOpenModal={handleOpenModal} />
      {isAllImg && <Button onClickLoad={handleLoadMore} />}
      {isLoading && <Loader />}
      {showModal && (
        <Modal currentItem={currentItem} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
}
