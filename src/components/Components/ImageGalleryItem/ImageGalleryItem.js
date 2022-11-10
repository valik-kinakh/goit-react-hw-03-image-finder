import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import { useImagesContext } from '../../../hooks/useImagesContext';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const { openModal } = useImagesContext();

  return (
    <li className={s.Item}>
      <img
        onClick={e => {
          openModal(e.target.dataset.large);
        }}
        src={webformatURL}
        alt={tags}
        className={s.Image}
        data-large={largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
