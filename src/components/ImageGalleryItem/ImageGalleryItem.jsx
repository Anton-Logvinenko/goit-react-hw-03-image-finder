import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ img, largeImg, tags, selectImg }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.Image}
        src={img}
        alt={tags}
        onClick={() => {
          selectImg(largeImg,tags);
        }}
      />
    </li>
  );
}

export { ImageGalleryItem };

ImageGalleryItem.propTypes = {
  img: PropTypes.string,
  largeImg: PropTypes.string,
  selectImg: PropTypes.func,
  tags:PropTypes.string,
};
