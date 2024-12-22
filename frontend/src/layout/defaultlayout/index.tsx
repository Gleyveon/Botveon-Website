// src/layout/defaultlayout

import React, { ReactNode, FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';

interface LayoutProps {
  children?: ReactNode;
}

const DefaultLayout: FC<LayoutProps> = () => {

  return (
    <div className="layout default-layout">
      <header><Header /></header>
      <main>
        <Outlet />
      </main>
      <footer><Footer /></footer>
    </div>
  );
};

export default DefaultLayout;