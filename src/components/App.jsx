import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';

import './styles.css';

export class App extends Component {
  state = {
    showModal: false,
    inputValue: '',
    cards: [],
    error: null,
    status: 'idle',
    card: '',
    currentPage: 1,
    total: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const API_KEY = '37154434-e108fb93a0dd643270de780f1';
    const perPage = 12;

    if (
      prevState.inputValue !== this.state.inputValue ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.setState({ status: 'pending' });

      const searchParams = new URLSearchParams({
        key: API_KEY,
        q: this.state.inputValue,
        page: this.state.currentPage,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
      });

      fetch(`https://pixabay.com/api/?${searchParams}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Not found ${this.state.inputValue}`)
          );
        })
        .then(data => {
          if (!data.total) {
            toast.error(`Not found ${this.state.inputValue}`);
            return Promise.reject(
              new Error(`Not found ${this.state.inputValue}`)
            );
          }
          this.setState(prevState => ({
            cards: [...prevState.cards, ...data.hits],
            status: 'resolved',
            total: data.totalHits - this.state.currentPage * 12,
          }));
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
          alert(`Not found ${this.state.inputValue}`);
          console.error(error);
        });
    }
  }
  handleFormSubmit = inputValue => {
    if (this.state.inputValue === inputValue) {
      toast(`${this.state.inputValue} already found`);
      return;
    }
    this.setState({ inputValue: inputValue, currentPage: 1, cards: [] });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  handleSelectFoto = largeImageURL => {
    this.toggleModal();
    this.setState({ card: largeImageURL });
  };

  nextPage = () => {
    return this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { status, error, cards, showModal, total } = this.state;

    if (status === 'idle') {
      return (
        <div className="App">
          <Searchbar inputSubmit={this.handleFormSubmit} />
          <ToastContainer autoClose={3000} />;
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className="App">
          <Searchbar inputSubmit={this.handleFormSubmit} />
          <Loader />
          <ToastContainer autoClose={3000} />;
        </div>
      );
    }
    if (status === 'rejected') {
      toast.error(error.message);
      return (
        <div className="App">
          <Searchbar inputSubmit={this.handleFormSubmit} />
          <ToastContainer autoClose={3000} />;
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className="App">
          <Searchbar inputSubmit={this.handleFormSubmit} />
          <ImageGallery
            cards={cards}
            toggleModal={this.toggleModal}
            onSelect={this.handleSelectFoto}
          />
          {total >= 0 && <Button handleChangePage={this.nextPage} />}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={this.state.card} alt="" width={600} />
            </Modal>
          )}
          <ToastContainer autoClose={3000} />;
        </div>
      );
    }
  }
}
