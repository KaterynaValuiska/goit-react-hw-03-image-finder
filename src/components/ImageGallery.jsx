import { Component } from 'react';
import './styles.css';
export default class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className="ImageGallery">
          {this.props.cards.map(({ tags, webformatURL, id }) => (
            <li className="ImageGalleryItem" key={id}>
              <img
                src={webformatURL}
                alt={tags}
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
