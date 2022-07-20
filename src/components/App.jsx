import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';
import { fechImg } from 'services/ImageApiService';
import Modal from './Modal/Modal';
import Notiflix from 'notiflix';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export class App extends Component {
  state = {
    page: 1,
    searchingImg: '',
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
      prevState.searchingImg !== this.state.searchingImg ||
      prevState.page !== this.state.page
    )
      try {
        this.setState({
          status: 'pending',
        });
        const resolve = await fechImg(this.state.searchingImg, this.state.page);
        console.log(resolve);
        this.setState(prevState => ({
          hits: [...prevState.hits, ...resolve.data.hits],
          totalHits: resolve.data.totalHits,
          totalPages: Math.ceil(resolve.data.totalHits / 12),
          status: 'resolved',
        }));

        if (!resolve.data.hits.length) {
          this.setState({
            status: 'idle',
          });
          Notiflix.Notify.failure(
            `Sory, ${this.props.searchQwery} not found, please try again`
          );
        }
      } catch (error) {
        console.log(error);
      }
  };
  formData = data => {
    if (this.state.searchingImg === data) {
      return;
    }
    this.setState({
      searchingImg: data,
      page: 1,
      hits: [],
    });
  };

  handleGalleryItemClick = (largImg, imgAlt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImg: largImg,
      tags: imgAlt,
    }));
  };
  handleLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { status, hits, totalPages, tags, showModal, largeImg, page } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.formData} />
        {status === 'idle' && <Notification />}
        {hits.length > 0 && (
          <ImageGallery
            imagesData={hits}
            onShowModal={this.handleGalleryItemClick}
          />
        )}

        {status === 'pending' && <Loader />}
        {status === 'resolved' && totalPages !== page && (
          <Button onLoadMoreClick={this.handleLoadMoreBtn} />
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
