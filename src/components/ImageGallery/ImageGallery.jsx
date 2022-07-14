import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.scss';
import { ImageGalleryItem } from 'components/ImageGalleryItems/ImageGalleryItems';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { fechImg } from 'services/ImageApiService';
import Notiflix from 'notiflix';
export class ImageGallery extends Component {
  state = {
    hits: [],
    totalPages: 1,
    totalHits: null,
    largeImg: '',
    showModal: false,
    status: 'idle',
    tags: '',
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevProps.searchQwery !== this.props.searchQwery ||
      prevProps.hageNumber !== this.props.hageNumber
    )
      try {
        this.setState({
          status: 'pending',
        });
        const resolve = await fechImg(
          this.props.searchQwery,
          this.props.hageNumber
        );
        console.log(resolve);
        this.setState(prevState => ({
          hits: [...prevState.hits, ...resolve.data.hits],
          totalHits: resolve.data.totalHits,
          totalPages: Math.ceil(resolve.data.totalHits / 12),
          status: 'resolved',
        }));

        if (prevProps.searchQwery !== this.props.searchQwery) {
          this.setState({
            hits: [...resolve.data.hits],
            totalHits: resolve.data.totalHits,
          });
          if (!resolve.data.hits.length) {
            this.setState({
              status: 'idle',
            });
            Notiflix.Notify.failure(
              `Sory, ${this.props.searchQwery} not found, please try again`
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
  };

  handleGalleryItemClick = (largImg, imgAlt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImg: largImg,
      tags: imgAlt,
    }));
  };
  render() {
    const { status, hits, totalPages, showModal, largeImg, tags } = this.state;
    return (
      <>
        {status === 'idle' && (
          <h2 className={styles.InfoText}>Please, enter your request</h2>
        )}

        {hits.length > 0 && (
          <ul className={styles.ImageGallery}>
            <ImageGalleryItem
              imagesData={hits}
              onShowModal={this.handleGalleryItemClick}
            />
          </ul>
        )}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && totalPages !== this.props.hageNumber && (
          <Button onLoadMoreClick={this.props.onSwowMore} />
        )}

        {showModal && (
          <Modal
            imageAlt={tags}
            largeImg={largeImg}
            onShowModal={this.handleGalleryItemClick}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQwery: PropTypes.string.isRequired,
};
