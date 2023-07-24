import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Modal from './Modal';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

import './styles.css';

export class App extends Component {
  state = {
    showModal: true,
    inputValue: '',
  };
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
    return (
      <div className="App">
        <Searchbar inputSubmit={this.handleFormSubmit} />
        <ImageGallery inputValue={this.state.inputValue} />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint,
              distinctio magnam eaque atque recusandae maxime maiores
              consequuntur ratione tempora quos praesentium porro illum, qui
              aperiam blanditiis earum? Maiores, quisquam quia!
            </p>
            <Loader />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
