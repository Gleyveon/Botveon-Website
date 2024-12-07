// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { fetchMutualGuilds } from "../../utils/api";
import { Guild } from "../../utils/types";

import './styles.scss';


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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;
  if (!data) return <p>No guilds found</p>

  const guilds = data.map((guild) => (
    <li key={guild.id}>{guild.name}</li>
  ));
  
  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>This is the second page of your application.</p>
      <ul>{guilds}</ul>
    </div>
  );
}

export default Dashboard;