import { useState } from 'react';
import Notiflix from 'notiflix';
import styles from './Searchbar.module.scss';
import PropTypes from 'prop-types';
export function Searchbar({ onSubmit }) {
  const [searchingImg, setSearchingImg] = useState('');

  const handleInputChange = evt => {
    setSearchingImg(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchingImg.trim() !== '') {
      onSubmit(searchingImg);
    } else {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm_button}>
          <span className={styles.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={styles.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
