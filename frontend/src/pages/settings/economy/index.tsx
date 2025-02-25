// src/pages/settings/economy
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchEconomySettings, updateEconomySettings } from '../../../utils/api';
import './styles.scss';

// import components
import Settings from '../../../components/settings';
import Loading from '../../../components/shared/loading';

// import subcomponents
import InputField from '../../../components/settings/input-field';
import Selector from '../../../components/settings/selector'


function Economy() {
  const { guildId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);

  const [currencySingular, setCurrencySingular] = useState<string>()
  const [currencyPlural, setCurrencyPlural] = useState<string>()
  const [currencyIcon, setCurrencyIcon] = useState<string>()
  const [shopRoles, setShopRoles] = useState()

  if (!guildId) {
    return <p>Error loading data!</p>;
  }

  useEffect(() => {
      fetchEconomySettings(guildId)
        .then((data) => {
          setCurrencySingular(data.currency?.nameSingular);
          setCurrencyPlural(data.currency?.namePlural);
          setCurrencyIcon(data.currency?.icon);
          setShopRoles(data.shopRoles)
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }, [guildId]);

    const handleSubmit = async () => {
        console.log("submitting data!");
        
          try {
            const settings = {
              
            };
            await updateEconomySettings(guildId, settings);
            alert('Settings saved successfully!');
          } catch (err) {
            console.error('Error saving settings:', err);
            alert('Failed to save settings. Please try again.');
          }
        };

    if (loading) return <Loading />;
    if (error) return <p>Error loading data!</p>;

  return (
    <div className="page page-economy">
      <div className="container">
      
        <Settings title='Currency' description='Add a custom currency to your server!'>
          <InputField title='Currency name (singular)' info='The singular version of you currency (example: coin)' placeholder='coin' input={currencySingular} setInput={setCurrencySingular}></InputField>
          <InputField title='Currency name (plural)' info='When you have multiple of your currency (example: coins)' placeholder='coins' input={currencyPlural} setInput={setCurrencyPlural}></InputField>
          <InputField title='Currency icon' info="You can use a custom server emoji by using its ID: <a:mariocoin:846082537222045708>" placeholder='🪙' input={currencyIcon} setInput={setCurrencyIcon}></InputField>
        </Settings>

        <Settings title='Shop roles'>
          
        </Settings>

        <button onClick={handleSubmit}>Save Settings</button>
      </div>
    </div>
  );
}

export default Economy;