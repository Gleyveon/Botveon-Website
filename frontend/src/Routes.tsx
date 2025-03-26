import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

// Layouts
import DefaultLayout from './layout/defaultlayout';
import SidebarLayout from './layout/sidebarlayout';

// pages
import Commands from './pages/commands'
import Community from './pages/settings/community';
import Dashboard from './pages/dashboard';
import Economy from './pages/settings/economy';
import Features from './pages/features';
import Guild from './pages/guild';
import Home from './pages/home';
import Join from './pages/settings/join';
import Level from './pages/settings/level';
import PageNotFound from './pages/page-not-found';
import Testing from './pages/testing';

function RouteApp() {

  // useEffect(() => {
  //   const isFirefox = /firefox/i.test(navigator.userAgent);

  //   if (isFirefox) {
  //     document.body.style.background = '#121212';
  //   }
  // }, []);

  return (
    <Router>
      
        

      <Routes>

        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/commands" element={<Commands />} />
          <Route path="/features" element={<Features />} />
        </Route>

        <Route path='/testing' element={<Testing />}></Route>
        <Route element={<SidebarLayout />}>
          <Route path="/guild" element={<Navigate to="/dashboard" replace />} />
          <Route path="/guild/:guildId" element={<Guild />} />
          <Route path="/guild/:guildId/community" element={<Community />} />
          <Route path="/guild/:guildId/join" element={<Join />} />
          <Route path="/guild/:guildId/economy" element={<Economy />} />
          <Route path="/guild/:guildId/level" element={<Level />} />
        </Route>

        <Route element={<DefaultLayout />}>
          <Route path="*" element={<PageNotFound />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default RouteApp
