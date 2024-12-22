// src/layout/sidebarlayout
import React, { ReactNode, FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';

import './styles.scss';

interface LayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<LayoutProps> = () => {
  
  return (
    <div className="layout sidebar-layout">
      <header className='with-sidebar'><Header /></header>
      <div className="content-wrapper">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;