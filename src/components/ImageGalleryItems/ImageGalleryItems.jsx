import styles from './ImageGalleryItems.module.scss';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ imagesData, onShowModal }) {
  return imagesData.map(item => {
    return (
      <li
        key={item.id}
        className={styles.ImageGalleryItem}
        onClick={() => {
          onShowModal(item.largeImageURL, item.tags);
        }}
      >
        <img
          className={styles.ImageGalleryItem_image}
          src={item.webformatURL}
          alt={item.tags}
        />
      </li>
    );
  });
}

ImageGalleryItem.propTypes = {
  imagesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onShowModal: PropTypes.func.isRequired,
};
