import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBars,
  faList,
  faPowerOff,
  faExchangeAlt,
  faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons';

import './styles.css';

function Header() {
  const navBarRef = React.createRef<HTMLUListElement>();

  const handleResponsiveNav = () => {
    navBarRef.current?.classList.toggle('nav-bar-hide');
  };

  return (
    <header>
      <nav>
        <ul className="nav-bar-hide" ref={navBarRef}>
          <li id="home-row">
            <Link to="/">
              <FontAwesomeIcon icon={faHome} />
              Home
            </Link>
            <button
              className="responsive-nav-button"
              onClick={handleResponsiveNav}
            >
              <FontAwesomeIcon icon={faBars} size="lg" color="white" />
            </button>
          </li>
          <li>
            <Link to="/caixa">
              <FontAwesomeIcon icon={faExchangeAlt} />
              Caixa
            </Link>
          </li>

          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faFileInvoiceDollar} />
              Fixos
            </Link>
          </li>

          <li>
            <Link to="/categorias">
              <FontAwesomeIcon icon={faList} />
              Categorias
            </Link>
          </li>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faPowerOff} />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
