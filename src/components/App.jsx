import { Component } from 'react';
import Modal from './Modal';
import { Loader } from './Loader';

export class App extends Component {
  state = {
    showModal: true,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        React homework template
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
      </div>
    );
  }
}
