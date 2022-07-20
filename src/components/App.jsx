import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';
import { fechImg } from 'services/ImageApiService';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export function App() {
  const [page, setPage] = useState(1);
  const [searchingImg, setSearchingImg] = useState('');
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [largeImg, setLargeImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!searchingImg) {
      return;
    }
    setStatus('pending');
    fechImg(searchingImg, page)
      .then(resolve => {
        setHits([...hits, ...resolve.data.hits]);
        setTotalHits(resolve.data.totalHits);
        setTotalPages(Math.ceil(totalHits / 12));
        setStatus('resolved');
        if (!resolve.data.hits.length) {
          setStatus('idle');
          Notiflix.Notify.failure(
            `Sory, ${searchingImg} not found, please try again`
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchingImg, page]);
  // componentDidUpdate = async (prevProps, prevState) => {
  //   if (
  //     prevState.searchingImg !== this.state.searchingImg ||
  //     prevState.page !== this.state.page
  //   )
  //     try {
  //       this.setState({
  //         status: 'pending',
  //       });
  //       const resolve = await fechImg(this.state.searchingImg, this.state.page);
  //       console.log(resolve);
  //       this.setState(prevState => ({
  //         hits: [...prevState.hits, ...resolve.data.hits],
  //         totalHits: resolve.data.totalHits,
  //         totalPages: Math.ceil(resolve.data.totalHits / 12),
  //         status: 'resolved',
  //       }));

  //       if (!resolve.data.hits.length) {
  //         this.setState({
  //           status: 'idle',
  //         });
  //         Notiflix.Notify.failure(
  //           `Sory, ${this.props.searchQwery} not found, please try again`
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  // };
  const formData = data => {
    if (searchingImg === data) {
      return;
    }
    setSearchingImg(data);
    setPage(1);
    setHits([]);
  };

  const handleGalleryItemClick = (largImg, imgAlt) => {
    setShowModal(!showModal);
    setLargeImg(largImg);
    setTags(imgAlt);
  };
  const handleLoadMoreBtn = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Searchbar onSubmit={formData} />
      {status === 'idle' && <Notification />}
      {hits.length > 0 && (
        <ImageGallery imagesData={hits} onShowModal={handleGalleryItemClick} />
      )}

      {status === 'pending' && <Loader />}
      {status === 'resolved' && totalPages !== page && (
        <Button onLoadMoreClick={handleLoadMoreBtn} />
      )}
      {showModal && (
        <Modal
          imageAlt={tags}
          largeImg={largeImg}
          onShowModal={handleGalleryItemClick}
        />
      )}
    </>
  );
}
