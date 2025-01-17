// src/pages/settings/community
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchCommunitySettings, updateCommunitySettings } from '../../../utils/api';
import './styles.scss';

// import components
import Settings from '../../../components/settings';
import Loading from '../../../components/shared/loading';

// import subcomponents
import Selector from '../../../components/settings/selector'



function Community() {
  const { guildId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);

  const [threadChannels, setThreadChannels] = useState<string[]>([]);
  const [upvoteChannels, setUpvoteChannels] = useState<string[]>([]);
  const [bumpChannel, setBumpChannel] = useState<string | undefined>("");

  if (!guildId) {
    return <p>Error loading data!</p>;
  }

  useEffect(() => {
    fetchCommunitySettings(guildId)
      .then((data) => {
        setRoles(data.roles || []);
        setChannels(data.channels || []);
        setThreadChannels(data.threadChannels || []);
        setUpvoteChannels(data.upvoteChannels || []);
        setBumpChannel(data.bumpChannel || undefined);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [guildId]);

  const handleSubmit = async () => {
    try {
      const settings = {
        threadChannels,
        upvoteChannels,
        bumpChannel,
      };
      await updateCommunitySettings(guildId, settings);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings. Please try again.');
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>Error loading data!</p>;

  return (
    <div className="page page-community">

      <div className="container">
        <Settings title="Selected thread channels" description="Automatically create threads on every message created within the selected channels.">
          <Selector itemCategory='channel' selectionMode='multiple' items={channels} selectedItems={threadChannels} setSelectedItems={setThreadChannels} />
        </Settings>
        <Settings title="Selected upvote/downvote channels" description="Automatically create upvote/downvote reactions on every message created within the selected channels.">
          <Selector itemCategory='channel' selectionMode='multiple' items={channels} selectedItems={upvoteChannels} setSelectedItems={setUpvoteChannels} />
        </Settings>
        <Settings title="Selected bump channel" description="Monitor bump messages from Disboard (a Discord Bot) and remove all non-bump messages. Server members receive a reward of 50 currency for bumping your server.">
          <Selector itemCategory='channel' selectionMode='singular' items={channels} selectedItems={bumpChannel ? [bumpChannel] : []} setSelectedItems={(selected: string[]) => setBumpChannel(selected[0] || undefined)} />
        </Settings>
        <button onClick={handleSubmit}>Save Settings</button>
      </div>

    </div>
  );
}

export default Community;