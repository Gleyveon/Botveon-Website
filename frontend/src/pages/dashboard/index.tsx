// src/pages/Dashboard.tsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchMutualGuilds } from "../../utils/api";
import { Guild } from "../../utils/types";

import './styles.scss';
import Loading from '../../components/shared/loading';
import placeholderImage from '../../assets/img/placeholderImage.svg'
import addIcon from '../../assets/img/icons/add.png'

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID || "817845132363038750";

const DISCORD_OAUTH_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}`;

function Dashboard() {

  const [data, setData] = useState<Guild[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMutualGuilds()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error loading data!</p>;
  if (!data) return <p>No guilds found</p>

  const guilds = data.map((guild) => {
    // Define the guild icon URL with a fallback for missing icons
    const guildIcon = guild.icon
      ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
      : placeholderImage;

    return (
      <Link to={`/guild/${guild.id}`} className="guild-link" key={guild.id}>

        <div className="guild-card">
          <div className="guild-icon-wrapper">
            <img src={guildIcon} alt="server icon" className="guild-icon" />
          </div>
          <div className="guild-content">
            <div className="title">{guild.name}</div>
          </div>
          <img src={guildIcon} alt="blurred server icon" className="guild-background" />
        </div>

        {/* <div className="guild">
          <div className="guild_image"><img src={guildIcon} alt={guild.name} /></div>
          <div className="guild_name title-white">
            <p>{guild.name}</p>
          </div>
        </div> */}


      </Link>
    );
  });

  return (
    <div className='page dashboard-page'>
      <div className="container">
        <h1>Configure servers:</h1>

        
          <div className="guild-cards">
            {guilds}
            <a className="guild-link" href={DISCORD_OAUTH_URL} target='_blank' rel="noopener noreferrer">
              <div className="add-server-button">
                <div className="add-server-icon-wrapper">
                  <img src={addIcon} alt="server icon" className="guild-icon" />
                </div>
                <div className="title">Add Server</div>
              </div>
            </a>
          </div>
      </div>
    </div>
  );
}

export default Dashboard;