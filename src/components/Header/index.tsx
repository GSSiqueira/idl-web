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
        </ul>
        <Link to="/">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
