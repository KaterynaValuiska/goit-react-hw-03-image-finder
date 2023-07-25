import { Component } from 'react';
import './styles.css';
export default class ImageGallery extends Component {
  state = {
    cardId: null,
  };
  handleChoseFotoId = evt => {
    this.setState({ cardId: evt.target.id });
    this.props.toggleModal();
    this.props.handleChoseFoto(this.state.cardId);
  };
  render() {
    return (
      <>
        <ul className="ImageGallery">
          {this.props.cards.map(({ tags, webformatURL, id }) => (
            <li
              className="ImageGalleryItem"
              key={id}
              onClick={this.handleChoseFotoId}
            >
              <img
                src={webformatURL}
                alt={tags}
                id={id}
                loading="lazy"
                className="ImageGalleryItem-image"
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
