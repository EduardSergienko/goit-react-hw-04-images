import PropTypes from 'prop-types';
import styles from './ImageGallery.module.scss';
import { ImageGalleryItem } from 'components/ImageGalleryItems/ImageGalleryItems';

export function ImageGallery({ imagesData, onShowModal }) {
  return (
    <ul className={styles.ImageGallery}>
      {imagesData.map(({ largeImageURL, tags, webformatURL, id }) => {
        return (
          <ImageGalleryItem
            key={id}
            largeImage={largeImageURL}
            alt={tags}
            src={webformatURL}
            onShowModal={onShowModal}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  imagesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
