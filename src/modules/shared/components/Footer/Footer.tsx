import { Icon } from '../Icon';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__inner}`}>
        <span className={styles.footer__logo}>NICE GADGETS</span>

        <a
          href="https://github.com/mate-academy/react_phone-catalog"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer__link}
        >
          GitHub
        </a>

        <button
          type="button"
          className={styles.footer__backToTop}
          onClick={scrollToTop}
        >
          Back to top
          <Icon name="arrow-up" />
        </button>
      </div>
    </footer>
  );
};
