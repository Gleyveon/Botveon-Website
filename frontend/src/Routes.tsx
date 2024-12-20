import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// components
import Header from './components/header';
import Footer from './components/footer';

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
import Loading from './components/loading';

function RouteApp() {

  return (
    <Router>
      <div className="app-layout">
        <Header />

        <main>
          <Routes>
            {/* Testing Route */}
            {/* <Route path="/testing" element={<Testing />} /> */}

            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/commands" element={<Commands />} />
            <Route path="/features" element={<Features />} />


            {/* Redirect /guild to /dashboard */}
            <Route path="/guild" element={<Navigate to="/dashboard" replace />} />

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
    </Router>
  );
}

export default RouteApp
