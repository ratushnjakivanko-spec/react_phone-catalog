import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../../../contexts/CartContext';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import { useTheme } from '../../../../contexts/ThemeContext';
import { Icon } from '../Icon';
import { SearchField } from '../SearchField';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const SEARCHABLE_PATHS = ['/phones', '/tablets', '/accessories', '/favorites'];

export const Header = () => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const showSearch = SEARCHABLE_PATHS.some(path =>
    location.pathname.startsWith(path),
  );

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__inner}`}>
        <div className={styles.header__left}>
          <NavLink to="/" className={styles.header__logo}>
            NICE GADGETS
          </NavLink>

          <nav className={styles.header__nav}>
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${styles.header__link} ${
                    isActive ? styles['header__link--active'] : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.header__right}>
          {showSearch && (
            <div className={styles.header__search}>
              <SearchField />
            </div>
          )}

          <button
            type="button"
            className={styles.header__iconLink}
            aria-label={
              theme === 'light'
                ? 'Switch to dark theme'
                : 'Switch to light theme'
            }
            onClick={toggleTheme}
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          </button>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.header__iconLink} ${
                isActive ? styles['header__iconLink--active'] : ''
              }`
            }
            aria-label="Favorites"
          >
            <Icon name="heart" />
            {favorites.length > 0 && (
              <span className={styles.header__badge}>{favorites.length}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.header__iconLink} ${
                isActive ? styles['header__iconLink--active'] : ''
              }`
            }
            aria-label="Cart"
          >
            <Icon name="cart" />
            {totalQuantity > 0 && (
              <span className={styles.header__badge}>{totalQuantity}</span>
            )}
          </NavLink>

          <button
            type="button"
            className={styles.header__menuButton}
            aria-label="Menu"
            onClick={() => setMenuOpen(open => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className={styles.header__mobileNav}>
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={styles.header__mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};
