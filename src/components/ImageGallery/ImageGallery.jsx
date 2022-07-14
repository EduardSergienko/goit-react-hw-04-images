import PropTypes from 'prop-types';
import styles from './ImageGallery.module.scss';

export function ImageGallery({ children }) {
  return (
    <>
      <ul className={styles.ImageGallery}>{children}</ul>}
    </>
  );
}

ImageGallery.propTypes = {
  searchQwery: PropTypes.string.isRequired,
};
