// src/pages/settings/economy
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchEconomySettings, updateEconomySettings } from '../../../utils/api';
import { Role, Channel, ShopItem } from '../../../utils/types';
import './styles.scss';

// import components
import Settings from '../../../components/settings';
import Loading from '../../../components/shared/loading';

// import subcomponents
import InputField from '../../../components/settings/input-field';
import InputSelector from '../../../components/settings/shop-selector'
import SaveChanges from '../../../components/settings/save-changes';


function Economy() {
  const { guildId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [channels, setChannels] = useState<Channel[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const [currencySingular, setCurrencySingular] = useState<string>()
  const [invalidCurrencySingular, setInvalidCurrencySingular] = useState<boolean>(false);
  const [currencyPlural, setCurrencyPlural] = useState<string>()
  const [invalidCurrencyPlural, setInvalidCurrencyPlural] = useState<boolean>(false);
  const [currencyIcon, setCurrencyIcon] = useState<string>()
  const [invalidCurrencyIcon, setInvalidCurrencyIcon] = useState<boolean>(false);
  
  const [shopRoles, setShopRoles] = useState<ShopItem[]>([])
  const [invalidShopRoles, setInvalidShopRoles] = useState<Record<string, (keyof ShopItem)[]>>({});
  const [shopChannels, setShopChannels] = useState<ShopItem[]>()
  const [invalidShopChannels, setInvalidShopChannels] = useState<Record<string, (keyof ShopItem)[]>>({});

  if (!guildId) {
    return <p>Error loading data!</p>;
  }

  useEffect(() => {
      fetchEconomySettings(guildId)
        .then((data) => {
          setRoles(data.roles);
          setChannels(data.channels);
          setCurrencySingular(data.currency?.nameSingular);
          setCurrencyPlural(data.currency?.namePlural);
          setCurrencyIcon(data.currency?.icon);
          setShopRoles(data.shopItems?.filter((obj: ShopItem) => obj.category === 'role') || []);
          setShopChannels(data.shopItems?.filter((obj: ShopItem) => obj.category === 'channel') || []);
          setLoading(false);          
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }, [guildId]);

    function validateFields () {
        let validFields = true;
    
        const invalidShopRoles: Record<string, (keyof ShopItem)[]> = {};
        shopRoles.forEach((role) => {
          invalidShopRoles[role.itemID] = [];
    
          if (role.price === undefined || isNaN(role.price) || role.price <= 0) {
            invalidShopRoles[role.itemID].push('price');
            validFields = false;
          }
        });
        setInvalidShopRoles(invalidShopRoles);

        if ((currencySingular || currencyPlural || currencyIcon) && !(currencySingular && currencyPlural && currencyIcon)) {
          setInvalidCurrencySingular(!currencySingular);
          setInvalidCurrencyPlural(!currencyPlural);
          setInvalidCurrencyIcon(!currencyIcon);
          return false;
        } else {
          setInvalidCurrencySingular(false);
          setInvalidCurrencyPlural(false);
          setInvalidCurrencyIcon(false);
        }
    
        return validFields;
      };

    const handleSubmit = async () => {
      
        const isValid = validateFields();
        if (!isValid) { throw new Error }
        
          try {
            const settings = {
              currency: {
                nameSingular: currencySingular,
                namePlural: currencyPlural,
                icon: currencyIcon,
              },
              shopItems: [
                ...(shopRoles?.map((role) => ({ ...role, category: "role" })) || []),
                ...(shopChannels?.map((channel) => ({ ...channel, category: "channel" })) || []),
              ],
            };

            console.log(settings);
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
      
        <Settings title='Currency' description='Add a custom currency to your server!' errorMessage={invalidCurrencySingular || invalidCurrencyPlural || invalidCurrencyIcon ? 'if any field is filled, all three must be filled.' : ''}>
          <InputField title='Currency name (singular)' info='The singular version of you currency (example: coin)' placeholder='coin' input={currencySingular} setInput={setCurrencySingular} invalid={invalidCurrencySingular}></InputField>
          <InputField title='Currency name (plural)' info='When you have multiple of your currency (example: coins)' placeholder='coins' input={currencyPlural} setInput={setCurrencyPlural} invalid={invalidCurrencyPlural}></InputField>
          <InputField title='Currency icon' info="You can use a custom server emoji by using its ID: <a:mariocoin:846082537222045708>" placeholder='🪙' input={currencyIcon} setInput={setCurrencyIcon} invalid={invalidCurrencyIcon}></InputField>
        </Settings>

        <Settings title='Shop roles'>
          <InputSelector items={roles} itemsType="Role" selectedItems={shopRoles} setSelectedItems={setShopRoles} invalidFields={invalidShopRoles}></InputSelector>
        </Settings>

        {/* <Settings title='Shop channels'>
          <InputSelector items={channels} itemsType="Channel" selectedItems={shopChannels} setSelectedItems={setShopChannels}></InputSelector>
        </Settings> */}

        <SaveChanges settings={{currencySingular, currencyPlural, currencyIcon, shopChannels, shopRoles}} onSave={handleSubmit}></SaveChanges>
      </div>
    </div>
  );
}

export default Economy;