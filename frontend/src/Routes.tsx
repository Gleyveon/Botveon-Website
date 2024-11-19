import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GuildContext } from './utils/contexts/GuildContext';

// components
import Header from './components/header';
import Footer from './components/footer';

// pages
import Community from './pages/community';
import Dashboard from './pages/dashboard';
import Economy from './pages/economy';
import Guild from './pages/guild';
import Home from './pages/home';
import Join from './pages/join';
import Level from './pages/level';
import PageNotFound from './pages/page-not-found';


import { useState } from 'react';

function RouteApp() {

  const [guildId, setGuildId] = useState('');
  const updateGuildId = (id: string) => setGuildId(id);

  return (
    <Router>
      <GuildContext.Provider value={{ guildId, updateGuildId }}>
        <div className="app-layout">
          <Header user={false}/>

          <main>
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Nested Routes for Guilds */}
              <Route path="/guild/:guildId" element={<Guild />} />
              <Route path="/guild/:guildId/community" element={<Community />} />
              <Route path="/guild/:guildId/join" element={<Join />} />
              <Route path="/guild/:guildId/economy" element={<Economy />} />
              <Route path="/guild/:guildId/level" element={<Level />} />

              {/* No page found */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </GuildContext.Provider>
    </Router>
  );
}

export default RouteApp
