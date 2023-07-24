import { Component } from 'react';
import './styles.css';
export default class ImageGallery extends Component {
  handleChoseFoto = evt => {
    console.log(evt.target.id);
    this.props.toggleModal();
  };
  render() {
    return (
      <>
        <ul className="ImageGallery">
          {this.props.cards.map(({ tags, webformatURL, id }) => (
            <li
              className="ImageGalleryItem"
              key={id}
              onClick={this.handleChoseFoto}
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
