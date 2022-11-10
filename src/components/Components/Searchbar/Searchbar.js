import React, { useRef } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import Container from '../Container';
import { BiSearch } from 'react-icons/bi';

const SearchBar = ({ onSubmit }) => {
  const search = useRef();

  const handleSubmitForm = e => {
    e.preventDefault();

    if (!search.current.value) {
      alert('Please, enter your request!');
      return;
    }

    onSubmit(search.current.value);
  };

  return (
    <header className={s.Searchbar}>
      <Container>
        <form onSubmit={handleSubmitForm} className={s.SearchForm}>
          <button type="submit" className={s.Button}>
            <BiSearch />
          </button>

          <input
            ref={search}
            className={s.Input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </Container>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
