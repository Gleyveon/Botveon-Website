// src/pages/home
import { useState, useEffect } from 'react';
import { fetchUserStatistics } from '../../utils/api';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';
import './styles.scss';

import WaveSection from '../../components/shared/wave-section';

const CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID || "817845132363038750";

function Home() {
  const [guildCount, setGuildCount] = useState<number>();
  const [userCount, setUserCount] = useState<number>();
  const [commands, setCommands] = useState<number>(30);
  const [uptime, setUptime] = useState<number>(99);

  // fetch server and user count
  useEffect(() => {
    fetchUserStatistics()
      .then((data) => {
        setUserCount(Math.floor(Number(data.userCount) / 10) * 10);
        setGuildCount(Math.floor(Number(data.guildCount) / 10) * 10);
      });
  }, []);

  // Animation state and refs
  const [hasAnimated, setHasAnimated] = useState({ guild: false, user: false, command: false, uptime: false });
  const [guildRef, guildInView] = useInView();
  const [userRef, userInView] = useInView();
  const [commandRef, commandInView] = useInView();
  const [uptimeRef, uptimeInView] = useInView();

  useEffect(() => {
    if (guildInView && !hasAnimated.guild) setHasAnimated(s => ({ ...s, guild: true }));
  }, [guildInView, hasAnimated.guild]);

  useEffect(() => {
    if (userInView && !hasAnimated.user) setHasAnimated(s => ({ ...s, user: true }));
  }, [userInView, hasAnimated.user]);

  useEffect(() => {
    if (commandInView && !hasAnimated.command) setHasAnimated(s => ({ ...s, command: true }));
  }, [commandInView, hasAnimated.command]);

  useEffect(() => {
    if (uptimeInView && !hasAnimated.uptime) setHasAnimated(s => ({ ...s, uptime: true }));
  }, [uptimeInView, hasAnimated.uptime]);

  const animatedGuild = useCountUp(guildCount, hasAnimated.guild);
  const animatedUser = useCountUp(userCount, hasAnimated.user);
  const animatedCommand = useCountUp(commands, hasAnimated.command);
  const animatedUptime = useCountUp(uptime, hasAnimated.uptime);


  return (
    <div className="page home-page">
      <div className="container">
        <div className="home-wrapper">
          <h1 className='home-title'>Botveon</h1>
          <h2 className='home-description'>The best <u>all-in-one</u> Yu-Gi-Oh bot!</h2>
          <a className='home-invite' href={`https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}`} target='_blank' rel="noopener noreferrer">Invite me!</a>
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
                <div className="stat-number" ref={guildRef}>
                  <div className="stat-number">{guildCount !== undefined ? `${animatedGuild}+` : "?"}</div>
                </div>
                <div className="stat-label">Servers</div>
              </div>
            </div>

            <div className="column col-md-3">
              <div className="stat" ref={userRef}>
                <div className="stat-number">{userCount !== undefined ? `${animatedUser} +` : '?'}</div>
                <div className="stat-label">Users</div>
              </div>
            </div>

            <div className="column col-md-3">
              <div className="stat" ref={commandRef}>
                <div className="stat-number">{commands !== undefined ? `${animatedCommand} +` : '?'}</div>
                <div className="stat-label">commands</div>
              </div>
            </div>

            <div className="column col-md-3">
              <div className="stat" ref={uptimeRef}>
                <div className="stat-number">{uptime !== undefined ? `${animatedUptime} %` : '?'}</div>
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