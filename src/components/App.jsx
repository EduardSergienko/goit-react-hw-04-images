import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export class App extends Component {
  state = {
    page: 1,
    searchingImg: '',
  };
  formData = data => {
    this.setState({
      searchingImg: data,
      page: 1,
    });
  };
  handleLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { searchingImg, page } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.formData} />
        <ImageGallery
          searchQwery={searchingImg}
          hageNumber={page}
          onSwowMore={this.handleLoadMoreBtn}
        />
      </>
    );
  }
}
