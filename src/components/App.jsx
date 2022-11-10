import React, { useState, useEffect } from 'react';
import ImageGallery from './Components/ImageGallery';
import SearchBar from './Components/Searchbar';
import pixabayAPI from '../services/imageAPI';
import Section from './Components/Section';
import Container from './Components/Container';
import ErrorMessage from './Components/ErrorMessage';
import Request from './Components/Request';
import Button from './Components/Button';
import Modal from './Components/Modal';
import Loader from './Components/Loader';

const App = () => {
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeURL, setLargeURL] = useState('');

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    getImages(query, page);
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
  };

  const handleIncrement = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = url => {
    setShowModal(true);
    setLargeURL(url);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeURL('');
  };

  return (
    <div>
      <SearchBar onSubmit={handleFormSubmit} />
      <Section>
        <Container>
          {!query && <Request />}
          {error && <ErrorMessage message={error} />}
          {!error && <ImageGallery images={images} openModal={openModal} />}
          {loading && <Loader />}
          {images.length > 0 && !loading && (
            <Button onClick={handleIncrement} />
          )}
        </Container>
      </Section>
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeURL} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default App;
