// src/components/settings/index.tsx
import './styles.scss';

interface settingsProps {
  title?: string;
  description?: string;
  errorMessage?: string;
  children: React.ReactNode;
}

const Settings = ({ title, description, errorMessage, children }: settingsProps) => {

  return (
    <div className="component settings-component">

      <div className="settings-section">
        <div className="settings-title">{title}</div>
        <div className="settings-description" dangerouslySetInnerHTML={{ __html: description || '' }}></div>

        <div className="settings-items">
          {children}
        </div>

        {errorMessage && (
          <div className="setting-error">* {errorMessage}</div>
        )}
        

      </div>
    </div>
  );
}

export default Settings;