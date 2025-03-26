// src/pages/settings/join
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchJoinSettings, updateJoinSettings } from '../../../utils/api';
import './styles.scss';

// import components
import Settings from '../../../components/settings';
import Loading from '../../../components/shared/loading';

// import subcomponents
import Selector from '../../../components/settings/selector'
import InputField from '../../../components/settings/input-field'
import TextField from '../../../components/settings/text-field';
import Toggle from '../../../components/settings/toggle';
import SaveChanges from '../../../components/settings/save-changes';



function Join() {
  const { guildId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);

  const [joinRoles, setJoinRoles] = useState<string[]>([]);
  const [stickyRoles, setStickyRoles] = useState<string[]>([]);

  const [registrationRole, setRegistrationRole] = useState<string | undefined>(undefined);
  const [registrationChannel, setRegistrationChannel] = useState<string | undefined>(undefined);
  const [registrationTitle, setRegistrationTitle] = useState<string | undefined>(undefined);
  const [registrationDescription, setRegistrationDescription] = useState<string | undefined>(undefined);
  const [registrationFooter, setRegistrationFooter] = useState<string | undefined>(undefined);

  const [welcomeChannel, setWelcomeChannel] = useState<string | undefined>(undefined);
  const [welcomeChannelPicture, setWelcomeChannelPicture] = useState<boolean>(true);
  const [welcomeChannelTitle, setWelcomeChannelTitle] = useState<string | undefined>(undefined);
  const [welcomeChannelDescription, setWelcomeChannelDescription] = useState<string | undefined>(undefined);
  const [welcomeChannelFooter, setWelcomeChannelFooter] = useState<string | undefined>(undefined);

  const [goodbyeChannel, setGoodbyeChannel] = useState<string | undefined>(undefined);
  const [goodbyeChannelPicture, setGoodbyeChannelPicture] = useState<boolean>(true);
  const [goodbyeChannelTitle, setGoodbyeChannelTitle] = useState<string | undefined>(undefined);
  const [goodbyeChannelDescription, setGoodbyeChannelDescription] = useState<string | undefined>(undefined);
  const [goodbyeChannelFooter, setGoodbyeChannelFooter] = useState<string | undefined>(undefined);

  const [persistentRoles, setPersistentRoles] = useState<boolean>(false);


  if (!guildId) {
    return <p>Error loading data!</p>;
  }

  useEffect(() => {
    fetchJoinSettings(guildId)
      .then((data) => {
        setRoles(data.roles || []);
        setChannels(data.channels || []);

        setJoinRoles(data.joinRoles || []);
        setStickyRoles(data.stickyRoles || []);

        setRegistrationRole(data.registration?.roleID || undefined);
        setRegistrationChannel(data.registration?.channelID || undefined);
        setRegistrationTitle(data.registration?.embed?.title || undefined);
        setRegistrationDescription(data.registration?.embed?.description || undefined);
        setRegistrationFooter(data.registration?.embed?.footer?.text || undefined);

        setWelcomeChannel(data.welcomeChannel?.channelID || undefined);
        setWelcomeChannelPicture(data.welcomeChannel?.includeUserAvatar || undefined);
        setWelcomeChannelTitle(data.welcomeChannel?.embed?.title || undefined);
        setWelcomeChannelDescription(data.welcomeChannel?.embed?.description || undefined);
        setWelcomeChannelFooter(data.welcomeChannel?.embed?.footer?.text || undefined);

        setGoodbyeChannel(data.goodbyeChannel?.channelID || undefined);
        setGoodbyeChannelPicture(data.goodbyeChannel?.includeUserAvatar || undefined);
        setGoodbyeChannelTitle(data.goodbyeChannel?.embed?.title || undefined);
        setGoodbyeChannelDescription(data.goodbyeChannel?.embed?.description || undefined);
        setGoodbyeChannelFooter(data.goodbyeChannel?.embed?.footer?.text || undefined);

        setPersistentRoles(data.persistentRoles)

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
        joinRoles,
        stickyRoles,
        registration: {
          channelID: registrationChannel,
          roleID: registrationRole,
          embed: {
            title: registrationTitle,
            description: registrationDescription,
            footer: {
              text: registrationFooter
            }
          }
        },
        welcomeChannel: {
          channelID: welcomeChannel,
          includeUserAvatar: welcomeChannelPicture,
          embed: {
            title: welcomeChannelTitle,
            description: welcomeChannelDescription,
            footer: {
              text: welcomeChannelFooter
            }
          }
        },
        goodbyeChannel: {
          channelID: goodbyeChannel,
          includeUserAvatar: goodbyeChannelPicture,
          embed: {
            title: goodbyeChannelTitle,
            description: goodbyeChannelDescription,
            footer: {
              text: goodbyeChannelFooter
            }
          }
        },
        persistentRoles
      };
      await updateJoinSettings(guildId, settings);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings. Please try again.');
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>Error loading data!</p>;

  return (
    <div className="page page-join">

      <div className="container">

        <Settings title='Selected join roles' description='Give new members these roles the <b>first</b> time they join.'>
          <Selector itemCategory='role' selectionMode='multiple' items={roles} selectedItems={joinRoles} setSelectedItems={setJoinRoles}></Selector>
        </Settings>

        <Settings title='Selected sticky roles' description='Give members these roles <b>everytime</b> they join and keep it glued to them. (Good for role dividers/access roles)'>
          <Selector itemCategory='role' selectionMode='multiple' items={roles} selectedItems={stickyRoles} setSelectedItems={setStickyRoles}></Selector>
        </Settings>

        <Settings title='Registration' description='Add an extra step before new members gain access to the server.'>
          <Selector title='Role:' info='This role will be given upon joining and taken away upon registering.' itemCategory='role' selectionMode='singular' items={roles} selectedItems={registrationRole ? [registrationRole] : []} setSelectedItems={(selected: string[]) => setRegistrationRole(selected[0] || undefined)}></Selector>
          <Selector title='Channel:' info='This will be the channel where the registration message will be sent to.' itemCategory='channel' selectionMode='singular' items={channels} selectedItems={registrationChannel ? [registrationChannel] : []} setSelectedItems={(selected: string[]) => setRegistrationChannel(selected[0] || undefined)}></Selector>
          <InputField title='Embed Title:' info='You can make use of <@userID>, <#channelID>, <@&roleID>' placeholder='Embed title:' input={registrationTitle} setInput={setRegistrationTitle}></InputField>
          <TextField title='Embed Description:' info='You can make use of <@userID>, <#channelID>, <@&roleID> and all other discord markdown' placeholder='Embed description:' text={registrationDescription} setText={setRegistrationDescription}></TextField>
          <InputField title='Embed Footer:' info='You can make use of <@userID>, <#channelID>, <@&roleID>' placeholder='Embed footer' input={registrationFooter} setInput={setRegistrationFooter}></InputField>
        </Settings>

        <Settings title='Welcome Channel' description='Send a message whenever a new member joins the server.'>
          <Selector title='Channel:' info='Select the channel where the welcomne messages will be sent to:' itemCategory='channel' selectionMode='singular' items={channels} selectedItems={welcomeChannel ? [welcomeChannel] : []} setSelectedItems={(selected: string[]) => setWelcomeChannel(selected[0] || undefined)}></Selector>
          <Toggle title='Profile Picture:' info='Add the profile pictures of joined members to embed?' toggleValue={welcomeChannelPicture} setToggleValue={setWelcomeChannelPicture}></Toggle>
          <InputField title='Embed Title:' info='You can use: {username} {globalName} {guildName} {@user} {id}' placeholder='Embed title:' input={welcomeChannelTitle} setInput={setWelcomeChannelTitle}></InputField>
          <TextField title='Embed Description:' info='You can use: {username} {globalName} {guildName} {@user} {id}' placeholder='Embed description:' text={welcomeChannelDescription} setText={setWelcomeChannelDescription}></TextField>
          <InputField title='Embed Footer:' info='You can use: {username} {globalName} {guildName} {@user} {id}' placeholder='Embed footer' input={welcomeChannelFooter} setInput={setWelcomeChannelFooter}></InputField>
        </Settings>

        <Settings title='Goodbye Channel' description='Send a message whenever a member leaves the server.'>
          <Selector title='Channel:' info='Select the channel where the goodbye messages will be sent to:' itemCategory='channel' selectionMode='singular' items={channels} selectedItems={goodbyeChannel ? [goodbyeChannel] : []} setSelectedItems={(selected: string[]) => setGoodbyeChannel(selected[0] || undefined)}></Selector>
          <Toggle title='Profile Picture:' info='Add the profile pictures of leaving members to embed?' toggleValue={goodbyeChannelPicture} setToggleValue={setGoodbyeChannelPicture}></Toggle>
          <InputField title='Embed Title:' info='You can use: {username} {globalName} {guildName} {@user} {id}' placeholder='Embed title:' input={goodbyeChannelTitle} setInput={setGoodbyeChannelTitle}></InputField>
          <TextField title='Embed Description:' info='You can use: {username} {globalName} {guildName} {@user} {id}' placeholder='Embed description:' text={goodbyeChannelDescription} setText={setGoodbyeChannelDescription}></TextField>
          <InputField title='Embed Footer:' info='You can use: {username} {globalName} {guildName} {@user} {id}' placeholder='Embed footer' input={goodbyeChannelFooter} setInput={setGoodbyeChannelFooter}></InputField>
        </Settings>

        <Settings title='Persistent Roles' description='Should users regain their old roles after leaving and rejoining?'>
          <Toggle toggleValue={persistentRoles} setToggleValue={setPersistentRoles}></Toggle>
        </Settings>

        <SaveChanges settings={
          {
            joinRoles, stickyRoles,
            registrationRole, registrationChannel, registrationTitle, registrationDescription, registrationFooter,
            welcomeChannel, welcomeChannelPicture, welcomeChannelTitle, welcomeChannelDescription, welcomeChannelFooter,
            goodbyeChannel, goodbyeChannelPicture, goodbyeChannelTitle, goodbyeChannelDescription, goodbyeChannelFooter,
            persistentRoles
          }
        } onSave={handleSubmit}></SaveChanges>
        
      </div>

    </div>
  );
}

export default Join;