import { Component } from 'react';
import './styles.css';
export default class ImageGallery extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
    }
  }
  render() {
    return (
      <ul class="gallery">
        {cards.map(({ tags, webformatURL, id }) => (
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
    );
  }
}
