import React, { Component } from 'react';
import Notiflix from 'notiflix';
import styles from './Searchbar.module.scss';
import PropTypes from 'prop-types';
export default class Searchbar extends Component {
  state = {
    searchingImg: '',
  };
  handleInputChange = evt => {
    this.setState({
      searchingImg: evt.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchingImg.trim() !== '') {
      this.props.onSubmit(this.state.searchingImg);
    } else {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchForm_button}>
            <span className={styles.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={styles.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
