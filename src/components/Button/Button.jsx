import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ nextPage }) => {
  return (
    <button className={css.button} type="button" onClick={nextPage}>
      Load more
    </button>
  );
};

Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
};
