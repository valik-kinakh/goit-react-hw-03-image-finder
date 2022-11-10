import React, { useState, useEffect } from 'react';
import ImageGallery from './Components/ImageGallery';
import SearchBar from './Components/Searchbar';
import pixabayAPI from '../services/imageAPI';
import Section from './Components/Section';
import Container from './Components/Container';
import ErrorMessage from './Components/ErrorMessage';
import WariningMessage from './Components/WarningMessage';
import Button from './Components/Button';
import Modal from './Components/Modal';
import Loader from './Components/Loader';
import { ImagesContext } from '../context/ImagesContext';

const App = () => {
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');

  useEffect(() => {
    if (!query) return;
    let mounted = true;

    setLoading(true);
    getImages(query, page);
    return () => {
      mounted = false;
    };
  }, [query, page]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [images]);

  const getImages = (query, page) => {
    pixabayAPI
      .fetchImage(query, page)
      .then(({ hits }) => {
        setImages(prevImg => [...prevImg, ...hits]);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    if (error) setError('');
  };

  const handleIncrement = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = url => {
    setShowModal(true);
    setModalImageURL(url);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImageURL('');
  };

  return (
    <div className="app">
      <SearchBar onSubmit={handleFormSubmit} />
      <ImagesContext.Provider value={{ openModal }}>
        <Section>
          <Container>
            {!query && <WariningMessage />}
            {error && <ErrorMessage message={error} />}
            {!error && <ImageGallery images={images} />}
            {loading && <Loader />}
            {images.length > 0 && !loading && (
              <Button onClick={handleIncrement} />
            )}
          </Container>
        </Section>
        {showModal && (
          <Modal onClose={closeModal}>
            <img src={modalImageURL} alt="" />
          </Modal>
        )}
      </ImagesContext.Provider>
    </div>
  );
};

export default App;
