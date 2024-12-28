// src/components/settings/index.tsx
import './styles.scss';

interface settingsProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Settings = ({ title, description, children }: settingsProps) => {

  return (
    <div className="component settings-component">

      <div className="settings-section">
        <div className="settings-title">{title}</div>
        <div className="settings-description">{description}</div>

        <div className="settings-items">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Settings;