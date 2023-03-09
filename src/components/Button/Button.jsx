import PropTypes from 'prop-types';
import css from './Button.module.css';

function BtnLoad({ onClick }) {
  return (
    <button className={css.Button} onClick={onClick} type="button">
      Loade more
    </button>
  );
}

export { BtnLoad };

BtnLoad.propTypes = {
  onClick: PropTypes.func,
};
