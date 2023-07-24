import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery';

import './styles.css';

export class App extends Component {
  state = {
    showModal: false,
    inputValue: '',
    cards: null,
    error: null,
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    const API_KEY = '37154434-e108fb93a0dd643270de780f1';
    const perPage = 12;
    const currentPage = 1;

    if (prevState.inputValue !== this.state.inputValue) {
      this.setState({ status: 'pending' });

      const searchParams = new URLSearchParams({
        key: API_KEY,
        q: this.state.inputValue,
        page: currentPage,
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
          this.setState({ cards: data.hits, status: 'resolved' });
          console.log(data.hits);
          console.log(prevState.cards);
          console.log(this.state.cards);
          console.log(prevState.status);
          console.log(this.state.status);
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
          console.error(error);
        });
    }
  }
  handleFormSubmit = inputValue => {
    this.setState({ inputValue: inputValue });
    console.log(inputValue);
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { status, error, cards } = this.state;
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
        </div>
      );
    }
    if (status === 'rejected') {
      toast.error(error.message);
      <ToastContainer autoClose={3000} />;
      return (
        <div className="App">
          <Searchbar inputSubmit={this.handleFormSubmit} />
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className="App">
          <Searchbar inputSubmit={this.handleFormSubmit} />
          <ImageGallery cards={cards} />
        </div>
      );
    }
  }
}

// return (
//       <div className="App">
//         <Searchbar inputSubmit={this.handleFormSubmit} />
//         {this.state.loading && <Loader />}
//         {this.state.error && }
//         {/* <ImageGallery /> */}
//         {this.state.showModal && (
//           <Modal onClose={this.toggleModal}>
//             <p>
//               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint,
//               distinctio magnam eaque atque recusandae maxime maiores
//               consequuntur ratione tempora quos praesentium porro illum, qui
//               aperiam blanditiis earum? Maiores, quisquam quia!
//             </p>
//             <Loader />
//           </Modal>
//         )}
//         <ToastContainer autoClose={3000} />
//       </div>
//     );
