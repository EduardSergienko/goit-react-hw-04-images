import styles from './Button.module.scss';
import PropTypes from 'prop-types';
export function Button({ onLoadMoreClick }) {
  return (
    <button onClick={onLoadMoreClick} className={styles.Button} type="submit">
      Load More
    </button>
  );
}
Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};
