// src/components/header
import { Link } from 'react-router-dom';
import './styles.scss';

function Header() {

  return (
    <div className="component header-component">
      <div className="header-wrapper">
        <div className="header">
          <div className="container">
            <header>
              <nav>
                <Link to="/home">home</Link>
                <Link to="/features">features</Link>
                <Link to="/commands">commands</Link>
                <Link to="/dashboard">dashboard</Link>
                <a href='http://localhost:3001/api/auth/discord'>Login</a>
              </nav>
            </header>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
