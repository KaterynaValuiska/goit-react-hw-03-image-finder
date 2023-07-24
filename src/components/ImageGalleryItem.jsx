import './styles.css';
export const ImageGalleryItem = ({ largeImageURL, tags, id }) => {
  <li key={id} className="ImageGalleryItem">
    <img src={largeImageURL} alt={tags} className="ImageGalleryItem-image" />
  </li>;
};
