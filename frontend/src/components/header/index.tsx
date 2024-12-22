// src/components/header
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './styles.scss';

function Header() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
  const redirectUrl = location.pathname.startsWith('/guild/') ? currentUrl : `${window.location.origin}/dashboard`;

  function toggleSidebar() {
    sidebarToggle ? setSidebarToggle(false) : setSidebarToggle(true);
  }

  function closeSidebar() {
    setSidebarToggle(false);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1199) {
        closeSidebar();
      }
    }

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <div className="component header-component">

      <div className="header-wrapper">
        <div className="container">
          <div className="header">

            <div className={`menu-toggle${sidebarToggle ? ' open' : ''}`} onClick={toggleSidebar}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>

            <div className="nav-wrapper">
              <nav>
                <NavLink className='link' to="/home">home</NavLink>
                <NavLink className='link' to="/features">features</NavLink>
                <NavLink className='link' to="/commands">commands</NavLink>
                <NavLink className='link' to="/dashboard">dashboard</NavLink>
                <a className='login-button' href={`http://localhost:3001/api/auth/discord?redirect=${encodeURIComponent(redirectUrl)}`}>Login</a>
              </nav>
            </div>

          </div>
        </div>
      </div>


      <div className={`sidebar-header-wrapper${sidebarToggle ? ' active' : ''}`}>
        <div className="overlay" onClick={closeSidebar}></div>
        <div className="sidebar-header">

          <div className="menu-toggle-wrapper">
            <div className={`menu-toggle${sidebarToggle ? ' open' : ''}`} onClick={toggleSidebar}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>

          <div className="nav-wrapper">
            <div className='nav'>
              <NavLink className='link' to="/home">Home</NavLink>
              <NavLink className='link' to="/features">Features</NavLink>
              <NavLink className='link' to="/commands">Commands</NavLink>
              <NavLink className='link' to="/dashboard">Dashboard</NavLink>
              <div className="login-button-wrapper">
                <a className='login-button' href={`http://localhost:3001/api/auth/discord?redirect=${encodeURIComponent(redirectUrl)}`}>Login with Discord</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
