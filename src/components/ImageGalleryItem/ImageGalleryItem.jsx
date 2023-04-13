import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  imgUrl,
  tags,
  largeImageURL,
  handleImgClick,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css['imageGalleryItem-image']}
        onClick={() =>
          handleImgClick({ srcLargeImage: largeImageURL, alt: tags })
        }
        src={imgUrl}
        alt={tags}
        loading="lazy"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  handleImgClick: PropTypes.func.isRequired,
};
