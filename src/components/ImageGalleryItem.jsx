import './styles.css';
export const ImageGalleryItem = ({ largeImageURL, title, id }) => {
  <li className="ImageGalleryItem" key={id}>
    <img src={largeImageURL} alt={title} className="ImageGalleryItem-image" />
  </li>;
};
