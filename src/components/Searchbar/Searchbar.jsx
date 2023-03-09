import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import css from './Searchbar.module.css';
import { VscSearch } from 'react-icons/vsc';

const { Component } = require('react');

class Searchbar extends Component {
  state = {
    imgName: '',
  };

  handelChange = e => {
    this.setState({ imgName: e.currentTarget.value });
  };

  handelSubmit = e => {
    e.preventDefault();
    // проверка: если пусто, то вывести сообщение
    if (!this.state.imgName.trim()) {
      return toast.error('Внесите информацию в поле поиска');
    }

    this.props.onSearch(this.state.imgName);
    this.setState({ imgName: '' });
  };

  render() {
    const { imgName } = this.state;

    return (
      <header className={css.searchFormHeader}>
        <form className={css.searchForm} onSubmit={this.handelSubmit}>
          <button type="submit" className={css.searchFormBtn}>
            <VscSearch size={32} />
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            value={imgName}
            onChange={this.handelChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export { Searchbar };
