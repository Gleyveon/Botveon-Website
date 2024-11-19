// src/pages/Community.jsx
import { useContext } from "react";
import { GuildContext } from "../../utils/contexts/GuildContext";
import './styles.scss';

function Community() {
  const { guildId } = useContext(GuildContext);

  return (
    <div>
      <h1>Welcome to the Community at {guildId}</h1>
    </div>
  );
}

export default Community;
