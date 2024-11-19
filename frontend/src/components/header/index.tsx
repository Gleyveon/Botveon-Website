import { Link } from 'react-router-dom';
import './style.scss';

type HeaderProps = {
  user: boolean | null; // Define the expected type of `user`
};

function Header({ user }: HeaderProps) {
  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="container">
          <div className="header-content">
            {/* Sidebar toggle */}
            <div className="sidebar-toggle">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
            <header>
              <nav>
                {/* Links */}
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                {/* Conditional rendering based on the user */}
                {user ? (
                  <Link to="/logout">Logout</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </nav>
            </header>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
