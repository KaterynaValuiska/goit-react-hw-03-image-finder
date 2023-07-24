import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
// import { ImageGallery } from './ImageGallery';

import './styles.css';

export class App extends Component {
  state = {
    showModal: false,
    inputValue: '',
    carts: null,
    error: null,
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    const API_KEY = '37154434-e108fb93a0dd643270de780f1';
    const perPage = 40;
    const currentPage = 1;

    if (prevProps.inputValue !== this.props.inputValue) {
      this.setState({ status: 'pending' });
      const searchParams = new URLSearchParams({
        key: API_KEY,
        q: this.props.inputValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: currentPage,
      });
      fetch(`https://pixabay.com/api/?${searchParams}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Not found ${this.props.inputValue}`)
          );
        })
        .then(({ hits }) => {
          this.setState({ carts: hits, status: 'resolved' });
          console.log(this.state.carts);
        })
        .catch(error => {
          this.setState({ error, status: 'resolved' });
          console.error(error);
        });
    }
  }
  handleFormSubmit = inputValue => {
    this.setState({ inputValue: inputValue });
    console.log(inputValue);
    console.log(this.state.carts);
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { status, error, carts } = this.state;
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
          {/* <ImageGallery /> */}
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
