// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchMutualGuilds } from "../../utils/api";
import { Guild } from "../../utils/types";

import './styles.scss';
import Loading from '../../components/loading';


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
      : 'src/assets/img/landscape-placeholder-svgrepo-com.svg';

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
          </div>
      </div>
    </div>
  );
}

export default Dashboard;