import './styles.css';
export const ImageGalleryItem = ({ largeImageURL, title }) => {
  <li className="ImageGalleryItem">
    <img src={largeImageURL} alt={title} className="ImageGalleryItem-image" />
  </li>;
};
