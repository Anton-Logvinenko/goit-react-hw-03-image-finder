import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-hot-toast';

import { getImgApi } from '../services/imgAPI';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

// import { ThreeDots } from 'react-loader-spinner';
import { BtnLoad } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import css from './ImageGallery.module.css';
import { Modal } from '../Modal/Modal';

class ImageGallery extends Component {
  state = {
    data: null,
    totalHits: '',
    loading: false,
    error: '',
    per_page: 20,
    selectedImg: null,
    tags: null,
    modalShow: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.imgSearch !== this.props.imgSearch ||
      prevState.per_page !== this.state.per_page
    ) {
      this.setState({ loading: true });
      getImgApi(this.props.imgSearch, this.state.per_page)
        .then(data => {
          if (data.totalHits > 0) {
            return this.setState({
              data,
              totalHits: data.totalHits,
            });
          } else {
            toast.error('Внесите корректную информацию в поле поиска');
            return this.setState({ data: '' });
          }
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  // Добавка изображений по кнопке LoadMore
  handelLoadMore = () => {
    if (this.state.totalHits <= this.state.per_page) {
      return toast.error('Изображения данной категории закончились');
    } else {
      this.setState(prevState => ({ per_page: prevState.per_page + 20 }));
    }
  };
  // Запись выбранной largeImage
  selectImg = (imgURL, tags) => {
    this.setState({ selectedImg: imgURL, tags, modalShow: true });
  };
  // изменение modalShow при закрытии модалки

  onClosedModal = () => {
    this.setState({ modalShow: false });
  };

  render() {
    const {
      data,
      loading,
      error,
      selectedImg,
      totalHits,
      per_page,
      modalShow,
    } = this.state;
  

    return (
      <div>
        {!data && <h1>Внесите название изображения </h1>}
        {error && <h2> Возникла ошибка {error.message}</h2>}
        {loading && <Loader />}

        <ul className={css.ImageGallery}>
          {data &&
            data.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                img={webformatURL}
                largeImg={largeImageURL}
                tags={tags}
                selectImg={this.selectImg}
              />
            ))}
        </ul>

        {totalHits > per_page && <BtnLoad onClick={this.handelLoadMore} />}

        {modalShow && (
          <Modal
            largeImageURL={selectedImg}
            modalTags={this.state.tags}
            onClosedModal={this.onClosedModal}
          />
        )}
      </div>
    );
  }
}

export { ImageGallery };

ImageGallery.propTypes = {
  imgSearch: PropTypes.string,
};
