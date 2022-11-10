import React, { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';
import ImageGallery from './Components/ImageGallery';
import SearchBar from './Components/Searchbar';
import pixabayAPI from '../services/imageAPI';
import Section from './Components/Section';
import Container from './Components/Container';
import ErrorMessage from './Components/ErrorMessage';
import Request from './Components/Request';
import Button from './Components/Button';
import Modal from './Components/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [largeURL, setLargeURL] = useState('');

  useEffect(() => {
    if (query === '') return;

    setStatus(Status.PENDING);
    firstFetchImages(query, page);
  }, [query]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    nextFetchImages(query, page);
  }, [page]);

  const firstFetchImages = (query, page) => {
    pixabayAPI.fetchImage(query, page).then(({ hits, total }) => {
      setImages(hits);
      setTotal(total);
      setStatus(Status.RESOLVED);
      if (!total) {
        setError('Something went wrong! Please, change your request!');
        setStatus(Status.REJECTED);
      } else {
        setError(null);
      }

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  const nextFetchImages = (query, page) => {
    pixabayAPI.fetchImage(query, page).then(({ hits }) => {
      setImages(prevImg => [...prevImg, ...hits]);

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const handleIncrement = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = url => {
    setShowModal(!showModal);
    setLargeURL(url);
  };

  const closeModal = () => {
    setShowModal(!showModal);
    setLargeURL('');
  };

  return (
    <div>
      <SearchBar onSubmit={handleFormSubmit} />
      <Section>
        <Container>
          {status === 'idle' && <Request />}
          {status === 'rejected' && <ErrorMessage message={error} />}
          {status === 'resolved' && (
            <ImageGallery images={images} openModal={openModal} />
          )}
          {status === 'pending' && (
            <Audio type="Watch" color="#00BFFF" height={80} width={80} />
          )}
          {total - page * 12 > 0 && <Button onClick={handleIncrement} />}
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
