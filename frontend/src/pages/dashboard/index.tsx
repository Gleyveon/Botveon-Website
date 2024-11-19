// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import { GuildContext } from "../../utils/contexts/GuildContext"
import { mockGuilds } from "../../__mocks__/guilds";
import { useContext } from "react";
import './styles.scss';

function Dashboard() {
  const navigate = useNavigate();
  const { updateGuildId } = useContext(GuildContext);

  const guilds = mockGuilds.map((guild) => (
    <li key={guild.id} onClick={() => {
      updateGuildId(guild.id);
      navigate(`/guild/${guild.id}/community`);
    }} style={{ cursor: "pointer" }}>
      {guild.name}
    </li>
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
