// src/components/settings/index.tsx
import './styles.scss';

// import sub-components:
import InputField from './subcomponents/input-field';
import SingleRoleSelector from './subcomponents/single-role-selector';
import MultiRoleSelector from './subcomponents/multi-role-selector';
import SingleChannelSelector from './subcomponents/single-channel-selector';
import MultiChannelSelector from './subcomponents/multi-channel-selector';
import Toggle from './subcomponents/toggle';

const Settings = ({ type }: { type: string }) => {

    const componentMap: Record<string, React.ComponentType> = {
        "input-field": InputField,
        "single-role-selector": SingleRoleSelector,
        "multi-role-selector": MultiRoleSelector,
        "single-channel-selector": SingleChannelSelector,
        "multi-channel-selector": MultiChannelSelector,
        "toggle": Toggle,
    };

    const SelectedComponent = componentMap[type] || (() => <div>No valid selector type provided.</div>);

    return (
        <div className='setting-component'>

            <div className="title settings-title">Level Up Message</div>
            <div className="text settings-description">See level-up messages upon gaining a new level.</div>

            <div className="setting-item">
                <SelectedComponent />
            </div>

            <button className="submit-button">Submit</button>

        </div>
    );
}

export default Settings;