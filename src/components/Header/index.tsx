import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/caixa">Caixa</Link>
          </li>

          <li>
            <Link to="/">Fixos</Link>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
