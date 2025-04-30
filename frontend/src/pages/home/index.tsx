// src/pages/home
import './styles.scss';

import WaveSection from '../../components/shared/wave-section';
import { useState } from 'react';

function Home() {
  const [serverCount, setServerCount] = useState("440+");
  const [userCount, setUserCount] = useState("87410+");
  const [commands, setCommands] = useState("30+");

  return (
    <div className="page home-page">
      <div className="container">
        <div className="home-wrapper">
          <h1 className='home-title'>Botveon</h1>
          <h2 className='home-description'>The best <u>all-in-one</u> Yu-Gi-Oh bot!</h2>
          <a className='home-invite' href="https://discord.com/oauth2/authorize?client_id=817845132363038750&scope=bot&permissions=1095216131705&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Ftesting" target='_blank' rel="noopener noreferrer">Invite me!</a>
        </div>
      </div>

      <WaveSection>
        <div className="container">
          <div className="feature-showcase">
            <div className="showcase-title">
              Main features:
            </div>
            <div className="feature-cards-wrapper">

              <div className="feature-card">
                <div className="icon-wrapper">
                  <i className="fa-solid fa-ranking-star feature-icon"></i>
                </div>
                <div className="feature-text">
                  <div className="title">Level System</div>
                  <div className="description">Earn XP by (voice) chatting, level up, unlock roles and compete for ranks!</div>
                </div>
              </div>

              <div className="feature-card">
                <div className="icon-wrapper">
                  <i className="fa-solid fa-money-bill feature-icon"></i>
                </div>
                <div className="feature-text">
                  <div className="title">Economy System</div>
                  <div className="description">Earn currency by chatting, bumping the server and buy roles or XP potions!</div>
                </div>
              </div>

              <div className="feature-card">
                <div className="icon-wrapper">
                  <i className="custom-icon upvote feature-icon"></i>
                </div>
                <div className="feature-text">
                  <div className="title">Upvotes</div>
                  <div className="description">Automatically add upvotes/downvotes to every message.</div>
                </div>
              </div>

              <div className="feature-card">
                <div className="icon-wrapper">
                  <i className="custom-icon yugioh feature-icon"></i>
                </div>
                <div className="feature-text">
                  <div className="title">Yu-Gi-Oh! Search</div>
                  <div className="description">Search for Yu-Gi-Oh! cards, includes OCG, TCG, MD and DL banlists.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WaveSection>

      <div className="container">
        <div className="stats-wrapper">
          <div className="row">

            <div className="column col-md-3">
              <div className="stat">
                <div className="stat-number">{serverCount}</div>
                <div className="stat-label">Servers</div>
              </div>
            </div>

            <div className="column col-md-3">
              <div className="stat">
                <div className="stat-number">{userCount}</div>
                <div className="stat-label">Users</div>
              </div>
            </div>

            <div className="column col-md-3">
              <div className="stat">
                <div className="stat-number">{commands}</div>
                <div className="stat-label">commands</div>
              </div>
            </div>

            <div className="column col-md-3">
              <div className="stat">
                <div className="stat-number">99%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;