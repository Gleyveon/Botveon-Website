// src/pages/settings/level
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchLevelSettings, updateLevelSettings } from '../../../utils/api';
import { Role, LevelRole, BoostRole } from '../../../utils/types';
import './styles.scss';

// import components
import Settings from '../../../components/settings';
import Loading from '../../../components/shared/loading';

// import subcomponents
import Selector from '../../../components/settings/selector'
import LevelSelector from '../../../components/settings/level-selector';
import BoostSelector from '../../../components/settings/boost-selector';
import Toggle from '../../../components/settings/toggle';
import SaveChanges from '../../../components/settings/save-changes';

function Level() {
  const { guildId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);

  const [levelUpMessages, setLevelUpMessages] = useState<boolean>(false);
  const [levelUpRoles, setLevelUpRoles] = useState<LevelRole[]>([]);
  const [invalidLevelUpRoles, setInvalidLevelUpRoles] = useState<Record<string, (keyof LevelRole)[]>>({});
  const [boostRoles, setBoostRoles] = useState<BoostRole[]>([]);
  const [invalidBoostRoles, setInvalidBoostRoles] = useState<Record<string, (keyof BoostRole)[]>>({});

  if (!guildId) {
    return <p>Error loading data!</p>;
  }

  useEffect(() => {
    fetchLevelSettings(guildId)
      .then((data) => {
        setRoles(data.roles || []);
        setChannels(data.channels || []);
        setLevelUpMessages(data.levelUpMessages || false);
        setLevelUpRoles(data.levelUpRoles || [])
        setBoostRoles(data.boostRoles || [])
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [guildId]);

  function validateFields () {

    let validFields = true;

    const invalidBoostFields: Record<string, (keyof BoostRole)[]> = {};
    boostRoles.forEach((role) => {
      invalidBoostFields[role.roleID] = [];

      if (role.boost === undefined || isNaN(role.boost) || role.boost <= 0) {
        invalidBoostFields[role.roleID].push('boost');
        validFields = false;
      }

      if (role.stackable && !role.equation) {
        invalidBoostFields[role.roleID].push('equation');
        validFields = false;
      }
    });
    setInvalidBoostRoles(invalidBoostFields);

    const invalidLevelUpFields: Record<string, (keyof LevelRole)[]> = {};
    levelUpRoles.forEach((role) => {
      invalidLevelUpFields[role.roleID] = [];

      if (role.level === undefined || isNaN(role.level) || role.level <= 0) {
        invalidLevelUpFields[role.roleID].push('level');
        validFields = false;
      }
    });
    setInvalidLevelUpRoles(invalidLevelUpFields)

    return validFields;
  };

  const handleSubmit = async () => {
    const isValid = validateFields();

    if (!isValid) { throw new Error }

    try {
      const settings = {
        levelUpMessages,
        levelUpRoles,
        boostRoles
      };
      await updateLevelSettings(guildId, settings);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings. Please try again.');
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>Error loading data!</p>;

  return (
    <div className="page page-level">
      <div className="container">
        <Settings title="Level Up Messages" description="See level-up messages upon gaining a new level.">
          <Toggle toggleValue={levelUpMessages} setToggleValue={setLevelUpMessages} />
        </Settings>
        {/* <Settings title='Level Up Channel' description='Select what channel the level-up messages get sent in.'>
          <Select ></Select>
        </Settings> */}
        <Settings title='Level-up Role Rewards' description='Add Level Roles to reward your active members.'>
          <LevelSelector items={roles} selectedItems={levelUpRoles} setSelectedItems={setLevelUpRoles} invalidFields={invalidLevelUpRoles}></LevelSelector>
        </Settings>
        <Settings title='Xp Boost Roles' description='Give certain roles an additional xp boost.'>
          <BoostSelector items={roles} selectedItems={boostRoles} setSelectedItems={setBoostRoles} invalidFields={invalidBoostRoles}></BoostSelector>
        </Settings>

        <SaveChanges settings={{ levelUpMessages, levelUpRoles, boostRoles }} onSave={handleSubmit}></SaveChanges>
      </div>
    </div>
  );
}

export default Level;