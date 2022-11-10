import React, { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import Container from '../Container';
import { BiSearch } from 'react-icons/bi';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmitForm = e => {
    e.preventDefault();

    if (!query) {
      alert('Please, enter your request!');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  const handleChangeQuery = e => {
    setQuery(e.currentTarget.value.toLowerCase().trim());
  };

  return (
    <header className={s.Searchbar}>
      <Container>
        <form onSubmit={handleSubmitForm} className={s.SearchForm}>
          <button type="submit" className={s.Button}>
            <BiSearch />
          </button>

          <input
            className={s.Input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChangeQuery}
            value={query}
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
