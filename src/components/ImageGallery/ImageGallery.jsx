import PropTypes from 'prop-types';
import styles from './ImageGallery.module.scss';

export function ImageGallery({ children }) {
  return (
    <>
      {hits.length > 0 && (
        <ul className={styles.ImageGallery}>
          <ImageGalleryItem
            imagesData={hits}
            onShowModal={this.handleGalleryItemClick}
          />
        </ul>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchQwery: PropTypes.string.isRequired,
};
