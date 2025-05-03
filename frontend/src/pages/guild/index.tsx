// src/pages/guild
import './styles.scss';

import { Link } from 'react-router-dom';

function Guild() {
  return (
    <div className="page guild-page">
      <div className="container">
        <h1>Welcome to your server settings</h1>
        <p>Select a category below to configure your server.</p>

        <div className="category-cards">
          <Link to="community" className="category-card">
            <h2>Community</h2>
            <p>Auto Threads, Upvotes/Downvotes, Bumps.</p>
          </Link>
          <Link to="join" className="category-card">
            <h2>Joining/Leaving</h2>
            <p>Join Roles, Sticky Roles, Registration, Welcome/Goodbye, Persistent Roles.</p>
          </Link>
          <Link to="economy" className="category-card">
            <h2>Economy</h2>
            <p>Currency, Shop Roles.</p>
          </Link>
          <Link to="level" className="category-card">
            <h2>Level/Xp</h2>
            <p>Level-Up Messages, Role Rewards, Boost Roles.</p>
          </Link>

        </div>
      </div>
    </div>

  );
}

export default Guild;
