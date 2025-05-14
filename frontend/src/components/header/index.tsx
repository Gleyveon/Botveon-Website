// src/components/header
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './styles.scss';

// import components:
import Dropdown from '../shared/dropdown';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_BASE_URL = import.meta.env.VITE_API_URL;

function Header() {
  const { guildId } = useParams();
  const user = useUser();

  const [sidebarToggle, setSidebarToggle] = useState(false);

  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
  const redirectUrl = location.pathname.startsWith('/guild/') ? currentUrl : `${window.location.origin}/dashboard`;

  const isGuildPage = location.pathname.startsWith('/guild/');

  function toggleSidebar() {
    sidebarToggle ? setSidebarToggle(false) : setSidebarToggle(true);
  }

  function closeSidebar() {
    setSidebarToggle(false);
  }

  useEffect(() => {
    if (sidebarToggle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarToggle]);

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
                {/* <NavLink className='link' to="/features">features</NavLink>
                <NavLink className='link' to="/commands">commands</NavLink> */}
                <NavLink className='link' to="/dashboard">dashboard</NavLink>
                {user ? (
                  // <a className="username">{user.username}</a>
                  <a className="logout-button" href={`${BACKEND_URL}${API_BASE_URL}/auth/logout`}>Logout</a>
                ) : (
                  <a className='login-button' href={`${BACKEND_URL}${API_BASE_URL}/auth/discord?redirect=${encodeURIComponent(redirectUrl)}`}>Login</a>
                )}
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

            {!isGuildPage && (
              <>
                <NavLink className='link' to="/home">Home</NavLink>
                {/* <NavLink className='link' to="/features">Features</NavLink>
                <NavLink className='link' to="/commands">Commands</NavLink> */}
                <NavLink className='link' to="/dashboard">Dashboard</NavLink>
              </>
            )}
              
            {isGuildPage && (
              <>
                <NavLink className='link' to={`/guild/${guildId}/community`}>Community</NavLink>
                <NavLink className='link' to={`/guild/${guildId}/join`}>Joining/Leaving</NavLink>
                <NavLink className='link' to={`/guild/${guildId}/economy`}>Economy</NavLink>
                <NavLink className='link' to={`/guild/${guildId}/level`}>Level/Xp</NavLink>

                
                <Dropdown classname='dropdown' title='Additional links'>
                  <NavLink className='link' to="/home">Home</NavLink>
                  {/* <NavLink className='link' to="/features">Features</NavLink>
                  <NavLink className='link' to="/commands">Commands</NavLink> */}
                  <NavLink className='link' to="/dashboard">Dashboard</NavLink>
                </Dropdown>
              </>
            )}

              

              <div className="login-button-wrapper">
              {user ? (
                  // <a className="username">{user.username}</a>
                  <a className="logout-button" href={`${BACKEND_URL}${API_BASE_URL}/auth/logout`}>Logout</a>
                ) : (
                  <a className='login-button' href={`${BACKEND_URL}${API_BASE_URL}/auth/discord?redirect=${encodeURIComponent(redirectUrl)}`}>Login with Discord</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
