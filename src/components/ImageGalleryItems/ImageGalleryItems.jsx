import styles from './ImageGalleryItems.module.scss';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ largeImage, src, alt, onShowModal }) {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => {
        onShowModal(largeImage, alt);
      }}
    >
      <img className={styles.ImageGalleryItem_image} src={src} alt={alt} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
  alt: PropTypes.string.isRequired,
  onShowModal: PropTypes.func.isRequired,
};
