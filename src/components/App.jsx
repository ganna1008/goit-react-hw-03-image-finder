import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { fetchImages } from 'api';
import { imgPerPage } from 'api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchText: '',
    images: null,
    error: null,
    isLoading: false,
    page: 1,
    totalHits: null,
    totalImg: 0,
    showModal: false,
    activeImg: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchText, page } = this.state;

    if (prevState.searchText !== searchText) {
      this.setState({ page: 1, images: [], error: null, totalImg: 0 });
      this.setState({ isLoading: true });
      try {
        const imgPixabay = await fetchImages(searchText, 1);
        const totalImage = imgPerPage;

        if (imgPixabay.totalHits > 0) {
          this.setState(({ images, page }) => {
            return {
              images: [...images, ...imgPixabay.hits],
              totalHits: imgPixabay.totalHits,
              totalImg: totalImage,
            };
          });
          if (totalImage >= imgPixabay.totalHits) {
            this.setState({
              error:
                "We're sorry, but you've reached the end of search results.",
            });
          }
        } else {
          this.setState({
            error:
              'Sorry, there are no images matching your search query. Please try again.',
          });
        }
      } catch {
        this.setState({ error: 'Photo not found. Please try it again' });
      }
      this.setState({ isLoading: false });
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ isLoading: true });
      try {
        const imgPixabay = await fetchImages(searchText, page);
        const totalImage = prevState.totalImg + imgPerPage;
        this.setState(({ images }) => {
          return {
            images: [...images, ...imgPixabay.hits],
            totalImg: totalImage,
          };
        });
        if (totalImage >= imgPixabay.totalHits) {
          this.setState({
            error: "We're sorry, but you've reached the end of search results.",
          });
        }
      } catch {
        this.setState({ error: 'Photo not found. Please try it again' });
      }
      this.setState({ isLoading: false });
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const { value } = event.target.elements.input;
    this.setState({ searchText: value.trim() });
  };

  nextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  handleImgClick = activeImg => {
    this.setState({ activeImg: { ...activeImg } });
    this.openModal();
  };

  render() {
    const { error, images, isLoading, showModal, activeImg } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />

        <div className={css.loader}>
          <ScaleLoader
            color="#3737d7"
            loading={isLoading}
            height={70}
            margin={6}
            radius={9}
            width={6}
          />
        </div>
        {showModal && (
          <Modal activeImg={activeImg} closeModal={this.closeModal}></Modal>
        )}
        {error && <div className="css.error">{error}</div>}
        {images && (
          <ImageGallery handleImgClick={this.handleImgClick} images={images} />
        )}
        {!isLoading && !error && images && <Button nextPage={this.nextPage} />}
      </>
    );
  }
}
