// src/pages/testing.jsx
import './styles.scss';
import Setting from '../../components/settings'

function Testing() {
  return (
    <div className='testing-page'>

        <div className="container">
            <Setting type='single-channel-selector'></Setting>
        </div>

    </div>
  );
}

export default Testing;