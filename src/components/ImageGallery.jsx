import { Component } from 'react';
import './styles.css';
export default class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className="ImageGallery">
          {this.props.cards.map(({ tags, webformatURL, id, largeImageURL }) => (
            <li
              key={id}
              className="ImageGalleryItem"
              onClick={() => this.props.onSelect(largeImageURL)}
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
