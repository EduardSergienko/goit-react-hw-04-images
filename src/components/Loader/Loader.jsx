import { Rings } from 'react-loader-spinner';
import styles from './Loader.module.scss';

export function Loader() {
  return (
    <div className={styles.loader}>
      <Rings height="100" width="100" color="#303f9f" ariaLabel="loading" />
    </div>
  );
}
