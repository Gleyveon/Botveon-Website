// src/components/settings/subcomponents/toggle
import './styles.scss';

// components
import InfoButton from '../../shared/info-button';

interface componentProps {
    title?: string;
    info?: string;
    toggleValue : boolean;
    setToggleValue: (value: boolean) => void;
}

const Toggle = ({title, info, toggleValue, setToggleValue} : componentProps) => {

    const handleToggleChange = (value: boolean) => {
        setToggleValue(value);
        console.log("Level-up messages toggled to:", value);
      };

    return (
        <div className='setting-subcomponent toggle'>
            <div className="setting-item">
                {/* {{ ui.section_title_wrapper('Level-Up Messages:', 'Turn the level-up messages in chat on/off.') }} */}
                <InfoButton title={title} info={info} />
                <div className="toggle-switch">
                    <label className="switch">
                        <input onChange={(e) => handleToggleChange(e.target.checked)} checked={toggleValue} type="checkbox" id="levelUpMessages" name="levelUpMessages" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Toggle;