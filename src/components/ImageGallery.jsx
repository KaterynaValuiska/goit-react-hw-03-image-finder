import './styles.css';
export const ImageGallery = () => {
  <ul class="gallery">
    {Array.map(({ title, webformatURL, id }) => (
      <li className="ImageGalleryItem" key={id}>
        <img
          src={webformatURL}
          alt={title}
          className="ImageGalleryItem-image"
        />
      </li>
    ))}
  </ul>;
};
